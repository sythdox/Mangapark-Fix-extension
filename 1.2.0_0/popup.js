const DEFAULTS = { enabled: true };
const GITHUB_URL = "https://github.com/sythdox";

const toggleEl = document.getElementById("toggle");
const statusEl = document.getElementById("status");
const fixBtn = document.getElementById("fixBtn");
const githubBtn = document.getElementById("githubBtn");

function setStatus(text) {
  statusEl.textContent = text || "";
}

function renderToggle(enabled) {
  toggleEl.classList.toggle("on", enabled);
  toggleEl.setAttribute("aria-checked", enabled ? "true" : "false");
}

function setEnabled(enabled) {
  chrome.storage.sync.set({ enabled: !!enabled }, () => {
    renderToggle(!!enabled);
    setStatus(enabled ? "Auto-fix is enabled ✅" : "Auto-fix is disabled ⛔ (manual fix still works)");
  });
}

function toggleEnabled() {
  chrome.storage.sync.get(DEFAULTS, (data) => {
    setEnabled(!data.enabled);
  });
}

async function rerunFix() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  chrome.tabs.sendMessage(tab.id, { type: "FIX_NOW" }, () => {
    
  });

  setStatus("Fix command sent ✅ (if you're on MangaPark)");
}

function openGithub() {
  chrome.tabs.create({ url: GITHUB_URL });
}

toggleEl.addEventListener("click", toggleEnabled);
toggleEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleEnabled();
  }
});

fixBtn.addEventListener("click", rerunFix);
githubBtn.addEventListener("click", openGithub);

// Init UI
chrome.storage.sync.get(DEFAULTS, (data) => {
  renderToggle(!!data.enabled);
  setStatus(data.enabled ? "Auto-fix is enabled ✅" : "Auto-fix is disabled ⛔ (manual fix still works)");
});
