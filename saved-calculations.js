import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "./firebase-client.js";

let currentUser = null;

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getResultContainer() {
  const selectors = [
    "#resultBox.calculator-result",
    "#resultSection.calculator-result",
    "#result.calculator-result",
    ".calculator-result",
    ".result-box"
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) return element;
  }

  return null;
}

function isResultVisible(resultContainer) {
  if (!resultContainer) return false;
  const style = window.getComputedStyle(resultContainer);
  if (style.display === "none" || style.visibility === "hidden") return false;
  return cleanText(resultContainer.textContent).length > 0;
}

function fieldLabel(element) {
  if (element.id) {
    const explicit = document.querySelector(`label[for="${CSS.escape(element.id)}"]`);
    if (explicit) return cleanText(explicit.textContent);
  }

  const group = element.closest(
    ".calculator-form-group, .unit-group, .category-select, .input-group"
  );
  const nearby = group?.querySelector("label");
  if (nearby) return cleanText(nearby.textContent);

  return element.name || element.id || "Input";
}

function collectInputs() {
  const fields = [];
  const elements = document.querySelectorAll("main input, main select");

  elements.forEach((element) => {
    const type = (element.getAttribute("type") || "").toLowerCase();
    if (["button", "submit", "reset", "hidden"].includes(type)) return;

    let value = "";
    if (element.tagName === "SELECT") {
      value = cleanText(element.selectedOptions?.[0]?.textContent || element.value);
    } else {
      value = cleanText(element.value);
    }

    if (!value) return;

    fields.push({
      label: fieldLabel(element),
      value
    });
  });

  return fields.slice(0, 30);
}

function getResultData(resultContainer) {
  const summaryElement = resultContainer.querySelector(
    ".calculator-result-value, .result-value, #mainResult, #resultValue, #result"
  );

  const summary = cleanText(summaryElement?.textContent || resultContainer.textContent).slice(0, 500);
  const details = cleanText(resultContainer.textContent).slice(0, 5000);

  return { summary, details };
}

function calculatorName() {
  return cleanText(document.querySelector("h1")?.textContent || document.title.split("|")[0]);
}

function pageName() {
  const file = window.location.pathname.split("/").filter(Boolean).pop();
  return file || "index.html";
}

function createSavePanel(resultContainer) {
  const panel = document.createElement("div");
  panel.className = "save-calculation-panel";
  panel.hidden = true;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "save-calculation-button";
  button.textContent = "Save Calculation";

  const message = document.createElement("p");
  message.className = "save-calculation-message";
  message.setAttribute("role", "status");
  message.setAttribute("aria-live", "polite");

  panel.append(button, message);
  resultContainer.insertAdjacentElement("afterend", panel);

  function updateAuthState() {
    if (currentUser) {
      button.textContent = "Save Calculation";
      button.dataset.mode = "save";
      message.textContent = "";
    } else {
      button.textContent = "Login to Save";
      button.dataset.mode = "login";
      message.textContent = "Sign in to keep this result in your MECHCALC history.";
    }
  }

  function updateVisibility() {
    panel.hidden = !isResultVisible(resultContainer);
  }

  button.addEventListener("click", async () => {
    if (!currentUser) {
      window.location.href = "index.html#account";
      return;
    }

    const { summary, details } = getResultData(resultContainer);
    if (!summary) {
      message.textContent = "Calculate a result first, then save it.";
      return;
    }

    button.disabled = true;
    button.textContent = "Saving...";
    message.textContent = "";

    try {
      await addDoc(
        collection(db, "users", currentUser.uid, "calculations"),
        {
          calculator: calculatorName(),
          page: pageName(),
          sourceUrl: window.location.href.split("#")[0],
          inputs: collectInputs(),
          resultSummary: summary,
          resultDetails: details,
          savedAt: serverTimestamp(),
          savedAtClient: new Date().toISOString()
        }
      );

      button.textContent = "Saved ✓";
      message.textContent = "Calculation saved to your MECHCALC account.";

      window.setTimeout(() => {
        if (currentUser) button.textContent = "Save Calculation";
      }, 1800);
    } catch (error) {
      console.error("MECHCALC save error:", error);
      button.textContent = "Save Calculation";
      message.textContent =
        error?.code === "permission-denied"
          ? "Permission denied. Check your Firestore security rules."
          : "Could not save this calculation. Please try again.";
    } finally {
      button.disabled = false;
    }
  });

  const observer = new MutationObserver(updateVisibility);
  observer.observe(resultContainer, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  });

  window.addEventListener("resize", updateVisibility);
  updateAuthState();
  updateVisibility();

  return { updateAuthState, updateVisibility };
}

const resultContainer = getResultContainer();
const controls = resultContainer ? createSavePanel(resultContainer) : null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  controls?.updateAuthState();
  controls?.updateVisibility();
});
