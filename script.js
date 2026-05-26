document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // DYNAMIC STARFIELD GENERATION
    // -------------------------------------------------------------
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        for (let i = 0; i < 160; i++) {
            const star = document.createElement('div');
            star.className = 'absolute rounded-full bg-white animate-pulse pointer-events-none';
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.opacity = Math.random();
            star.style.animationDuration = `${Math.random() * 5 + 2}s`;
            starsContainer.appendChild(star);
        }
    }

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

    // Sound 1: High tech hover sweep
    function playHoverSound() {
        if (!soundEnabled) return;
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    // Sound 2: Tech click activation
    function playClickSound() {
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
        
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.12);
        
        filter.frequency.setValueAtTime(200, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.12);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
    }

    // Sound Toggle Button
    const soundToggle = document.getElementById('sound-toggle');
    const audioIcon = document.getElementById('audio-icon');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundToggle.innerHTML = '🔊 AUDIO: ON';
                soundToggle.classList.remove('opacity-50');
                playClickSound();
            } else {
                soundToggle.innerHTML = '🔇 AUDIO: OFF';
                soundToggle.classList.add('opacity-50');
            }
        });
    }

    // -------------------------------------------------------------
    // INTERACTIVE PROJECT WORLDS EVENT LISTENERS & MODALS
    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // 3D NEURAL NETWORK / INTERACTIVE COSMOS
    // -------------------------------------------------------------
    const projects = [
        { title: 'AI', color: '#00d4ff' },
        { title: 'Nexus', color: '#0099ff' },
        { title: 'Project Lumina', color: '#00ccff' },
        { title: 'Typovelocity', color: '#0066ff' },
        { title: 'Memory Grid', color: '#00b3ff' },
        { title: 'NEXUS OS', color: '#0080ff' },
        { title: 'VR Experience', color: '#004dff' },
        { title: 'IoT Dashboard', color: '#00b3ff' },
        { title: 'Neural Compiler', color: '#0080ff' },
        { title: 'Coming Soon 1', color: '#004dff' },
        { title: 'Coming Soon 2', color: '#004dff' },
        { title: 'Coming Soon 3', color: '#004dff' },
        { title: 'Coming Soon 4', color: '#004dff' },
        { title: 'Coming Soon 5', color: '#004dff' },
        { title: 'Coming Soon 6', color: '#004dff' },
        { title: 'Coming Soon 7', color: '#004dff' },
        { title: 'Coming Soon 8', color: '#004dff' },
        { title: 'Coming Soon 9', color: '#004dff' },
        { title: 'Coming Soon 10', color: '#004dff' },
        { title: 'Coming Soon 11', color: '#004dff' },
        { title: 'Coming Soon 12', color: '#004dff' },
        { title: 'Coming Soon 13', color: '#004dff' },
        { title: 'Coming Soon 14', color: '#004dff' },
        { title: 'Coming Soon 15', color: '#004dff' }
    ];

    const articles = {
        'NEXUS OS': {
            title: 'NEXUS OS',
            body: `
                <h3>AI Operating System Interface</h3><br>
                <p>NEXUS OS is a futuristic, sci-fi themed interface demonstrating fluid menu navigation, interactive transitions, glassmorphic HUD styling, and responsive user feedback loops.</p><br>
                <p>Key Highlights:</p>
                <p>• Dynamic Layouts: Highly responsive HUD grids that reorganize based on active system states.</p>
                <p>• Fluid Animations: Tailored transitions simulating high-speed data stream configurations.</p>
                <p>• Clean Styling System: Unified CSS styling defining cybernetic visual components.</p>
            `,
            images: [],
            liveLink: './Navigation-Flow-Menu/index.html',
            githubLink: 'https://github.com/FuturisticLab/FuturisticLab',
        },
        'AI': {
            title: 'AI Prompt Intelligence',
            body: `
                <p>Deploying an AI-Powered E-commerce Site on AWS</p><br>
                <p>Containerized Application Deployment: Hands-on experience deploying containerized applications using AWS LightSail.</p><br>
                <p>Secure & Flexible Configurations: The practical use of environment variables for managing and securing application configurations.</p><br>
                <p>AI Integration: The real-world application of generative AI for practical solutions like customer support.</p><br>
                <p>deployed CloudMart on AWS LightSail, leveraging the scalability and efficiency of a container service. From setting up the container service to configuring environment variables, every step was a hands-on learning experience that reinforced my understanding of cloud-native deployment</p>    
            `,
            images: [
                { src: 'Modal/assets/images/cloudmart shop.png', caption: 'AI Chat Bot' },
                { src: 'Modal/assets/images/Cloudmart About.png', caption: 'About Cloud Mart' },
                { src: 'Modal/assets/images/Cloudmart Home.png', caption: 'Cloud Mart' }
            ],
            liveLink: './AI-Prompt-Simulator/index.html',
            githubLink: 'https://github.com/FuturisticLab/ai-prompt-simulator',
        },
        'Nexus': {
            title: 'Nexus HVAC Simulation',
            body: `
                <h3>Using AWS IAM to Enable Multi-Factor Authentication</h3><br>
                <p>In this project based on a real-world scenario, I had the opportunity to use the latest cutting edge features of AWS IAM (Identity and Access Management) resources. The data related to the profiles was securely extracted, transformed and loaded into a file prepared for a script. In an automated way, groups were added, users were then added to groups, using Gitbash, AWS Cli, and shell script. In the AWS Console, MFA (Multi-factor authentication) was enabled and a group policy applied to their accounts as this strategy to have defense-in-depth is a security best practice.</p>
            `,
            images: [
                { src: 'Modal/assets/images/PORTFOLIO PROJECTS_AWS - MODULE 2_ARCHITECTURE.png', caption: 'Solution Architecture' },
                { src: 'Modal/assets/images/PORTFOLIO PROJECTS_AWS - MODULE 2_THUMBNAIL.png', caption: 'Cloud Project' }
            ],
            liveLink: './Air-Conditioner-Cycle/index.html',
            githubLink: 'https://github.com/FuturisticLab/FuturisticLab',
        },
        'Project Lumina': {
            title: 'Project Lumina Immersive Web',
            body: `
                <h3>The Transformative Power of AI in My Toolkit</h3><br>
                <p>In this project, I enlisted an AI assistant called Gemini powered by Google which turned out to be like having a dedicated team of data analysts, developers, and project managers at my fingertips. My role was to be the architect, providing the clear, creative prompts that transformed publicly available raw data into a narrative.</p><br>
                <p>Together, we created a single-page infographic. A rapidly generated data visualization generated with HTML, Tailwind CSS, and Chart.js code to make it a responsive, interactive visualization. Publicly available data was used to break down complex information making it incredibly easy to understand.</p>
            `,
            images: [
                { src: 'Modal/assets/images/1_2IjJnAR59J_qzcGeMJavbA.png', caption: 'Data Storytelling' },
                { src: 'Modal/assets/images/1_AxAVQYXq4-qdrbjMKX7TAg.png', caption: 'Simplicity & Clarity' },
                { src: 'Modal/assets/images/1_HmotBQX91AGr0zACf-alaw.png', caption: 'Visual Consistency' },
                { src: 'Modal/assets/images/1_vkXDqOfiH0WEH6RItOxb1w.png', caption: 'User Engagement' }
            ],
            liveLink: './Project-Lumina/index.html',
            githubLink: 'https://github.com/FuturisticLab/FuturisticLab',
        },
        'Memory Grid': {
            title: 'Memory Grid Workspace',
            body: `
                <h3>Cognitive Innovation Lab Sandbox</h3><br>
                <p>Memory Grid is an interactive workspace design allowing drag-and-drop orchestration of custom nodes, text elements, geometric shapes, and image assets.</p><br>
                <p>Key Highlights:</p>
                <p>• Drag & Drop Interface: Effortless spatial arrangement of visual workspace elements on a dynamic canvas.</p>
                <p>• Interactive Connecting Lines: Visual lines and directional arrows linking related nodes to establish relational maps.</p>
                <p>• State Persistence: Local storage synchronization preserving the workspace state across browser sessions.</p>
            `,
            images: [
                { src: 'Modal/assets/images/exchange.png', caption: 'Interactive Workspace Mapping' }
            ],
            liveLink: './Drag-Drop-Editors/index.html',
            githubLink: 'https://github.com/FuturisticLab/FuturisticLab',
        },
        'Typovelocity': {
            title: 'Typovelocity Speed Trainer',
            body: `
                <h2>Network Technology Academy</h2><br>
                <h3>CompTIA Security + Training/Certification, Certificate ID (476437364) | September 2023 - April 2024</h3><br>
                <p>Completed comprehensive training aligned with regulatory compliance requirements, covering data privacy, retention, disposal, licensing, policy, and chain of custody.</p><br>
                <p>Fulfilled 300+ hours of both lecture & technical labs covering core concepts CompTIA Security+ certification domains: Threats, Attacks, and Vulnerabilities; Architecture and Design; Implementation; Operations and Incident Response; Governance, Risk, and Compliance.</p><br>
                <p>Developed practical knowledge in incident response, risk mitigation, and security governance to support organizational security objectives.</p>
            `,
            images: [
                { src: 'Modal/assets/images/NTAI.png', caption: 'Network Technology Academy' },
                { src: 'Modal/assets/images/ComptiaSecurity.png', caption: 'Security +' }
            ],
            liveLink: './Typovelocity/index.html',
            githubLink: 'https://github.com/FuturisticLab/FuturisticLab',
        },
        'VR Experience': {
            title: 'VR Experience Demo',
            body: `
                <h3>Immersive Spatial Interface</h3><br>
                <p>A WebXR virtual reality experiment designed to test spatial navigation models. Users interact with neural data components in a fully immersive 3D grid with visual telemetry feedback.</p><br>
                <p>Key Highlights:</p>
                <p>• WebXR Integration: Fully browser-compatible immersive spatial graphics.</p>
                <p>• Interactive Physics: Dynamic collision fields and spatialized audio simulation.</p>
            `,
            images: [],
            liveLink: '#',
            githubLink: '#',
        },
        'IoT Dashboard': {
            title: 'IoT Telemetry Dashboard',
            body: `
                <h3>Quantum IoT Device Monitoring</h3><br>
                <p>Real-time distributed hardware tracker utilizing WebSocket data streams. It displays state-of-health diagnostics for edge computing devices and automates threshold alerts.</p><br>
                <p>Key Highlights:</p>
                <p>• Real-Time Streams: Continuous telemetry monitoring with sub-millisecond updates.</p>
                <p>• Advanced Charting: Visual latency, throughput, and error metrics plotted in real-time.</p>
            `,
            images: [],
            liveLink: '#',
            githubLink: '#',
        },
        'Neural Compiler': {
            title: 'Neural Compiler Core',
            body: `
                <h3>AI-Driven Code Optimization Engine</h3><br>
                <p>An experimental compiler pipeline utilizing machine learning models to detect performance bottlenecks in JavaScript runtimes and generate optimized instructions.</p><br>
                <p>Key Highlights:</p>
                <p>• Graph Representation: Translates ASTs into neural network structures for pattern analysis.</p>
                <p>• Semantic Profiling: Predicts CPU cycles and memory usage before code execution.</p>
            `,
            images: [],
            liveLink: '#',
            githubLink: '#',
        },
        'Coming Soon': {
            title: 'Quantum Project Core',
            body: `
                <h3>Future Repository Node</h3><br>
                <p>A placeholder for our next repository sync. The neural network will auto-populate this node with live commits and build status as soon as the project is initialized.</p>
            `,
            images: [],
            liveLink: '#',
            githubLink: '#',
        }
    };

    const network = document.getElementById('neural-network');
    const modal = document.getElementById('project-modal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    const universeSection = document.getElementById('universe-section');
    const customCursor = document.getElementById('custom-cursor');
    const infoPanel = document.getElementById('info-panel');

    let nodes = [];
    let connections = [];
    let isRotating = true; // Auto-rotate active by default
    let mouseX = 0;
    let mouseY = 0;
    let currentImageIndex = 0;
    let mouseActive = false;

    // Initialize 3D Network
    function initializeNetwork() {
        if (!network || !universeSection) return;

        // Reset the rotation transform so client rect calculations are correct
        const originalTransform = network.style.transform;
        network.style.transform = '';
        
        network.innerHTML = '';
        nodes = [];
        connections = [];

        projects.forEach((project, index) => {
            createProjectNode(project, index);
        });
        createConnections();
        createParticles();
        createSpaceEffects();
        updateStats();

        network.style.transform = originalTransform;
    }

    function createProjectNode(project, index) {
        const node = document.createElement('div');
        node.className = 'project-node';
        node.innerHTML = `<div class="project-title">${project.title}</div>`;

        // Fibonacci sphere distribution for positioning in 3D
        const phi = Math.acos(1 - (2 * (index + 1)) / projects.length);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 1);

        const radius = Math.min(280, universeSection.offsetWidth * 0.32); // responsive radius
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta) * 0.8; // slightly squashed vertically
        const z = radius * Math.cos(phi);
        
        node.style.left = `calc(50% + ${x}px)`;
        node.style.top = `calc(50% + ${y}px)`;
        node.style.transform = `translateZ(${z}px)`;

        // Click opens modal
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            playClickSound();
            openModal(project.title);
        });
        
        node.addEventListener('mouseenter', () => {
            playHoverSound();
        });

        network.appendChild(node);
        nodes.push({ element: node, project, x, y, z });
    }

    function createConnections() {
        if (!network || nodes.length === 0) return;
        const containerRect = network.getBoundingClientRect();
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(nodes[i].x - nodes[j].x, 2) +
                    Math.pow(nodes[i].y - nodes[j].y, 2) +
                    Math.pow(nodes[i].z - nodes[j].z, 2)
                );
                
                // Keep connection lines looking clean and constellation-like (density-optimized)
                const maxDist = nodes.length > 15 ? 320 : 450;
                const probability = nodes.length > 15 ? 0.12 : 0.45;
                
                if (distance < maxDist && Math.random() < probability) {
                    createConnection(nodes[i], nodes[j], containerRect);
                }
            }
        }
    }

    function createConnection(nodeA, nodeB, containerRect) {
        const line = document.createElement('div');
        line.className = 'connection-line';

        const rect1 = nodeA.element.getBoundingClientRect();
        const rect2 = nodeB.element.getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - containerRect.left;
        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
        const x2 = rect2.left + rect2.width / 2 - containerRect.left;
        const y2 = rect2.top + rect2.height / 2 - containerRect.top;

        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

        line.style.width = `${distance}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 50%';

        network.appendChild(line);
        connections.push(line);
    }

    function createParticles() {
        if (!universeSection) return;
        
        // Remove existing particles to prevent accumulation
        const existingParticles = universeSection.querySelectorAll('.particle, .quantum-particle');
        existingParticles.forEach(p => p.remove());
        
        const width = universeSection.offsetWidth;
        const height = universeSection.offsetHeight;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                if (!universeSection) return;
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * width + 'px';
                particle.style.top = height + 10 + 'px';
                
                particle.style.setProperty('--float-distance', `-${height + 80}px`);
                particle.style.setProperty('--float-x', `${(Math.random() - 0.5) * 300}px`);
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = Math.random() * 6 + 8 + 's';

                universeSection.appendChild(particle);
            }, i * 400);
        }
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                if (!universeSection) return;
                const qParticle = document.createElement('div');
                qParticle.className = 'quantum-particle';
                qParticle.style.left = Math.random() * width + 'px';
                qParticle.style.top = Math.random() * height + 'px';
                
                qParticle.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 400}px`);
                qParticle.style.setProperty('--drift-y', `${(Math.random() - 0.5) * 400}px`);
                qParticle.style.animationDelay = Math.random() * 12 + 's';
                qParticle.style.animationDuration = Math.random() * 8 + 12 + 's';

                universeSection.appendChild(qParticle);
            }, i * 500);
        }
    }

    function spawnSingleParticle() {
        if (!universeSection) return;
        const width = universeSection.offsetWidth;
        const height = universeSection.offsetHeight;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * width + 'px';
        particle.style.top = height + 10 + 'px';
        
        particle.style.setProperty('--float-distance', `-${height + 80}px`);
        particle.style.setProperty('--float-x', `${(Math.random() - 0.5) * 300}px`);
        particle.style.animationDuration = Math.random() * 6 + 8 + 's';

        universeSection.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 14000);
    }

    function createSpaceEffects() {
        if (!universeSection) return;
        
        // Remove existing effects
        const existingEffects = universeSection.querySelectorAll('.nebula-effect, .wormhole');
        existingEffects.forEach(e => e.remove());
        
        const width = universeSection.offsetWidth;
        const height = universeSection.offsetHeight;

        for (let i = 0; i < 3; i++) {
            const nebula = document.createElement('div');
            nebula.className = 'nebula-effect';
            nebula.style.left = Math.random() * width + 'px';
            nebula.style.top = Math.random() * height + 'px';
            nebula.style.animationDelay = Math.random() * 20 + 's';
            universeSection.appendChild(nebula);
        }
        for (let i = 0; i < 2; i++) {
            const wormhole = document.createElement('div');
            wormhole.className = 'wormhole';
            wormhole.style.left = Math.random() * width + 'px';
            wormhole.style.top = Math.random() * height + 'px';
            wormhole.style.animationDelay = Math.random() * 8 + 's';
            universeSection.appendChild(wormhole);
        }
    }

    function updateStats() {
        const nodeCountEl = document.getElementById('node-count');
        const connectionCountEl = document.getElementById('connection-count');
        if (nodeCountEl) nodeCountEl.textContent = nodes.length;
        if (connectionCountEl) connectionCountEl.textContent = connections.length;
    }

    // Modal Content Loading & Control
    function loadArticle(projectTitle) {
        const article = articles[projectTitle];
        if (!article || !modalContent) return;

        modalContent.innerHTML = `
            <span class="close-modal" role="button" aria-label="Close modal">&times;</span>
            <div class="modal-article" tabindex="-1">
                <h2 class="article-title">${article.title}</h2>
                <div class="article-body">${article.body}</div>
                <div class="image-gallery" aria-label="Image gallery" style="display: none;">
                    <button class="nav prev" aria-label="Previous image">&#10094;</button>
                    <div class="image-wrapper">
                        <img src="" alt="" class="gallery-image" />
                        <div class="caption"></div>
                    </div>
                    <button class="nav next" aria-label="Next image">&#10095;</button>
                </div>
                <div class="modal-buttons" style="margin-top: 30px; display: flex; gap: 15px; justify-content: center;">
                    <button class="control-btn live-btn">View Live</button>
                    <button class="control-btn github-btn">GitHub</button>
                </div>
            </div>
        `;

        currentImageIndex = 0;
        const galleryContainer = modalContent.querySelector('.image-gallery');
        const galleryImage = modalContent.querySelector('.gallery-image');
        const caption = modalContent.querySelector('.caption');
        const prevBtn = modalContent.querySelector('.nav.prev');
        const nextBtn = modalContent.querySelector('.nav.next');
        const closeBtn = modalContent.querySelector('.close-modal');
        const liveBtn = modalContent.querySelector('.live-btn');
        const githubBtn = modalContent.querySelector('.github-btn');
        const articleContainer = modalContent.querySelector('.modal-article');

        function updateImage() {
            if (article.images && article.images.length > 0) {
                galleryContainer.style.display = 'flex';
                galleryImage.src = article.images[currentImageIndex].src;
                galleryImage.alt = `${article.title} - Image ${currentImageIndex + 1}`;
                caption.textContent = article.images[currentImageIndex].caption || '';
                
                if (article.images.length > 1) {
                    prevBtn.style.display = 'block';
                    nextBtn.style.display = 'block';
                } else {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                }
            } else {
                galleryContainer.style.display = 'none';
            }
        }

        updateImage();

        prevBtn.addEventListener('click', () => {
            playClickSound();
            currentImageIndex = currentImageIndex === 0 ? article.images.length - 1 : currentImageIndex - 1;
            updateImage();
        });

        nextBtn.addEventListener('click', () => {
            playClickSound();
            currentImageIndex = (currentImageIndex + 1) % article.images.length;
            updateImage();
        });

        closeBtn.addEventListener('click', window.closeModal);
        
        liveBtn.addEventListener('click', () => {
            playClickSound();
            window.open(article.liveLink || '#', '_blank');
        });

        githubBtn.addEventListener('click', () => {
            playClickSound();
            window.open(article.githubLink || '#', '_blank');
        });

        // Set focus to the container to handle keydowns
        articleContainer.focus();
        articleContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                if (article.images && article.images.length > 1) prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                if (article.images && article.images.length > 1) nextBtn.click();
            } else if (e.key === 'Escape') {
                window.closeModal();
            }
        });
    }

    function openModal(projectTitle) {
        let titleKey = projectTitle;
        // Fallback for "Coming Soon X" to reuse the "Coming Soon" article content
        if (projectTitle.startsWith('Coming Soon') && !articles[projectTitle]) {
            titleKey = 'Coming Soon';
        }

        if (articles[titleKey] && modal) {
            loadArticle(titleKey);
            
            // Override the header title inside the modal to match the clicked node's title
            const modalTitleEl = modalContent.querySelector('.article-title');
            if (modalTitleEl) {
                modalTitleEl.textContent = projectTitle;
            }
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Attach control handlers to window for inline onclick attributes in HTML
    window.toggleRotation = function() {
        playClickSound();
        isRotating = !isRotating;
    };
    
    window.toggleInfo = function() {
        playClickSound();
        if (infoPanel) {
            infoPanel.classList.toggle('active');
        }
    };
    
    window.randomizeNetwork = function() {
        playClickSound();
        if (!universeSection || !network) return;
        
        connections.forEach(line => line.remove());
        connections = [];
        
        const width = universeSection.offsetWidth;
        const height = universeSection.offsetHeight;
        
        const originalTransform = network.style.transform;
        network.style.transform = '';

        nodes.forEach((node) => {
            const randomX = (Math.random() - 0.5) * Math.min(500, width * 0.65);
            const randomY = (Math.random() - 0.5) * Math.min(500, height * 0.65) * 0.8;
            const randomZ = (Math.random() - 0.5) * 350;

            node.x = randomX;
            node.y = randomY;
            node.z = randomZ;

            node.element.style.left = `calc(50% + ${randomX}px)`;
            node.element.style.top = `calc(50% + ${randomY}px)`;
            node.element.style.transform = `translateZ(${randomZ}px)`;
        });
        
        createConnections();
        network.style.transform = originalTransform;
        updateStats();
    };
    
    window.resetView = function() {
        playClickSound();
        if (network) {
            network.style.transform = '';
            initializeNetwork();
        }
    };
    
    window.closeModal = function() {
        if (modal) {
            playClickSound();
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeModal();
            }
        });
    }

    // Keyboard Shortcuts listener
    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                window.closeModal();
            }
            return;
        }
        
        if (mouseActive) {
            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    window.toggleRotation();
                    break;
                case 'i':
                    window.toggleInfo();
                    break;
                case 'r':
                    window.randomizeNetwork();
                    break;
            }
        }
    });

    // Custom Cursor styling init
    if (customCursor) {
        customCursor.style.opacity = '0';
        customCursor.style.transition = 'opacity 0.3s ease, transform 0.1s ease';
    }

    // Mouse events bound specifically to universeSection
    if (universeSection && network) {
        universeSection.style.cursor = 'none';
        
        universeSection.addEventListener('mouseenter', () => {
            if (customCursor) customCursor.style.opacity = '1';
            mouseActive = true;
        });

        universeSection.addEventListener('mouseleave', () => {
            if (customCursor) customCursor.style.opacity = '0';
            mouseActive = false;
            if (!isRotating) {
                network.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
        });

        universeSection.addEventListener('mousemove', (e) => {
            const rect = universeSection.getBoundingClientRect();
            
            if (customCursor) {
                customCursor.style.left = e.clientX - 12 + 'px';
                customCursor.style.top = e.clientY - 12 + 'px';
            }

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            mouseX = (x / rect.width) * 2 - 1;
            mouseY = (y / rect.height) * 2 - 1;

            if (!isRotating) {
                network.style.transform = `rotateY(${mouseX * 20}deg) rotateX(${-mouseY * 12}deg)`;
            }
        });
    }

    // Window Resize redraw listener
    window.addEventListener('resize', () => {
        if (network && nodes.length > 0) {
            connections.forEach(line => line.remove());
            connections = [];
            const originalTransform = network.style.transform;
            network.style.transform = '';
            createConnections();
            network.style.transform = originalTransform;
            updateStats();
        }
    });

    // Render loop
    let rotationAngle = 0;
    function animate() {
        if (isRotating && network) {
            rotationAngle += 0.25; // Smooth slow rotation
            network.style.transform = `rotateY(${rotationAngle}deg) rotateX(${Math.sin(Date.now() * 0.001) * 3}deg)`;
        }

        if (Math.random() < 0.03 && universeSection) {
            const currentParticles = universeSection.querySelectorAll('.particle').length;
            if (currentParticles < 25) {
                spawnSingleParticle();
            }
        }

        if (customCursor && mouseActive) {
            customCursor.style.boxShadow = `
                0 0 ${10 + Math.sin(Date.now() * 0.01) * 5}px rgba(0, 212, 255, 0.5),
                inset 0 0 5px rgba(0, 212, 255, 0.2)
            `;
        }

        requestAnimationFrame(animate);
    }

    // Initialize network nodes, connections and start animation
    initializeNetwork();
    animate();

    // Auto-slide-in Info Panel after 1s, hide after 5s
    setTimeout(() => {
        if (infoPanel) {
            infoPanel.classList.add('active');
            setTimeout(() => {
                infoPanel.classList.remove('active');
            }, 6000);
        }
    }, 1000);

    // -------------------------------------------------------------
    // DYNAMIC EVENT FEED TIME TICKER
    // -------------------------------------------------------------
    const feedTimes = document.querySelectorAll('.stream-time');
    
    function updateTimestamps() {
        feedTimes.forEach((el, index) => {
            let baseSeconds = parseInt(el.getAttribute('data-seconds') || (15 + index * 60));
            baseSeconds += Math.round(Math.random() * 2);
            el.setAttribute('data-seconds', baseSeconds);

            if (baseSeconds < 60) {
                el.textContent = `${baseSeconds} seconds ago`;
            } else if (baseSeconds < 3600) {
                const minutes = Math.floor(baseSeconds / 60);
                el.textContent = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
            } else {
                const hours = Math.floor(baseSeconds / 3600);
                el.textContent = `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
            }
        });
    }

    setInterval(updateTimestamps, 3000);
});
