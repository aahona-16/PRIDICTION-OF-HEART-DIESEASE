"use strict";

const form           = document.getElementById("predictionForm");
const resultSection  = document.getElementById("resultSection");
const errorSection   = document.getElementById("errorSection");
const resultIcon     = document.getElementById("resultIcon");
const resultLabel    = document.getElementById("resultLabel");
const resultConf     = document.getElementById("resultConfidence");
const trainBadge     = document.getElementById("trainBadge");
const testBadge      = document.getElementById("testBadge");
const errorMsg       = document.getElementById("errorMsg");
const predictBtn     = document.getElementById("predictBtn");
const btnText        = document.getElementById("btnText");
const btnSpinner     = document.getElementById("btnSpinner");
const resetBtn       = document.getElementById("resetBtn");

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function setLoading(on) {
  predictBtn.disabled = on;
  btnText.classList.toggle("hidden", on);
  btnSpinner.classList.toggle("hidden", !on);
}

function hideResults() {
  resultSection.classList.add("hidden");
  errorSection.classList.add("hidden");
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
  errorSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function showResult(data) {
  const isDisease = data.prediction === 1;

  resultSection.classList.remove("hidden", "danger", "safe");
  resultSection.classList.add(isDisease ? "danger" : "safe");

  resultIcon.textContent  = isDisease ? "⚠️" : "✅";
  resultLabel.textContent = data.label;
  resultConf.textContent  = `Confidence: ${data.confidence}%`;
  trainBadge.textContent  = `Train accuracy: ${data.model_train_accuracy}%`;
  testBadge.textContent   = `Test accuracy:  ${data.model_test_accuracy}%`;

  errorSection.classList.add("hidden");
  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ------------------------------------------------------------------ */
/*  Inline validation helpers                                           */
/* ------------------------------------------------------------------ */
function validateField(el) {
  if (!el.value) {
    el.classList.add("invalid");
    return false;
  }
  el.classList.remove("invalid");
  return true;
}

/* ------------------------------------------------------------------ */
/*  Form submit                                                         */
/* ------------------------------------------------------------------ */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideResults();

  // Validate all fields
  const fields = form.querySelectorAll("input, select");
  let valid = true;
  fields.forEach((f) => { if (!validateField(f)) valid = false; });

  if (!valid) {
    showError("Please fill in all fields before predicting.");
    return;
  }

  // Build payload
  const payload = {};
  fields.forEach((f) => { payload[f.name] = parseFloat(f.value); });

  setLoading(true);
  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      showError(data.error || "Server error. Please try again.");
      return;
    }

    showResult(data);
  } catch (err) {
    showError("Could not reach the server. Is Flask running?");
  } finally {
    setLoading(false);
  }
});

/* ------------------------------------------------------------------ */
/*  Reset                                                               */
/* ------------------------------------------------------------------ */
resetBtn.addEventListener("click", () => {
  hideResults();
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
});

/* Remove invalid highlight on change */
form.querySelectorAll("input, select").forEach((el) => {
  el.addEventListener("input", () => el.classList.remove("invalid"));
  el.addEventListener("change", () => el.classList.remove("invalid"));
});
