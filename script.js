let currentMobileAgent = 1;
let agentStates = {
  1: { status: "working", progress: 75 },
  2: { status: "testing", progress: 45 },
  3: { status: "analyzing", progress: 30 },
  4: { status: "idle", progress: 0 },
};

// Initialize mobile view
function initializeMobileView() {
  if (window.innerWidth <= 768) {
    updateMobileAgent();
  }
}

// Switch agent in mobile view
function switchAgent(agentId) {
  currentMobileAgent = agentId;

  // Update tab states
  document.querySelectorAll(".agent-tab").forEach((tab, index) => {
    tab.classList.toggle("active", index + 1 === agentId);
  });

  updateMobileAgent();
}

// Update mobile agent content
function updateMobileAgent() {
  const mobileAgent = document.getElementById("mobile-agent");
  const sourceAgent = document.getElementById(`agent-${currentMobileAgent}`);

  if (mobileAgent && sourceAgent) {
    mobileAgent.innerHTML = sourceAgent.innerHTML;
  }
}

// Toggle agent chip
function toggleAgent(agentId) {
  const chip = document.querySelector(`.agent-chip:nth-child(${agentId})`);
  if (chip) {
    chip.classList.toggle("active");
  }
}

// Toggle sidebar sections
function toggleSection(titleElement) {
  const section = titleElement.closest(".sidebar-section");
  section.classList.toggle("collapsed");
}

// Existing functions
function broadcastPrompt() {
  const prompt = document.querySelector(".prompt-input").value;

  // Simulate agents starting work
  for (let i = 1; i <= 4; i++) {
    updateAgentStatus(i, 'Working<span class="typing-indicator"></span>');
  }

  // Update mobile view if on mobile
  if (window.innerWidth <= 768) {
    updateMobileAgent();
  }
}

function updateAgentStatus(agentId, status) {
  const statusElement = document.querySelector(
    `#agent-${agentId} .agent-status`
  );
  if (statusElement) {
    statusElement.innerHTML = status;
  }

  // Update mobile view if this is the current agent
  if (window.innerWidth <= 768 && agentId === currentMobileAgent) {
    updateMobileAgent();
  }
}

function commitAgent(agentId) {
  console.log(`Committing changes from Agent ${agentId}`);
}

function resetAgent(agentId) {
  console.log(`Resetting Agent ${agentId}`);
}

function showComparison() {
  console.log("Opening comparison view...");
}

function deployBest() {
  console.log("Deploying best solution (Claude-1)...");
}

// Simulate success after some time
setTimeout(() => {
  const successOverlay = document.getElementById("success-1");
  if (successOverlay) {
    successOverlay.classList.add("show");
  }
  updateAgentStatus(1, "Success");
}, 5000);

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    updateMobileAgent();
  }
});

// Initialize on load
window.addEventListener("load", initializeMobileView);

// Simulate real-time code updates (reduced frequency for mobile)
setInterval(() => {
  const codeLines = document.querySelectorAll(".code-line");
  if (codeLines.length > 0) {
    const randomLine = codeLines[Math.floor(Math.random() * codeLines.length)];
    randomLine.style.background = "#1f2937";
    setTimeout(() => {
      randomLine.style.background = "";
    }, 500);
  }
}, 5000); // Increased interval for better mobile performance
