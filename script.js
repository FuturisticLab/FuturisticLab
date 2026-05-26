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
    const articles = {
        'AI-Powered E-commerce Site on AWS': {
            title: 'AI-Powered E-commerce Site on AWS',
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
        'On-Premises Migration to AWS': {
            title: 'On-Premises Migration to AWS',
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
        'Data Visualization': {
            title: 'Data Visualization',
            body: `
                <h3>The Transformative Power of AI in My Toolkit</h3><br>
                <p>In this project, I enlisted an AI assistant called Gemini powered by Google which turned out to be like having a dedicated team of data analysts, developers, and project managers at my fingertips. My role was to be the architect, providing the clear, creative prompts that transformed publicly available raw data into a compelling narrative.</p><br>
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
        'Training': {
            title: 'Training',
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
        }
    };

    const modal = document.getElementById('project-modal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    let currentImageIndex = 0;

    function loadArticle(projectTitle) {
        const article = articles[projectTitle];
        if (!article || !modalContent) return;

        modalContent.innerHTML = `
            <span class="close-modal" role="button" aria-label="Close modal">&times;</span>
            <div class="modal-article">
                <h2 class="article-title">${article.title}</h2>
                <div class="article-body">${article.body}</div>
                <div class="image-gallery" aria-label="Image gallery">
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
        const galleryImage = modalContent.querySelector('.gallery-image');
        const caption = modalContent.querySelector('.caption');
        const prevBtn = modalContent.querySelector('.nav.prev');
        const nextBtn = modalContent.querySelector('.nav.next');
        const closeBtn = modalContent.querySelector('.close-modal');
        const liveBtn = modalContent.querySelector('.live-btn');
        const githubBtn = modalContent.querySelector('.github-btn');

        function updateImage() {
            if (article.images && article.images.length > 0) {
                galleryImage.src = article.images[currentImageIndex].src;
                galleryImage.alt = `${article.title} - Image ${currentImageIndex + 1}`;
                caption.textContent = article.images[currentImageIndex].caption;
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

        closeBtn.addEventListener('click', closeModal);
        
        liveBtn.addEventListener('click', () => {
            playClickSound();
            window.open(article.liveLink || '#', '_blank');
        });

        githubBtn.addEventListener('click', () => {
            playClickSound();
            window.open(article.githubLink || '#', '_blank');
        });

        modalContent.focus();
    }

    function openModal(projectTitle) {
        if (articles[projectTitle] && modal) {
            loadArticle(projectTitle);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            playClickSound();
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Modal click events & close handlers
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const projectWorlds = document.querySelectorAll('.project-world');
    projectWorlds.forEach(world => {
        world.addEventListener('mouseenter', () => {
            playHoverSound();
        });
        world.addEventListener('click', (e) => {
            const projectKey = world.getAttribute('data-project');
            if (projectKey) {
                e.preventDefault(); // Prevent standard navigation
                playClickSound();
                openModal(projectKey); // Open modal instead
            } else {
                playClickSound();
            }
        });
    });

    // -------------------------------------------------------------
    // DYNAMIC EVENT FEED TIME TICKER
    // -------------------------------------------------------------
    // Periodically update feed timestamps so it feels "living"
    const feedTimes = document.querySelectorAll('.stream-time');
    
    function updateTimestamps() {
        feedTimes.forEach((el, index) => {
            // Get base offset from data or index
            let baseSeconds = parseInt(el.getAttribute('data-seconds') || (15 + index * 60));
            // Add a small randomized increment
            baseSeconds += Math.round(Math.random() * 2);
            el.setAttribute('data-seconds', baseSeconds);

            // Format text
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

    // Run ticker updates
    setInterval(updateTimestamps, 3000);
});
