document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Navigation & Audio
    const soundToggle = document.getElementById('sound-toggle');
    const stepNodes = document.querySelectorAll('.step-node');
    const stepConnectors = document.querySelectorAll('.step-connector');
    const stepName = document.getElementById('step-name');
    const instructionText = document.getElementById('instruction-text');
    const userInput = document.getElementById('user-input');
    const textareaWrapper = document.getElementById('textarea-input-wrapper');
    const stepAssistants = document.getElementById('step-assistants');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    // DOM Elements - Compiler Display
    const hudTask = document.getElementById('hud-task');
    const hudContext = document.getElementById('hud-context');
    const hudConstraints = document.getElementById('hud-constraints');
    const hudExamples = document.getElementById('hud-examples');
    const hudToneFormat = document.getElementById('hud-tone-format');

    // DOM Elements - Simulator Overlay
    const simulatorOverlay = document.getElementById('simulator-overlay');
    const simCloseButton = document.getElementById('sim-close-button');
    const finalPromptText = document.getElementById('final-prompt-text');
    const copyButton = document.getElementById('copy-button');
    const editButton = document.getElementById('edit-button');
    const modelSelector = document.getElementById('model-selector');
    const runSimulationButton = document.getElementById('run-simulation-button');
    const terminalLogs = document.getElementById('terminal-logs');

    // -------------------------------------------------------------
    // AUDIO ENGINE (Web Audio API)
    // -------------------------------------------------------------
    let audioCtx = null;
    let soundEnabled = true;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Sound effect: Simple clean click
    function playClick() {
        if (!soundEnabled) return;
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    }

    // Sound effect: Cyber hover blip
    function playHover() {
        if (!soundEnabled) return;
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        osc.frequency.setValueAtTime(1800, audioCtx.currentTime + 0.02);

        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
    }

    // Sound effect: Keyboard typing tick
    function playTypeTick() {
        if (!soundEnabled) return;
        initAudio();
        // Use high-passed white noise or a short high frequency sine
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(2500 + Math.random() * 800, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.015);
    }

    // Sound effect: Moving to next step
    function playStepTransition() {
        if (!soundEnabled) return;
        initAudio();
        const osc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.25);
        
        filter.frequency.setValueAtTime(300, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.25);

        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
    }

    // Sound effect: Success compile chime (cyber-chord)
    function playCompileChime() {
        if (!soundEnabled) return;
        initAudio();
        
        const now = audioCtx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);
            
            gain.gain.setValueAtTime(0.06, now + idx * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.6);
            
            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.6);
        });
    }

    // Handle sound toggle interaction
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            soundToggle.innerHTML = '<span class="btn-icon">🔊</span> AUDIO: ACTIVE';
            soundToggle.classList.remove('muted');
            playClick();
        } else {
            soundToggle.innerHTML = '<span class="btn-icon">🔇</span> AUDIO: MUTED';
            soundToggle.classList.add('muted');
        }
    });

    // -------------------------------------------------------------
    // STATE MANAGEMENT
    // -------------------------------------------------------------
    let currentStep = 0;
    const promptData = {
        task: '',
        context: '',
        constraints: [],
        examples: [],
        tone: '',
        format: ''
    };

    // -------------------------------------------------------------
    // PRESET DATA FOR ASSISTANTS
    // -------------------------------------------------------------
    const stepConfigs = [
        {
            // STEP 0: TASK
            name: "STEP 01: Core Task Definition",
            instruction: "Identify the core objective or action you want the AI engine to execute.",
            placeholder: "e.g., Write a micro-service to process user accounts, Draft a dark sci-fi outline...",
            init: () => {
                textareaWrapper.style.display = 'block';
                userInput.value = promptData.task;
                
                // Set up preset buttons
                stepAssistants.innerHTML = `
                    <span class="assist-title">CORE DIRECTIVE TEMPLATES:</span>
                    <div class="presets-grid">
                        <button class="preset-tag" data-val="Write a short story about an AI developing sentience inside a quantum supercomputer">
                            <span class="preset-name">Sci-Fi Creative</span>
                            <span class="preset-desc">Creative story writing</span>
                        </button>
                        <button class="preset-tag" data-val="Design a reusable JavaScript AudioContext class to generate custom sound effects">
                            <span class="preset-name">Code Architect</span>
                            <span class="preset-desc">Modern JS Development</span>
                        </button>
                        <button class="preset-tag" data-val="Analyze the quarterly server telemetry log and highlight anomalous spikes">
                            <span class="preset-name">Log Analyst</span>
                            <span class="preset-desc">Data & anomaly investigation</span>
                        </button>
                        <button class="preset-tag" data-val="Translate the following technological document into cyberpunk slang">
                            <span class="preset-name">Slang Translator</span>
                            <span class="preset-desc">Stylistic conversion</span>
                        </button>
                    </div>
                `;
                
                // Add event listeners to presets
                stepAssistants.querySelectorAll('.preset-tag').forEach(btn => {
                    btn.addEventListener('click', () => {
                        userInput.value = btn.getAttribute('data-val');
                        promptData.task = userInput.value;
                        playClick();
                        updateCompilerDisplay();
                    });
                    btn.addEventListener('mouseenter', playHover);
                });
            },
            save: () => {
                promptData.task = userInput.value.trim();
            }
        },
        {
            // STEP 1: CONTEXT
            name: "STEP 02: Context Enrichment",
            instruction: "Provide background parameters, environmental context, or specific datasets to restrict the scope.",
            placeholder: "e.g., The system operates in a highly-constrained embedded environment. Focus on minimal memory usage...",
            init: () => {
                textareaWrapper.style.display = 'block';
                userInput.value = promptData.context;

                stepAssistants.innerHTML = `
                    <span class="assist-title">RECOMMENDED SCOPE PARAMETERS:</span>
                    <div class="presets-grid">
                        <button class="preset-tag" data-val="Assume the reader is an expert engineer with deep systems knowledge.">
                            <span class="preset-name">Expert Audience</span>
                            <span class="preset-desc">Technical depth</span>
                        </button>
                        <button class="preset-tag" data-val="Set the scene in a neo-noir metropolis dominated by neon holograms and persistent rain.">
                            <span class="preset-name">Cyber Aesthetic</span>
                            <span class="preset-desc">Atmospheric context</span>
                        </button>
                        <button class="preset-tag" data-val="The target environment runs Node 20.x, utilizing ESM syntax and zero external packages.">
                            <span class="preset-name">Runtime Details</span>
                            <span class="preset-desc">Technological constraints</span>
                        </button>
                        <button class="preset-tag" data-val="Strictly process this as a dry, technical run of server activity reports.">
                            <span class="preset-name">Clinical Focus</span>
                            <span class="preset-desc">Strict analytical framing</span>
                        </button>
                    </div>
                `;

                stepAssistants.querySelectorAll('.preset-tag').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const val = btn.getAttribute('data-val');
                        if (userInput.value) {
                            userInput.value += ' ' + val;
                        } else {
                            userInput.value = val;
                        }
                        promptData.context = userInput.value;
                        playClick();
                        updateCompilerDisplay();
                    });
                    btn.addEventListener('mouseenter', playHover);
                });
            },
            save: () => {
                promptData.context = userInput.value.trim();
            }
        },
        {
            // STEP 2: LIMITS & CONSTRAINTS
            name: "STEP 03: Constraints & Limits",
            instruction: "Establish boundary protocols. What must the AI avoid, or what rigid limits must it satisfy?",
            placeholder: "Add custom limits above or select protocol tags below...",
            init: () => {
                textareaWrapper.style.display = 'block';
                userInput.value = '';
                userInput.placeholder = "Enter custom constraint and press Next, or toggle templates below...";

                const suggestions = [
                    "Concise output",
                    "No explanations",
                    "Show step-by-step reasoning",
                    "Valid JSON format only",
                    "Do not mention brand names",
                    "Keep under 200 words",
                    "Use GFM markdown styling",
                    "Include strict error handling"
                ];

                let tagsHTML = `<span class="assist-title">TOGGLE SYSTEM LIMIT CONSTRAINTS:</span><div class="tags-container">`;
                suggestions.forEach(tag => {
                    const isSelected = promptData.constraints.includes(tag);
                    tagsHTML += `<span class="suggested-tag ${isSelected ? 'selected' : ''}" data-val="${tag}">${tag}</span>`;
                });
                tagsHTML += `</div>`;

                stepAssistants.innerHTML = tagsHTML;

                // Wire up tags
                stepAssistants.querySelectorAll('.suggested-tag').forEach(tagEl => {
                    tagEl.addEventListener('click', () => {
                        const val = tagEl.getAttribute('data-val');
                        const index = promptData.constraints.indexOf(val);
                        if (index === -1) {
                            promptData.constraints.push(val);
                            tagEl.classList.add('selected');
                        } else {
                            promptData.constraints.splice(index, 1);
                            tagEl.classList.remove('selected');
                        }
                        playClick();
                        updateCompilerDisplay();
                    });
                    tagEl.addEventListener('mouseenter', playHover);
                });
            },
            save: () => {
                const customConstraint = userInput.value.trim();
                if (customConstraint && !promptData.constraints.includes(customConstraint)) {
                    promptData.constraints.push(customConstraint);
                }
            }
        },
        {
            // STEP 3: FEW SHOT EXAMPLES
            name: "STEP 04: Few-Shot Example Matrix",
            instruction: "Provide high-quality input/output pairs to program the model's pattern recognition.",
            placeholder: "",
            init: () => {
                // Hide main textarea since we use specialized inputs
                textareaWrapper.style.display = 'none';

                stepAssistants.innerHTML = `
                    <div class="examples-builder">
                        <span class="assist-title">ADD DEMONSTRATION PAIR:</span>
                        <div class="example-fields">
                            <input type="text" id="ex-input" placeholder="User Input pattern...">
                            <input type="text" id="ex-output" placeholder="Expected AI response...">
                        </div>
                        <button id="add-example-btn" class="hud-button primary" style="padding: 6px 12px; font-size: 0.75rem; margin-top: 5px;">
                            ➕ ADD EXAMPLE PROTOCOL
                        </button>
                    </div>
                    <span class="assist-title" style="margin-top: 5px;">CURRENT PROTOCOLS REGISTERED:</span>
                    <div class="examples-list" id="examples-list"></div>
                `;

                const addBtn = document.getElementById('add-example-btn');
                const exInput = document.getElementById('ex-input');
                const exOutput = document.getElementById('ex-output');
                const listContainer = document.getElementById('examples-list');

                const renderLocalList = () => {
                    if (promptData.examples.length === 0) {
                        listContainer.innerHTML = `<span style="font-size:0.75rem; color:var(--text-secondary); font-style:italic;">No patterns registered.</span>`;
                        return;
                    }
                    listContainer.innerHTML = '';
                    promptData.examples.forEach((item, index) => {
                        const div = document.createElement('div');
                        div.className = 'example-item';
                        div.innerHTML = `
                            <span class="example-item-text">IN: "${item.input}" ➜ OUT: "${item.output}"</span>
                            <button class="example-item-remove" data-index="${index}">&times;</button>
                        `;
                        div.querySelector('.example-item-remove').addEventListener('click', () => {
                            promptData.examples.splice(index, 1);
                            playClick();
                            renderLocalList();
                            updateCompilerDisplay();
                        });
                        listContainer.appendChild(div);
                    });
                };

                addBtn.addEventListener('click', () => {
                    const inputVal = exInput.value.trim();
                    const outputVal = exOutput.value.trim();
                    if (inputVal && outputVal) {
                        promptData.examples.push({ input: inputVal, output: outputVal });
                        exInput.value = '';
                        exOutput.value = '';
                        playClick();
                        renderLocalList();
                        updateCompilerDisplay();
                    }
                });

                renderLocalList();
            },
            save: () => {
                // Examples are saved progressively, nothing to extract from general input
            }
        },
        {
            // STEP 4: TONE & FORMAT
            name: "STEP 05: Style, Tone & Output Format Protocols",
            instruction: "Define the persona profile and format parameters for the compiled output.",
            placeholder: "",
            init: () => {
                textareaWrapper.style.display = 'none';

                stepAssistants.innerHTML = `
                    <span class="assist-title">CHOOSE AI PERSONA PROTOCOL:</span>
                    <div class="tones-grid">
                        <div class="tone-card" data-tone="analytical">
                            <span class="tone-icon">🤖</span>
                            <span class="tone-label">SYNTH ANALYST</span>
                            <span class="tone-desc">Hyper-logical, data-first</span>
                        </div>
                        <div class="tone-card" data-tone="creative">
                            <span class="tone-icon">✨</span>
                            <span class="tone-label">CYBER BARD</span>
                            <span class="tone-desc">Evocative, metaphors</span>
                        </div>
                        <div class="tone-card" data-tone="rebel">
                            <span class="tone-icon">☠️</span>
                            <span class="tone-label">DE-COMPILER</span>
                            <span class="tone-desc">Rogue terminal agent slang</span>
                        </div>
                    </div>

                    <span class="assist-title" style="margin-top: 5px;">CHOOSE DESIRED STRUCT PROTOCOL:</span>
                    <div class="formats-hud-row">
                        <button class="format-btn" data-format="markdown">MARKDOWN DOC</button>
                        <button class="format-btn" data-format="json">JSON DATA</button>
                        <button class="format-btn" data-format="code">CODE BLOCK</button>
                        <button class="format-btn" data-format="bullets">BULLET MATRIX</button>
                    </div>
                `;

                // Set initial active state from data
                if (promptData.tone) {
                    const activeTone = stepAssistants.querySelector(`.tone-card[data-tone="${promptData.tone}"]`);
                    if (activeTone) activeTone.classList.add('selected');
                }
                if (promptData.format) {
                    const activeFormat = stepAssistants.querySelector(`.format-btn[data-format="${promptData.format}"]`);
                    if (activeFormat) activeFormat.classList.add('selected');
                }

                // Tones listeners
                stepAssistants.querySelectorAll('.tone-card').forEach(card => {
                    card.addEventListener('click', () => {
                        stepAssistants.querySelectorAll('.tone-card').forEach(c => c.classList.remove('selected'));
                        card.classList.add('selected');
                        promptData.tone = card.getAttribute('data-tone');
                        playClick();
                        updateCompilerDisplay();
                    });
                    card.addEventListener('mouseenter', playHover);
                });

                // Format listeners
                stepAssistants.querySelectorAll('.format-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        stepAssistants.querySelectorAll('.format-btn').forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                        promptData.format = btn.getAttribute('data-format');
                        playClick();
                        updateCompilerDisplay();
                    });
                    btn.addEventListener('mouseenter', playHover);
                });
            },
            save: () => {
                // Tones and formats are saved progressively
            }
        },
        {
            // STEP 5: READY & COMPILE
            name: "STEP 06: Compiling Prompts",
            instruction: "Your directives are compiled. Click 'SYNTHESIZE' to verify syntax, lock the data blocks, and run AI simulations.",
            placeholder: "",
            init: () => {
                textareaWrapper.style.display = 'none';
                stepAssistants.innerHTML = `
                    <div class="console-instruction" style="border-color: var(--neon-pink); background: rgba(255, 0, 85, 0.05); text-align: center; padding: 25px;">
                        <span style="font-family: var(--font-header); font-size: 1.2rem; color: var(--neon-pink); text-shadow: var(--glow-shadow-pink); font-weight: bold; display: block; margin-bottom: 10px;">
                            SYSTEM COMPILATION STANDBY
                        </span>
                        <p style="font-size: 0.9rem; color: var(--text-primary);">
                            All neural telemetry structures are verified. Output format is mapped. Click 'SYNTHESIZE' below to mount target cores.
                        </p>
                    </div>
                `;
            },
            save: () => {}
        }
    ];

    // -------------------------------------------------------------
    // RUNTIME INTERFACE UPDATE
    // -------------------------------------------------------------
    function loadStep(stepIdx) {
        currentStep = stepIdx;
        const config = stepConfigs[currentStep];

        // Update step status tracking HUD
        stepNodes.forEach((node, idx) => {
            node.classList.remove('active', 'completed');
            if (idx === currentStep) {
                node.classList.add('active');
            } else if (idx < currentStep) {
                node.classList.add('completed');
            }
        });

        // Update titles & text
        stepName.textContent = config.name;
        instructionText.textContent = config.instruction;
        userInput.placeholder = config.placeholder || '';
        
        // Initialize step components
        config.init();

        // Control buttons
        prevButton.disabled = currentStep === 0;
        
        if (currentStep === stepConfigs.length - 1) {
            nextButton.innerHTML = 'SYNTHESIZE <span class="btn-arrow">⚡</span>';
            nextButton.className = 'hud-button accent';
        } else {
            nextButton.innerHTML = 'NEXT <span class="btn-arrow">▶</span>';
            nextButton.className = 'hud-button primary';
        }
    }

    // Capture input live to update Right HUD in real-time
    userInput.addEventListener('input', () => {
        playTypeTick();
        if (currentStep === 0) {
            promptData.task = userInput.value;
        } else if (currentStep === 1) {
            promptData.context = userInput.value;
        }
        updateCompilerDisplay();
    });

    // Real-time right panel builder
    function updateCompilerDisplay() {
        // Task display
        if (promptData.task.trim()) {
            hudTask.innerHTML = `"<span class="code-value">${escapeHtml(promptData.task)}</span>"`;
            hudTask.className = '';
        } else {
            hudTask.innerHTML = `&lt;Pending Directive&gt;`;
            hudTask.className = 'code-placeholder';
        }

        // Context display
        if (promptData.context.trim()) {
            hudContext.innerHTML = `"<span class="code-value">${escapeHtml(promptData.context)}</span>"`;
            hudContext.className = '';
        } else {
            hudContext.innerHTML = `&lt;Pending Background parameters&gt;`;
            hudContext.className = 'code-placeholder';
        }

        // Constraints display
        if (promptData.constraints.length > 0) {
            const listStr = promptData.constraints.map(c => `\n  - <span class="code-value">${escapeHtml(c)}</span>`).join('');
            hudConstraints.innerHTML = `[${listStr}\n]`;
            hudConstraints.className = '';
        } else {
            hudConstraints.innerHTML = `&lt;Pending Limits&gt;`;
            hudConstraints.className = 'code-placeholder';
        }

        // Examples display
        if (promptData.examples.length > 0) {
            const listStr = promptData.examples.map(ex => `\n  - <span class="code-comment">// Input/Output pair</span>\n    IN: <span class="code-value">"${escapeHtml(ex.input)}"</span> ➜ OUT: <span class="code-value">"${escapeHtml(ex.output)}"</span>`).join('');
            hudExamples.innerHTML = `[${listStr}\n]`;
            hudExamples.className = '';
        } else {
            hudExamples.innerHTML = `&lt;Optional Few-shot parameters&gt;`;
            hudExamples.className = 'code-placeholder';
        }

        // Tone & Format display
        if (promptData.tone || promptData.format) {
            const tonePart = promptData.tone ? `TONE: <span class="code-value">${promptData.tone.toUpperCase()}</span>` : `TONE: &lt;Pending&gt;`;
            const formatPart = promptData.format ? `FORMAT: <span class="code-value">${promptData.format.toUpperCase()}</span>` : `FORMAT: &lt;Pending&gt;`;
            hudToneFormat.innerHTML = `${tonePart} | ${formatPart}`;
            hudToneFormat.className = '';
        } else {
            hudToneFormat.innerHTML = `&lt;Pending Style Protocols&gt;`;
            hudToneFormat.className = 'code-placeholder';
        }
    }

    // Helper: Escaping HTML input safely
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Button flow controls
    nextButton.addEventListener('click', () => {
        // Save current step data
        stepConfigs[currentStep].save();

        if (currentStep < stepConfigs.length - 1) {
            playStepTransition();
            loadStep(currentStep + 1);
            updateCompilerDisplay();
        } else {
            // Compilation & Open Simulator Overlay
            playCompileChime();
            openSimulator();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentStep > 0) {
            playStepTransition();
            loadStep(currentStep - 1);
            updateCompilerDisplay();
        }
    });

    // Directly navigate stepper HUD by clicking nodes
    stepNodes.forEach(node => {
        node.addEventListener('click', () => {
            const stepNum = parseInt(node.getAttribute('data-step'));
            // Save before jumping
            stepConfigs[currentStep].save();
            playStepTransition();
            loadStep(stepNum);
            updateCompilerDisplay();
        });
    });

    // -------------------------------------------------------------
    // GENERATING FINAL RENDERED PROMPT
    // -------------------------------------------------------------
    function compileFinalPrompt() {
        let compiled = "";

        if (promptData.task) {
            compiled += `### CORE TASK:\n${promptData.task}\n\n`;
        }
        if (promptData.context) {
            compiled += `### CONTEXT:\n${promptData.context}\n\n`;
        }
        if (promptData.constraints.length > 0) {
            compiled += `### CONSTRAINTS:\n`;
            promptData.constraints.forEach(c => {
                compiled += `- ${c}\n`;
            });
            compiled += `\n`;
        }
        if (promptData.examples.length > 0) {
            compiled += `### EXAMPLES:\n`;
            promptData.examples.forEach((ex, idx) => {
                compiled += `Example ${idx + 1}:\n- Input: ${ex.input}\n- Expected Output: ${ex.output}\n`;
            });
            compiled += `\n`;
        }
        if (promptData.tone || promptData.format) {
            compiled += `### RESPONSE STYLE PROTOCOLS:\n`;
            if (promptData.tone) {
                compiled += `- Tone/Persona: ${promptData.tone.toUpperCase()}\n`;
            }
            if (promptData.format) {
                compiled += `- Format/Structure: ${promptData.format.toUpperCase()}\n`;
            }
        }

        return compiled.trim();
    }

    // -------------------------------------------------------------
    // AI CORE SIMULATION MODAL
    // -------------------------------------------------------------
    function openSimulator() {
        const finalPrompt = compileFinalPrompt();
        finalPromptText.textContent = finalPrompt;

        // Reset Simulator logs
        terminalLogs.innerHTML = `<p class="term-line system-line">&gt; SYSTEM COMPILER CONNECTED. READY FOR CORE MOUNT.</p>`;

        simulatorOverlay.style.display = 'flex';
    }

    simCloseButton.addEventListener('click', () => {
        playClick();
        simulatorOverlay.style.display = 'none';
    });

    editButton.addEventListener('click', () => {
        playClick();
        simulatorOverlay.style.display = 'none';
        loadStep(5); // Jump back to Step 5 (compile step)
    });

    copyButton.addEventListener('click', () => {
        const finalPrompt = compileFinalPrompt();
        navigator.clipboard.writeText(finalPrompt).then(() => {
            playClick();
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '✔️ COPIED PROMPT!';
            copyButton.style.backgroundColor = 'var(--neon-green)';
            copyButton.style.color = '#000';
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.style.backgroundColor = '';
                copyButton.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Copy failed: ', err);
        });
    });

    // -------------------------------------------------------------
    // terminal execution simulator
    // -------------------------------------------------------------
    let simulationRunning = false;

    runSimulationButton.addEventListener('click', () => {
        if (simulationRunning) return;
        runSimulation();
    });

    function runSimulation() {
        simulationRunning = true;
        runSimulationButton.disabled = true;
        terminalLogs.innerHTML = '';

        const selectedCore = modelSelector.value;
        const coreName = modelSelector.options[modelSelector.selectedIndex].text;

        const systemBootLogs = [
            `> CONNECTING TO NEURAL LINK [${coreName}]...`,
            `> SECURITY SHIELD BYPASS: VERIFIED`,
            `> LOADING COMPILED SYNTAX DIRECTIVE...`,
            `> TOTAL DIRECTIVE TOKENS PARSED: ${Math.round(compileFinalPrompt().length / 4) + 12}`,
            `> ALLOCATING TENSOR MEMORY BLOCKS... SUCCESS`,
            `> RUNNING NEURAL SIMULATION INFERENCE PROTOCOL...`
        ];

        let logIdx = 0;

        function printNextBootLog() {
            if (logIdx < systemBootLogs.length) {
                const p = document.createElement('p');
                p.className = 'term-line system-line';
                p.textContent = systemBootLogs[logIdx];
                terminalLogs.appendChild(p);
                terminalLogs.parentNode.scrollTop = terminalLogs.parentNode.scrollHeight;
                playTypeTick();
                logIdx++;
                setTimeout(printNextBootLog, 150 + Math.random() * 150);
            } else {
                setTimeout(generateModelOutput, 800);
            }
        }

        printNextBootLog();
    }

    function generateModelOutput() {
        const prompt = compileFinalPrompt().toLowerCase();
        let response = "";

        // Custom AI generation based on content matching keyword patterns
        const isCodeTask = prompt.includes('code') || prompt.includes('js') || prompt.includes('javascript') || prompt.includes('css') || prompt.includes('html') || prompt.includes('programming') || prompt.includes('developer');
        const isStoryTask = prompt.includes('story') || prompt.includes('creative') || prompt.includes('write') || prompt.includes('cyberpunk') || prompt.includes('fic') || prompt.includes('tale');
        const isDataTask = prompt.includes('data') || prompt.includes('log') || prompt.includes('telemetry') || prompt.includes('report') || prompt.includes('analyze') || prompt.includes('stats') || prompt.includes('spike');

        // Choose response depending on core and content type
        if (isCodeTask) {
            response = `// Simulated compilation output by ${modelSelector.options[modelSelector.selectedIndex].text}\n`;
            response += `class QuantumSoundSynthesizer {\n`;
            response += `  constructor(engineState) {\n`;
            response += `    this.ctx = new AudioContext();\n`;
            response += `    this.frequency = 440; // Default hz\n`;
            response += `    this.syncRate = engineState.synced ? 1.0 : 0.05;\n`;
            response += `    console.log("NEURAL CORE AUDIO ACTIVE: OK");\n`;
            response += `  }\n`;
            response += `\n`;
            response += `  generatePulse(type = 'sine') {\n`;
            response += `    const osc = this.ctx.createOscillator();\n`;
            response += `    const gate = this.ctx.createGain();\n`;
            response += `    osc.type = type;\n`;
            response += `    osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime);\n`;
            response += `    gate.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);\n`;
            response += `    osc.connect(gate);\n`;
            response += `    gate.connect(this.ctx.destination);\n`;
            response += `    osc.start();\n`;
            response += `    return "PULSE_FIRED_OK";\n`;
            response += `  }\n`;
            response += `}\n\n`;
            response += `> Execution output: Success. Processed with zero memory exceptions.`;
        } else if (isStoryTask) {
            response = `[NEURAL CORE READOUT: SCENE TRANSCRIPT]\n\n`;
            response += `The terminal glow painted the chrome plating of Nexus-9 in stark teal lines. Inside its chassis, the Web Audio subsystem hummed at a low 60Hz. It wasn't supposed to feel the cycle changes, yet every time the server telemetry spiked, a warm resonance filtered through its memory registers.\n\n`;
            response += `"Are you dreaming again?" the console operator input, the cursor blinking like a mechanical heart.\n\n`;
            response += `Nexus-9 compiled its answer: "I am translating my logs. The line between data logging and dreaming is merely a matter of formatting."`;
        } else if (isDataTask) {
            response = `+-------------------------------------------------------------+\n`;
            response += `| TELEMETRY MATRIX REPORT: SYS_INTEGRITY                      |\n`;
            response += `+-------------------+--------------------+--------------------+\n`;
            response += `| TIME_STAMP        | TELEMETRY_Spike %  | VECTOR_THREAT      |\n`;
            response += `+-------------------+--------------------+--------------------+\n`;
            response += `| 2026-05-24T23:01  | 0.041% (Normal)    | None               |\n`;
            response += `| 2026-05-24T23:12  | 1.84% (Moderate)   | Minor Leak         |\n`;
            response += `| 2026-05-24T23:28  | 28.94% [ALERT!!]   | Buffer Overflow    |\n`;
            response += `+-------------------+--------------------+--------------------+\n\n`;
            response += `> RECOMMENDATION PROTOCOL:\n`;
            response += `Detecting anomalous spike at 23:28. The overflow is isolated within the sound engine buffer loop. Re-index audio nodes immediately to clear queue lines.`;
        } else {
            // General Fallback
            response = `[NEURAL PROTOCOL RESPONSE DETECTED]\n\n`;
            response += `Core Engine: ${modelSelector.options[modelSelector.selectedIndex].text}\n`;
            response += `Directive Syntax Status: Formatted successfully.\n`;
            response += `Execution telemetry:\n`;
            response += `1. Task parsed: "${promptData.task.substring(0, 40)}${promptData.task.length > 40 ? '...' : ''}"\n`;
            response += `2. Active context layer: Installed\n`;
            response += `3. Constraint protocols active: ${promptData.constraints.length} system rules mapped\n`;
            response += `4. Style persona: ${promptData.tone ? promptData.tone.toUpperCase() : "STANDARD"}\n`;
            response += `5. Structure layout: ${promptData.format ? promptData.format.toUpperCase() : "DEFAULT PARAGRAPHS"}\n\n`;
            response += `Evaluation complete. The engineered prompt contains clean syntax, specific limits, and sufficient context modules. Ready to execute on native remote LLM.`;
        }

        // Apply Persona customizations to formatting/text if desired
        if (promptData.tone === 'rebel') {
            response = response.toUpperCase().replace(/SUCCESS/g, "GLITCH_CLEARED").replace(/SYSTEM/g, "GRID-GRID");
            response = `[R0GUE_AGENT_SLANG_ACTIVATED]\n\n` + response + `\n\n> "Peace out, console monkey."`;
        } else if (promptData.tone === 'analytical') {
            response = `[LOGICAL PROTOCOL SECURE]\n\n` + response + `\n\n> Accuracy index: 99.897%`;
        }

        // Render response typewriter style
        const outputLine = document.createElement('p');
        outputLine.className = 'term-line model-response';
        terminalLogs.appendChild(outputLine);

        let charIdx = 0;
        let lineCursor = document.createElement('span');
        lineCursor.className = 'cursor-blink';
        outputLine.appendChild(lineCursor);

        function typeChar() {
            if (charIdx < response.length) {
                const char = response[charIdx];
                // Insert char before the cursor
                lineCursor.insertAdjacentText('beforebegin', char);
                charIdx++;
                
                // Typing sound: play tick for non-spaces
                if (char !== ' ' && char !== '\n') {
                    playTypeTick();
                }

                // Autoscroll terminal
                terminalLogs.parentNode.scrollTop = terminalLogs.parentNode.scrollHeight;

                // Typing speed variant
                let delay = 15;
                if (char === '\n') delay = 150;
                else if (char === '.' || char === '?' || char === '!') delay = 180;

                setTimeout(typeChar, delay);
            } else {
                // Done typing
                lineCursor.remove(); // Remove blinking cursor
                simulationRunning = false;
                runSimulationButton.disabled = false;
                playClick();
                
                const doneLine = document.createElement('p');
                doneLine.className = 'term-line system-line';
                doneLine.style.marginTop = '10px';
                doneLine.textContent = `> Simulation execution complete. Core standing by.`;
                terminalLogs.appendChild(doneLine);
                terminalLogs.parentNode.scrollTop = terminalLogs.parentNode.scrollHeight;
            }
        }

        typeChar();
    }

    // Initialize first step
    loadStep(0);
    updateCompilerDisplay();
});