# Nexus HVAC-Sim // Refrigerant Cycle Telemetry Console

An advanced, interactive educational simulation of a 4-stage vapor compression refrigeration cycle. This self-contained web console models real refrigerant thermodynamics, renders a dynamic Pressure-Enthalpy (p-h) diagram, simulates physical system faults, and synthesizes operating hums and warnings using the Web Audio API.

Rebuilt from the ground up for HVAC students, trade instructors, and engineering academics.

## 🚀 Key Features

* **Futuristic Cybernetic HUD**: Responsive dark-mode dashboard themed as a high-tech control center console, incorporating clean typography and glassmorphic telemetry cards.
* **Interactive SVG Schematic**: 
  - Dynamic fluid particles flowing along precise pipeline paths, with velocity mapped to calculated mass flow.
  - Custom animations including spinning indoor/outdoor fan blades and active compressor vibrations.
  - Highlight overlays that focus on selected components with detailed educational breakdowns.
  - Frost visual indicators that freeze the evaporator coil when operating conditions drop below 32°F (0°C).
* **Thermodynamic Engine Model**:
  - Simulates properties for four standard refrigerants: **R-410A, R-32, R-134a, and R-744 (CO₂)**.
  - Models pressure, temperature, enthalpy, superheat, subcooling, mass flow rate, compressor power consumption, cooling load capacity (BTU/h), and Coefficient of Performance (COP).
* **Live Pressure-Enthalpy (p-h) Envelope Chart**:
  - Plots the specific refrigerant's saturation vapor dome mathematically on an HTML5 `<canvas>` using log-pressure scaling.
  - Tracks and connects the four real-time state points in a closed thermodynamic loop.
  - Updates the cycle shape dynamically at 60 FPS as sliders are moved or faults are injected.
* **Synthesized Audio System (Web Audio API)**:
  - Generates realistic operating hums dynamically in-browser without external media files.
  - *Compressor Hum*: Pitch and amplitude modulate in real-time according to the compressor frequency (Hz) slider.
  - *Expansion Hiss*: Bandpass-filtered white noise volume-scales with the calculated mass flow rate.
  - *Telemetry Warning Alarm*: Synthesizes an intermittent 880Hz alert beep when system diagnostics exceed safety parameters.
* **Diagnostic Fault Injector**:
  - *Low Refrigerant Charge*: Causes evaporator starving, low suction pressure, elevated superheat, capacity drop, and coil icing.
  - *Blocked Air Filter*: Restricts heat exchange, causing low suction pressure/temperature and evaporator freeze-up.
  - *Dirty Condenser Coils*: Limits heat rejection, raising head pressure and compressor discharge temp to dangerous levels, triggering high-pressure alarms.
  - *Compressor Valve Leak*: Causes pressure equalization (high suction, low head), high bypass temperature, and catastrophic efficiency loss.
* **Cycle Assessment Exam**: A built-in interactive multiple-choice quiz validating understanding of fundamental HVAC cycle thermodynamics, complete with visual grading and synthesized chimes.

---

## 🛠️ How to Run Locally

This application is completely self-contained in a single portable file (`index.html`). No installations, compilers, node modules, or external assets are required.

1. Clone or download the repository.
2. Double-click [index.html](index.html) to open it in any modern web browser.
3. Click **"Run Sim"** or adjust any slider to initialize the telemetry feeds and the Web Audio synthesizer.

---

## ⚙️ Thermodynamic & Visual Controls

Adjust the parameters in the left-hand console to watch the system respond:
* **Indoor Heat Load (65°F - 85°F)**: Simulates the return air temperature flowing across the indoor coil.
* **Outdoor Ambient (75°F - 115°F)**: Adjusts the outdoor temperature, modifying the heat sink capacity.
* **Compressor Speed (30Hz - 120Hz)**: Simulates inverter compressor speed, driving mass flow and pressure ratios.
* **Valve Expansion (20% - 100%)**: Restricts or opens the Electronic Expansion Valve (EEV), adjusting refrigerant superheat.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
