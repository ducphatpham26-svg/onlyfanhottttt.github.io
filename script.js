// AI-assisted: Initial structure and logic generated with AI, then to be reviewed and customized by student.

// ====== STATE ======
let fanOn = false;
let fanSpeed = "off"; // "off" | "low" | "medium" | "high"
let fireLevel = 1; // 1 = normal, 2 = strong, 3 = intense
let soundOn = true;

let meatState = "raw"; // "raw" | "cooked" | "burnt"
let roastingInterval = null;
let isRoasting = false;

// ====== DOM ELEMENTS ======
const fanPanel = document.querySelector(".fan-panel");
const fanToggleBtn = document.getElementById("fan-toggle");
const fanSpeedButtons = document.querySelectorAll(".fan-speed-btn");

const firePanel = document.querySelector(".fire-panel");
const fireElement = document.querySelector(".fire");
const meatElement = document.getElementById("meat");

const addWoodBtn = document.getElementById("add-wood");
const roastMeatBtn = document.getElementById("roast-meat");
const stopRoastBtn = document.getElementById("stop-roast");

const soundToggleBtn = document.getElementById("sound-toggle");
const statusText = document.getElementById("status-text");

const windAudio = document.getElementById("wind-audio");
const fireAudio = document.getElementById("fire-audio");

// ====== INIT ======
function init() {
  updateFanUI();
  updateFireUI();
  updateMeatUI();
  updateStatus();
  setupAudio();
}

function setupAudio() {
  // Volume defaults
  windAudio.volume = 0.5;
  fireAudio.volume = 0.6;

  // Auto-play fire sound softly at start
  if (soundOn) {
    fireAudio.play().catch(() => {
      // Browser may block autoplay; user interaction will start it later
    });
  }
}

// ====== FAN LOGIC ======
fanToggleBtn.addEventListener("click", () => {
  fanOn = !fanOn;
  if (!fanOn) {
    fanSpeed = "off";
  } else if (fanSpeed === "off") {
    fanSpeed = "low";
  }
  updateFanUI();
  updateFireFromFan();
  updateStatus();
  updateAudio();
});

fanSpeedButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!fanOn) {
      fanOn = true;
    }
    fanSpeed = btn.dataset.speed;
    updateFanUI();
    updateFireFromFan();
    updateStatus();
    updateAudio();
  });
});

function updateFanUI() {
  fanPanel.classList.remove("fan-off", "fan-low", "fan-medium", "fan-high");

  if (!fanOn || fanSpeed === "off") {
    fanPanel.classList.add("fan-off");
    fanToggleBtn.textContent = "Turn On";
  } else {
    fanToggleBtn.textContent = "Turn Off";
    if (fanSpeed === "low") fanPanel.classList.add("fan-low");
    if (fanSpeed === "medium") fanPanel.classList.add("fan-medium");
    if (fanSpeed === "high") fanPanel.classList.add("fan-high");
  }

  fanSpeedButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.speed === fanSpeed);
  });
}

// ====== FIRE LOGIC ======
addWoodBtn.addEventListener("click", () => {
  fireLevel = Math.min(3, fireLevel + 1);
  updateFireUI();
  updateStatus();
  updateAudio();
});

function updateFireFromFan() {
  // Simple rule: stronger fan -> stronger fire (for fun, not physics 😄)
  if (!fanOn || fanSpeed === "off") return;

  if (fanSpeed === "low") {
    fireLevel = Math.min(3, fireLevel + 0); // no change
  } else if (fanSpeed === "medium") {
    fireLevel = Math.min(3, fireLevel + 1);
  } else if (fanSpeed === "high") {
    fireLevel = Math.min(3, fireLevel + 2);
  }
  updateFireUI();
}

function updateFireUI() {
  fireElement.classList.remove("fire-normal", "fire-strong", "fire-intense");
  if (fireLevel === 1) {
    fireElement.classList.add("fire-normal");
  } else if (fireLevel === 2) {
    fireElement.classList.add("fire-strong");
  } else {
    fireElement.classList.add("fire-intense");
  }
}

// ====== MEAT / ROASTING LOGIC ======
roastMeatBtn.addEventListener("click", () => {
  if (isRoasting) return;
  startRoasting();
});

stopRoastBtn.addEventListener("click", () => {
  stopRoasting();
});

function startRoasting() {
  isRoasting = true;
  meatState = "raw";
  updateMeatUI();
  updateStatus();

  let progress = 0;
  const roastSpeed = 1000; // ms per step

  roastingInterval = setInterval(() => {
    progress++;

    // Fire level affects cooking speed
    const effectiveLevel = fireLevel + (fanOn ? 1 : 0);

    if (progress >= 2 && meatState === "raw") {
      meatState = "cooked";
      updateMeatUI();
      updateStatus();
    }

    if (progress >= 4 - Math.min(2, effectiveLevel) && meatState === "cooked") {
      meatState = "burnt";
      updateMeatUI();
      updateStatus();
      alert("Oops! Your BBQ is burnt. 😅");
      stopRoasting();
    }
  }, roastSpeed);
}

function stopRoasting() {
  isRoasting = false;
  if (roastingInterval) {
    clearInterval(roastingInterval);
    roastingInterval = null;
  }
}

function updateMeatUI() {
  meatElement.classList.remove("raw", "cooked", "burnt");
  meatElement.classList.add(meatState);
}

// ====== SOUND LOGIC ======
soundToggleBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  updateAudio();
});

function updateAudio() {
  if (!soundOn) {
    soundToggleBtn.textContent = "Sound Off";
    windAudio.pause();
    fireAudio.pause();
    return;
  }

  soundToggleBtn.textContent = "Sound On";

  // Fire sound always on softly
  if (fireAudio.paused) {
    fireAudio.play().catch(() => {});
  }

  // Wind sound depends on fan
  if (!fanOn || fanSpeed === "off") {
    windAudio.pause();
  } else {
    if (windAudio.paused) {
      windAudio.play().catch(() => {});
    }
    // Adjust volume by speed
    if (fanSpeed === "low") windAudio.volume = 0.3;
    if (fanSpeed === "medium") windAudio.volume = 0.6;
    if (fanSpeed === "high") windAudio.volume = 0.9;
  }
}

// ====== STATUS TEXT ======
function updateStatus() {
  const fanStatus = fanOn ? `Fan ${fanSpeed}` : "Fan Off";
  let fireStatus = "Fire Normal";
  if (fireLevel === 2) fireStatus = "Fire Strong";
  if (fireLevel === 3) fireStatus = "Fire Intense";

  let meatStatus = "Meat Raw";
  if (meatState === "cooked") meatStatus = "Meat Cooked";
  if (meatState === "burnt") meatStatus = "Meat Burnt";

  statusText.textContent = `Status: ${fanStatus}, ${fireStatus}, ${meatStatus}.`;
}

// ====== START ======
init();
