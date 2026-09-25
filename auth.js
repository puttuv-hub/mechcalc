import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const forgotPasswordButton = document.getElementById("forgotPasswordButton");
const logoutButton = document.getElementById("logoutButton");
const loggedOutPanel = document.getElementById("authLoggedOutPanel");
const loggedInPanel = document.getElementById("authLoggedInPanel");
const userEmail = document.getElementById("authUserEmail");
const authMessage = document.getElementById("authMessage");

function showMessage(message, type = "info") {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.className = `auth-message ${type}`;
}

function setBusy(isBusy) {
  [loginButton, signupButton, forgotPasswordButton, logoutButton].forEach((button) => {
    if (button) button.disabled = isBusy;
  });
}

function friendlyError(error) {
  const code = error?.code || "";
  const messages = {
    "auth/email-already-in-use": "An account already exists with this email. Try logging in.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Use a stronger password with at least 6 characters.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/user-not-found": "No account was found for this email.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts. Please wait a little and try again.",
    "auth/network-request-failed": "Network error. Check your internet connection and try again.",
    "auth/operation-not-allowed": "Email/password login is not enabled yet in Firebase Authentication.",
    "auth/unauthorized-domain": "This website domain is not authorized in Firebase Authentication."
  };
  return messages[code] || "Authentication failed. Please try again.";
}

function getCredentials() {
  const email = emailInput?.value.trim() || "";
  const password = passwordInput?.value || "";

  if (!email) {
    throw new Error("Please enter your email address.");
  }
  if (!password) {
    throw new Error("Please enter your password.");
  }
  if (password.length < 6) {
    throw new Error("Password must contain at least 6 characters.");
  }
  return { email, password };
}

async function login(event) {
  event?.preventDefault();
  showMessage("");
  try {
    const { email, password } = getCredentials();
    setBusy(true);
    await signInWithEmailAndPassword(auth, email, password);
    showMessage("Login successful.", "success");
    if (passwordInput) passwordInput.value = "";
  } catch (error) {
    showMessage(error?.code ? friendlyError(error) : error.message, "error");
  } finally {
    setBusy(false);
  }
}

async function signup() {
  showMessage("");
  try {
    const { email, password } = getCredentials();
    setBusy(true);
    await createUserWithEmailAndPassword(auth, email, password);
    showMessage("Account created successfully. You are now signed in.", "success");
    if (passwordInput) passwordInput.value = "";
  } catch (error) {
    showMessage(error?.code ? friendlyError(error) : error.message, "error");
  } finally {
    setBusy(false);
  }
}

async function resetPassword() {
  showMessage("");
  const email = emailInput?.value.trim() || "";
  if (!email) {
    showMessage("Enter your email address first, then click Forgot password.", "error");
    emailInput?.focus();
    return;
  }

  try {
    setBusy(true);
    await sendPasswordResetEmail(auth, email);
    showMessage("Password reset email sent. Check your inbox and spam folder.", "success");
  } catch (error) {
    showMessage(friendlyError(error), "error");
  } finally {
    setBusy(false);
  }
}

async function logout() {
  showMessage("");
  try {
    setBusy(true);
    await signOut(auth);
    showMessage("You have been logged out.", "success");
  } catch (error) {
    showMessage(friendlyError(error), "error");
  } finally {
    setBusy(false);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (loggedOutPanel) loggedOutPanel.hidden = true;
    if (loggedInPanel) loggedInPanel.hidden = false;
    if (userEmail) userEmail.textContent = user.email || "Signed-in user";
  } else {
    if (loggedOutPanel) loggedOutPanel.hidden = false;
    if (loggedInPanel) loggedInPanel.hidden = true;
    if (userEmail) userEmail.textContent = "";
  }
});

authForm?.addEventListener("submit", login);
signupButton?.addEventListener("click", signup);
forgotPasswordButton?.addEventListener("click", resetPassword);
logoutButton?.addEventListener("click", logout);
