import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
import { addDoc, collection, getFirestore, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8_dWWEnPoltWsgnLK8G15EH3s0Jgw5X8",
  authDomain: "project-maker-17602.firebaseapp.com",
  projectId: "project-maker-17602",
  storageBucket: "project-maker-17602.firebasestorage.app",
  messagingSenderId: "51404329428",
  appId: "1:51404329428:web:fbd1ae60545939807fc641",
  measurementId: "G-BWGSM1DBNF"
};

function toggleFaq(element) {
  const item = element.parentElement;
  item.classList.toggle("open");
}

function toggleMenu() {
  const links = document.querySelector(".nav-links");
  links.classList.toggle("is-open");
}

const statusElement = document.getElementById("firebase-status");
const dialogBackdrop = document.getElementById("plan-dialog-backdrop");
const closeDialogButton = document.getElementById("close-plan-dialog");
const planForm = document.getElementById("plan-form");
const formStatus = document.getElementById("form-status");
const submitPlanButton = document.getElementById("submit-plan-btn");
const selectedPlanInput = document.getElementById("selected-plan");
const selectedPlanLabel = document.getElementById("selected-plan-label");
const openPlanButtons = document.querySelectorAll(".open-plan-dialog");

window.toggleFaq = toggleFaq;
window.toggleMenu = toggleMenu;

function setFirebaseStatus(message, state) {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.dataset.state = state;
}

function setFormStatus(message, state = "") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.dataset.state = state;
}

function openPlanDialog(planName) {
  if (!dialogBackdrop || !selectedPlanInput || !selectedPlanLabel) return;

  selectedPlanInput.value = planName;
  selectedPlanLabel.value = planName;
  setFormStatus("");
  dialogBackdrop.hidden = false;
  document.body.classList.add("dialog-open");
}

function closePlanDialog() {
  if (!dialogBackdrop || !planForm) return;

  dialogBackdrop.hidden = true;
  document.body.classList.remove("dialog-open");
  planForm.reset();
  selectedPlanInput.value = "";
  selectedPlanLabel.value = "";
  setFormStatus("");
}

async function initFirebase() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const analyticsSupported = await isSupported();

    if (analyticsSupported) {
      getAnalytics(app);
      setFirebaseStatus("Firebase connected. Analytics is active.", "success");
    } else {
      setFirebaseStatus("Firebase connected. Analytics is not supported in this browser.", "warning");
    }

    openPlanButtons.forEach((button) => {
      button.addEventListener("click", () => {
        openPlanDialog(button.dataset.plan || "Selected plan");
      });
    });

    closeDialogButton?.addEventListener("click", closePlanDialog);

    dialogBackdrop?.addEventListener("click", (event) => {
      if (event.target === dialogBackdrop) {
        closePlanDialog();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && dialogBackdrop && !dialogBackdrop.hidden) {
        closePlanDialog();
      }
    });

    planForm?.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!selectedPlanInput.value) {
        setFormStatus("Please choose a plan again before submitting.", "error");
        return;
      }

      const formData = new FormData(planForm);
      const lead = {
        selectedPlan: selectedPlanInput.value,
        name: String(formData.get("name") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        projectTopic: String(formData.get("projectTopic") || "").trim(),
        deadline: String(formData.get("deadline") || "").trim(),
        notes: String(formData.get("notes") || "").trim(),
        submittedAt: serverTimestamp()
      };

      submitPlanButton.disabled = true;
      submitPlanButton.textContent = "Submitting...";
      setFormStatus("Saving your request...", "pending");

      try {
        await addDoc(collection(db, "planLeads"), lead);
        setFormStatus("Request saved successfully. We will contact you soon.", "success");
        planForm.reset();
        selectedPlanInput.value = lead.selectedPlan;
        selectedPlanLabel.value = lead.selectedPlan;

        window.setTimeout(() => {
          closePlanDialog();
        }, 1200);
      } catch (error) {
        console.error("Failed to save plan request:", error);
        setFormStatus("Could not save to Firebase. Check Firestore rules and configuration.", "error");
      } finally {
        submitPlanButton.disabled = false;
        submitPlanButton.textContent = "Submit request";
      }
    });
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    setFirebaseStatus("Firebase connection failed. Check the browser console for details.", "error");
    setFormStatus("Firebase is not ready yet, so form submissions are unavailable.", "error");
  }
}

initFirebase();
