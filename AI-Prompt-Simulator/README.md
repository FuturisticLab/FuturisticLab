# Neural Prompt Synthesizer

An immersive, futuristic cybernetic dashboard designed to engineer, compile, and simulate prompts for large language models (LLMs). The interface offers structured input panels, real-time syntax block rendering, dynamic preset assistants, custom audio cues, and an interactive typewriter terminal simulator to test responses against virtual model cores.

## Features

- **Futuristic HUD Interface**: Built with a sleek neon dark mode, scanlines, responsive cyberpunk buttons, and glassmorphic panels.
- **Interactive Prompter Stepper**: Clickable top stepper indicating progress through five modules: Task, Context, Limits, Examples, and Tone/Format.
- **Dynamic Helpers**: Quick-fill buttons, interactive constraint tags, example managers, and persona card selectors.
- **Real-Time Compiler HUD**: Inspect compiled syntax blocks (`[TASK]`, `[CONTEXT]`, `[CONSTRAINTS]`, `[EXAMPLES]`, and `[TONE_AND_FORMAT]`) as you type.
- **Synthesized Audio Engine**: Dynamic audio cues (button clicks, key ticks, panel slide sweeps, and completion chimes) synthesized locally using the browser's Web Audio API. Can be toggled on/off in the header.
- **Neural Core Simulator**: Run simulations against mock engines like `CYBER-GPT`, `NEURAL-CLAUDE`, and `DEEPMIND-NEXUS` to test output style and copy directives directly.

## Directory Structure

```text
├── index.html     # Main UI skeleton and layouts
├── style.css      # Custom stylesheet for the cyber design system
└── script.js      # State engine, Web Audio engine, and response simulator
```

## Getting Started

1. Clone or download this repository:
   ```bash
   git clone https://github.com/yourusername/neural-prompt-synthesizer.git
   ```
2. Open `index.html` in any modern web browser.
3. Start crafting prompts step-by-step or use the templates on Step 1 to test features.

## Security & Best Practices

- **Client-Side Sanitization**: Input text is processed using HTML entity escaping before rendering in the compiler preview to mitigate cross-site scripting (XSS) risks.
- **Zero Third-Party Dependencies**: The application runs completely offline and does not transmit data or load external trackers, ensuring that drafted prompts remain private.
- **Web Audio Context**: Sound effects conform to standard browser policies, initializing only upon user interaction.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
