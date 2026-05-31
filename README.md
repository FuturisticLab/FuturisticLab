Futuristic Lab 

Welcome to the unified repo for **FuturisticLab** web apps, experiments and tools. This repository hosts several client-side applications linked together by a central interactive portfolio hub, representing a "Living Workspace" innovation ecosystem interface. 

## Live Demo Hub
Deploy this repository to **GitHub Pages** to host all projects simultaneously. Once deployed, the landing page index launches at the root, and each project is served out of its respective subfolder:

👉 **Landing Portal**: `https://FuturisticLab.github.io/FuturisticLab/`

---

## Workspace Directory Structure

At the root lies a custom, Web Audio-enhanced interactive directory index page. Subdirectories host the consolidated code bases:

```text
FuturisticLab/
├── index.html                  # Central Portal landing page
├── script.js                   # Starfield generator, event ticker, and synth sound effects
├── README.md                   # Repository documentation
├── LICENSE                     # MIT License
├── .gitignore                  # Git exclusions file
│
├── AI-Prompt-Simulator/        # Echo AI (Conversational Prompt Engineer dashboard)
├── Air-Conditioner-Cycle/      # Quantum Net (Telemetry status and thermal cycles)
├── Drag-Drop-Editors/          # Memory Grid (Cognitive Sandbox workspace editor)
├── Navigation-Flow-Menu/       # NEXUS OS (Interface transitions and navigation flows)
└── Project-Lumina/             # Void Runner (Visual canvas and particle engine)
```

---

## Key Core Architectures

### 1. Unified Subdirectory Deployment
All 5 projects operate under relative assets paths, making them fully compatible with subdirectory hosting. No server routing adjustments are required.

### 2. Client-Side Web Audio Engine
The central landing page and the `AI-Prompt-Simulator` compile low-profile, clean synthesized audio feedbacks (clicks, sweeps, keyboard ticks, success chimes) directly in-browser using standard Web Audio oscillators. They do not request or fetch external assets.

### 3. Starfields and Dynamics
The starfield is generated dynamically via vanilla script loops, keeping file weights extremely low. Simulative time counters format event feeds relative to user session telemetry.

---

## Installation & Local Execution

1. Clone this repository locally:
   ```bash
   git clone https://github.com/FuturisticLab/FuturisticLab.git
   ```
2. Open `index.html` at the root of `FuturisticLab` folder in any modern browser.
3. Click on any of the project worlds (e.g., Echo AI, Void Runner, NEXUS OS) inside the central orbit grid to load that system's live demo dashboard.

## License
Licensed under the [MIT License](LICENSE).
