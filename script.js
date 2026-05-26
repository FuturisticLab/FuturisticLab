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
    // INTERACTIVE PROJECT WORLDS EVENT LISTENERS
    // -------------------------------------------------------------
    const projectWorlds = document.querySelectorAll('.project-world');
    projectWorlds.forEach(world => {
        world.addEventListener('mouseenter', () => {
            playHoverSound();
        });
        world.addEventListener('click', (e) => {
            // Play sound, then let the navigation happen
            playClickSound();
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
