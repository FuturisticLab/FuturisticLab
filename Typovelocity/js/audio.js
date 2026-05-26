// Audio context for sound effects
        let audioContext;
        
        function initAudio() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        function toggleSound() {
            if (window.gameState) {
                window.gameState.soundEnabled = !window.gameState.soundEnabled;
                localStorage.setItem('soundEnabled', window.gameState.soundEnabled);
                return window.gameState.soundEnabled;
            }
            return false;
        }

        function playSound(type) {
            if (!gameState.soundEnabled || !audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            let duration = 0.3;
            if (type === 'correct') {
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                duration = 0.1;
            } else if (type === 'incorrect') {
                oscillator.frequency.value = 200;
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                duration = 0.15;
            } else if (type === 'streak') {
                oscillator.frequency.value = 1200;
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                duration = 0.2;
            } else if (type === 'achievement') {
                oscillator.frequency.value = 1500;
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                duration = 0.3;
            }
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);

            // Disconnect nodes after audio is done playing to prevent memory leaks
            setTimeout(() => {
                try {
                    oscillator.disconnect();
                    gainNode.disconnect();
                } catch (e) {
                    console.error('Failed to disconnect audio nodes:', e);
                }
            }, (duration + 0.1) * 1000);
        }

        // Export to global scope
        window.toggleSound = toggleSound;
        window.playSound = playSound;
