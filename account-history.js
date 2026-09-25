import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "./firebase-client.js";

const section = document.getElementById("savedCalculationsSection");
const list = document.getElementById("savedCalculationsList");
const count = document.getElementById("savedCalculationsCount");
const status = document.getElementById("savedCalculationsStatus");
let unsubscribe = null;

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function setStatus(message) {
  if (status) status.textContent = message;
}

function formatDate(data) {
  try {
    if (data.savedAt?.toDate) {
      return data.savedAt.toDate().toLocaleString();
    }
    if (data.savedAtClient) {
      return new Date(data.savedAtClient).toLocaleString();
    }
  } catch (_) {
    // Fall through to default text.
  }
  return "Recently saved";
}

function safePage(page) {
  const name = String(page || "");
  return /^[a-z0-9-]+\.html$/i.test(name) ? name : "index.html#calculators";
}

function createFieldSummary(inputs) {
  const wrapper = document.createElement("div");
  wrapper.className = "history-inputs";

  if (!Array.isArray(inputs) || inputs.length === 0) {
    return wrapper;
  }

  inputs.slice(0, 8).forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "history-input-chip";
    chip.textContent = `${cleanText(item.label)}: ${cleanText(item.value)}`;
    wrapper.appendChild(chip);
  });

  return wrapper;
}

function createHistoryCard(snapshotDoc, user) {
  const data = snapshotDoc.data();

  const card = document.createElement("article");
  card.className = "history-card";

  const headingRow = document.createElement("div");
  headingRow.className = "history-card-heading";

  const titleWrap = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = cleanText(data.calculator) || "Saved Calculation";

  const date = document.createElement("p");
  date.className = "history-date";
  date.textContent = formatDate(data);

  titleWrap.append(title, date);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "history-delete-button";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", async () => {
    const approved = window.confirm("Delete this saved calculation?");
    if (!approved) return;

    deleteButton.disabled = true;
    try {
      await deleteDoc(
        doc(db, "users", user.uid, "calculations", snapshotDoc.id)
      );
    } catch (error) {
      console.error("MECHCALC delete error:", error);
      setStatus("Could not delete that calculation. Please try again.");
      deleteButton.disabled = false;
    }
  });

  headingRow.append(titleWrap, deleteButton);

  const result = document.createElement("p");
  result.className = "history-result";
  result.textContent = cleanText(data.resultSummary) || "Saved result";

  const inputs = createFieldSummary(data.inputs);

  const actions = document.createElement("div");
  actions.className = "history-actions";

  const openLink = document.createElement("a");
  openLink.href = safePage(data.page);
  openLink.textContent = "Open Calculator";
  openLink.className = "history-open-link";

  actions.appendChild(openLink);
  card.append(headingRow, result, inputs, actions);
  return card;
}

function subscribeToHistory(user) {
  if (!section || !list) return;

  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }

  section.hidden = false;
  setStatus("Loading saved calculations...");

  const calculationsQuery = query(
    collection(db, "users", user.uid, "calculations"),
    orderBy("savedAt", "desc")
  );

  unsubscribe = onSnapshot(
    calculationsQuery,
    (snapshot) => {
      list.replaceChildren();
      if (count) count.textContent = String(snapshot.size);

      if (snapshot.empty) {
        const empty = document.createElement("div");
        empty.className = "history-empty";
        empty.innerHTML = "<strong>No saved calculations yet.</strong><p>Open any calculator, calculate a result, and press Save Calculation.</p>";
        list.appendChild(empty);
        setStatus("");
        return;
      }

      snapshot.forEach((snapshotDoc) => {
        list.appendChild(createHistoryCard(snapshotDoc, user));
      });

      setStatus("");
    },
    (error) => {
      console.error("MECHCALC history error:", error);
      if (count) count.textContent = "0";
      setStatus(
        error?.code === "permission-denied"
          ? "History access was denied. Check your Firestore security rules."
          : "Could not load calculation history. Please refresh the page."
      );
    }
  );
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    subscribeToHistory(user);
  } else {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    if (section) section.hidden = true;
    if (list) list.replaceChildren();
    if (count) count.textContent = "0";
    setStatus("");
  }
});
