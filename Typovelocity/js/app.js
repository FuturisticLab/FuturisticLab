/**
 * TypoVelocity - Main Application Logic
 * A futuristic typing speed trainer
 */

// Word banks for different difficulty levels
const wordBanks = {
    easy: [
        'cat', 'dog', 'sun', 'run', 'jump', 'play', 'book', 'car', 'tree', 'fish',
        'star', 'moon', 'rain', 'bird', 'home', 'hand', 'food', 'time', 'year', 'day'
    ],
    medium: [
        'quantum', 'velocity', 'cipher', 'matrix', 'nexus', 'vector', 'syntax', 'protocol',
        'algorithm', 'database', 'network', 'system', 'interface', 'terminal', 'compile',
        'function', 'variable', 'execute', 'process', 'memory', 'binary', 'digital'
    ],
    hard: [
        'cybernetic', 'hologram', 'starship', 'android', 'plasma', 'reactor', 'shields',
        'hyperspace', 'teleport', 'scanner', 'beacon', 'satellite', 'orbit', 'propulsion',
        'synthetic', 'neural', 'cortex', 'nanobots', 'drone', 'laser', 'particle'
    ],
    extreme: [
        'electromagnetic', 'extraterrestrial', 'interdimensional', 'photosynthesis',
        'cryptocurrency', 'nanotechnology', 'telecommunications', 'archaeological',
        'pharmaceutical', 'revolutionary', 'technological', 'extraordinary'
    ]
};

// Finger mapping for keyboard layout
const fingerMap = {
    'q': 'Left Pinky', 'w': 'Left Ring', 'e': 'Left Middle', 'r': 'Left Index', 't': 'Left Index',
    'y': 'Right Index', 'u': 'Right Index', 'i': 'Right Middle', 'o': 'Right Ring', 'p': 'Right Pinky',
    'a': 'Left Pinky', 's': 'Left Ring', 'd': 'Left Middle', 'f': 'Left Index', 'g': 'Left Index',
    'h': 'Right Index', 'j': 'Right Index', 'k': 'Right Middle', 'l': 'Right Ring',
    'z': 'Left Pinky', 'x': 'Left Ring', 'c': 'Left Middle', 'v': 'Left Index', 'b': 'Left Index',
    'n': 'Right Index', 'm': 'Right Index', ' ': 'Thumbs'
};

// Global game state
window.gameState = {
    isPlaying: false,
    selectedTime: 30,
    timeRemaining: 30,
    difficulty: 'medium',
    currentWords: [],
    currentWordIndex: 0,
    typedWords: 0,
    correctWords: 0,
    incorrectWords: 0,
    startTime: null,
    timerInterval: null,
    fingerCounts: {},
    history: [],
    streak: 0,
    bestStreak: 0,
    currentWpm: 0,
    soundEnabled: true,
    achievements: [],
    theme: 'blue',
    totalKeystrokes: 0
};

/**
 * Initialize the application
 */
function initApp() {
    // Initialize finger counts
    Object.values(fingerMap).forEach(finger => {
        if (!gameState.fingerCounts[finger]) {
            gameState.fingerCounts[finger] = 0;
        }
    });

    // Load saved data from localStorage
    loadSavedData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial render
    renderFingerStats();
    renderAchievements();
    updateScoreboard();
    updateBestWpm();
    
    console.log('TypoVelocity initialized! 🚀');
}

/**
 * Helper to escape HTML to prevent XSS
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

/**
 * Load saved data from localStorage
 */
function loadSavedData() {
    // Load history
    const savedHistory = localStorage.getItem('typingHistory');
    if (savedHistory) {
        try {
            const parsed = JSON.parse(savedHistory);
            if (Array.isArray(parsed)) {
                gameState.history = parsed;
            } else {
                gameState.history = [];
            }
            document.getElementById('totalTests').textContent = gameState.history.length;
        } catch (e) {
            console.error('Failed to load history:', e);
            gameState.history = [];
        }
    }

    // Load achievements
    gameState.achievements = loadAchievements();

    // Load total keystrokes
    const savedKeystrokes = localStorage.getItem('totalKeystrokes');
    if (savedKeystrokes) {
        gameState.totalKeystrokes = parseInt(savedKeystrokes) || 0;
    }

    // Load sound preference
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
        gameState.soundEnabled = savedSound === 'true';
        document.getElementById('soundToggle').textContent = gameState.soundEnabled ? '🔊' : '🔇';
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        gameState.theme = savedTheme;
        document.body.className = savedTheme !== 'blue' ? `theme-${savedTheme}` : '';
        
        // Update active theme selector button
        document.querySelectorAll('.theme-btn').forEach(btn => {
            if (btn.dataset.theme === savedTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Sound toggle
    document.getElementById('soundToggle').addEventListener('click', function() {
        const enabled = toggleSound();
        this.textContent = enabled ? '🔊' : '🔇';
    });

    // Theme selector
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.dataset.theme;
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.body.className = theme !== 'blue' ? `theme-${theme}` : '';
            gameState.theme = theme;
            localStorage.setItem('selectedTheme', theme);
        });
    });

    // Difficulty selection
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!gameState.isPlaying) {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                gameState.difficulty = btn.dataset.difficulty;
            }
        });
    });

    // Time selection
    document.querySelectorAll('.control-panel .btn').forEach(btn => {
        if (btn.id !== 'startBtn') {
            btn.addEventListener('click', () => {
                if (!gameState.isPlaying) {
                    document.querySelectorAll('.control-panel .btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    gameState.selectedTime = parseInt(btn.dataset.time);
                    gameState.timeRemaining = gameState.selectedTime;
                    document.getElementById('timer').textContent = gameState.selectedTime;
                }
            });
        }
    });

    // Start button
    document.getElementById('startBtn').addEventListener('click', startGame);

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportResults);
}

/**
 * Start a new typing game
 */
function startGame() {
    initAudio();
    
    gameState.isPlaying = true;
    gameState.timeRemaining = gameState.selectedTime;
    gameState.currentWords = generateWords();
    gameState.currentWordIndex = 0;
    gameState.typedWords = 0;
    gameState.correctWords = 0;
    gameState.incorrectWords = 0;
    gameState.startTime = Date.now();
    gameState.fingerCounts = {};
    gameState.streak = 0;
    
    // Reset finger counts
    Object.values(fingerMap).forEach(finger => {
        gameState.fingerCounts[finger] = 0;
    });

    renderGameArea();
    renderFingerStats();
    document.getElementById('streak').textContent = 0;
    
    gameState.timerInterval = setInterval(updateTimer, 100);
    
    showMotivation('Let\'s GO! Show me what you\'ve got! 🚀');
}

/**
 * Generate random words based on current difficulty
 * @returns {Array} Array of random words
 */
function generateWords() {
    const wordBank = wordBanks[gameState.difficulty];
    const words = [];
    for (let i = 0; i < 100; i++) {
        words.push(wordBank[Math.floor(Math.random() * wordBank.length)]);
    }
    return words;
}

/**
 * Render the game area with words and input
 */
function renderGameArea() {
    const wordsToShow = gameState.currentWords.slice(
        gameState.currentWordIndex, 
        gameState.currentWordIndex + 5
    );
    
    const wordDisplay = wordsToShow.map((word, index) => {
        const className = index === 0 ? 'current' : '';
        return `<span class="word ${className}">${word}</span>`;
    }).join('');

    document.getElementById('gameContent').innerHTML = `
        <div class="word-display">${wordDisplay}</div>
        <input type="text" 
               id="userInput" 
               autofocus 
               placeholder="Start typing..." 
               autocomplete="off" 
               autocorrect="off" 
               autocapitalize="off" 
               spellcheck="false">
    `;

    const input = document.getElementById('userInput');
    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleKeydown);
    input.focus();
}

/**
 * Handle keydown events (for keystroke tracking and spacebar)
 * @param {KeyboardEvent} e 
 */
function handleKeydown(e) {
    if (!gameState.isPlaying) return;

    // Track finger usage (only single characters, ignoring control/modifier keys)
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const key = e.key.toLowerCase();
        if (fingerMap[key]) {
            const finger = fingerMap[key];
            gameState.fingerCounts[finger]++;
            gameState.totalKeystrokes++;
            localStorage.setItem('totalKeystrokes', gameState.totalKeystrokes);
            highlightFinger(finger);
            renderFingerStats();
        }
    }

    if (e.key === ' ') {
        e.preventDefault();
        const input = e.target;
        const typed = input.value.trim();
        const currentWord = gameState.currentWords[gameState.currentWordIndex];
        
        if (typed === currentWord) {
            processCorrectWord();
        } else {
            processIncorrectWord();
        }
        
        input.value = '';
        document.getElementById('typingFeedback').innerHTML = '';
    }
}

/**
 * Handle input events for visual feedback
 * @param {InputEvent} e 
 */
function handleInput(e) {
    const typed = e.target.value;
    const currentWord = gameState.currentWords[gameState.currentWordIndex];
    
    // Visual character-by-character feedback
    const feedbackContainer = document.getElementById('typingFeedback');
    feedbackContainer.innerHTML = '';
    
    for (let i = 0; i < typed.length; i++) {
        const char = typed[i];
        const expectedChar = currentWord[i];
        const indicator = document.createElement('span');
        indicator.className = 'char-indicator ' + (char === expectedChar ? 'char-correct' : 'char-incorrect');
        indicator.textContent = char;
        feedbackContainer.appendChild(indicator);
    }

    updateStats();
}

/**
 * Process a correctly typed word
 */
function processCorrectWord() {
    gameState.correctWords++;
    gameState.typedWords++;
    gameState.streak++;
    
    if (gameState.streak > gameState.bestStreak) {
        gameState.bestStreak = gameState.streak;
    }
    
    document.getElementById('streak').textContent = gameState.streak;
    
    playSound('correct');
    
    // Show streak milestone messages
    if (gameState.streak === 5) {
        showMotivation('🔥 5 in a row! You\'re on fire!');
        playSound('streak');
    } else if (gameState.streak === 10) {
        showMotivation('⚡ 10 STREAK! Unstoppable!');
        playSound('streak');
        checkAchievement('streak_10');
    } else if (gameState.streak === 20) {
        showMotivation('💎 20 COMBO! LEGENDARY!');
        playSound('streak');
    } else if (gameState.streak === 25) {
        showMotivation('👑 25 STREAK! GODLIKE!');
        playSound('streak');
        checkAchievement('streak_25');
    } else if (gameState.streak === 50) {
        showMotivation('🌟 50 STREAK! TRANSCENDENT! 🌟');
        playSound('streak');
        checkAchievement('streak_50');
    } else if (gameState.streak % 25 === 0) {
        showMotivation(`🌟 ${gameState.streak} STREAK! GODLIKE! 🌟`);
        playSound('streak');
    }
    updateStats();
    nextWord();
}

/**
 * Process an incorrectly typed word
 */
function processIncorrectWord() {
    gameState.incorrectWords++;
    gameState.typedWords++;
    gameState.streak = 0;
    document.getElementById('streak').textContent = 0;
    
    playSound('incorrect');
    updateStats();
    nextWord();
}

/**
 * Move to the next word
 */
function nextWord() {
    gameState.currentWordIndex++;
    
    // Generate more words if running low
    if (gameState.currentWordIndex >= gameState.currentWords.length - 10) {
        gameState.currentWords.push(...generateWords());
    }
    
    renderGameArea();
}

/**
 * Update the timer display
 */
function updateTimer() {
    gameState.timeRemaining -= 0.1;
    const timerEl = document.getElementById('timer');
    timerEl.textContent = Math.ceil(gameState.timeRemaining);
    
    // Add warning animation when time is running out
    if (gameState.timeRemaining <= 10) {
        timerEl.classList.add('warning');
    } else {
        timerEl.classList.remove('warning');
    }
    
    if (gameState.timeRemaining <= 0) {
        endGame();
    }
}

/**
 * Update real-time statistics
 */
function updateStats() {
    const elapsedMinutes = (Date.now() - gameState.startTime) / 60000;
    const wpm = Math.round(gameState.correctWords / elapsedMinutes) || 0;
    const accuracy = gameState.typedWords > 0 
        ? Math.round((gameState.correctWords / gameState.typedWords) * 100) 
        : 100;

    document.getElementById('wpm').textContent = wpm;
    document.getElementById('accuracy').textContent = accuracy + '%';
    gameState.currentWpm = wpm;
}

/**
 * End the game and show results
 */
function endGame() {
    clearInterval(gameState.timerInterval);
    gameState.isPlaying = false;

    const elapsedMinutes = gameState.selectedTime / 60;
    const wpm = Math.round(gameState.correctWords / elapsedMinutes);
    const accuracy = Math.round((gameState.correctWords / gameState.typedWords) * 100);

    const result = {
        wpm: wpm,
        accuracy: accuracy,
        duration: gameState.selectedTime,
        difficulty: gameState.difficulty,
        date: new Date().toLocaleString(),
        correctWords: gameState.correctWords,
        incorrectWords: gameState.incorrectWords,
        bestStreak: gameState.bestStreak
    };

    gameState.history.unshift(result);
    localStorage.setItem('typingHistory', JSON.stringify(gameState.history));

    updateScoreboard();
    updateBestWpm();
    document.getElementById('totalTests').textContent = gameState.history.length;

    // Check achievements
    checkAchievement('first_test');
    if (wpm >= 50) checkAchievement('speed_demon_50');
    if (wpm >= 80) checkAchievement('speed_demon_80');
    if (wpm >= 100) checkAchievement('speed_demon_100');
    if (accuracy === 100) checkAchievement('accuracy_master');
    if (gameState.selectedTime >= 180) checkAchievement('marathoner');
    if (gameState.history.length >= 25) checkAchievement('dedicated');
    if (gameState.totalKeystrokes >= 1000) checkAchievement('finger_master');
    
    // Check consistency achievement
    const recent60Plus = gameState.history.slice(0, 5).filter(h => h.wpm >= 60);
    if (recent60Plus.length >= 5) checkAchievement('consistent');

    showMotivationBasedOnPerformance(wpm, accuracy);

    document.getElementById('gameContent').innerHTML = `
        <div class="welcome-screen">
            <h2>Test Complete! 🎯</h2>
            <p style="font-size: 2em; margin: 30px 0;">
                <strong>${wpm} WPM</strong> | <strong>${accuracy}% Accuracy</strong>
            </p>
            <p>Words Typed: ${gameState.correctWords} correct, ${gameState.incorrectWords} incorrect</p>
            <p>Best Streak: ${gameState.bestStreak} words</p>
            <p>Difficulty: ${gameState.difficulty.toUpperCase()}</p>
            <button class="btn" id="startBtn" style="font-size: 1.5em; padding: 20px 50px;"><span>TRY AGAIN</span></button>
        </div>
    `;

    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('typingFeedback').innerHTML = '';
}

/**
 * Show motivation message based on performance
 * @param {number} wpm 
 * @param {number} accuracy 
 */
function showMotivationBasedOnPerformance(wpm, accuracy) {
    let message = '';
    
    if (wpm >= 100 && accuracy >= 95) {
        message = '🔥 LEGENDARY! You\'re a typing GOD! 🔥';
    } else if (wpm >= 80 && accuracy >= 95) {
        message = '💎 INCREDIBLE! Master level achieved! 💎';
    } else if (wpm >= 60 && accuracy >= 90) {
        message = '⚡ IMPRESSIVE! Keep that momentum! ⚡';
    } else if (wpm >= 40 && accuracy >= 85) {
        message = '💪 GREAT JOB! You\'re improving fast! 💪';
    } else if (wpm >= 20) {
        message = '🌟 GOOD START! Practice makes perfect! 🌟';
    } else {
        message = '🚀 KEEP GOING! Every master was once a beginner! 🚀';
    }

    showMotivation(message);
}

/**
 * Display a motivation message
 * @param {string} message 
 */
function showMotivation(message) {
    const msgEl = document.getElementById('motivationMsg');
    msgEl.textContent = message;
    setTimeout(() => {
        msgEl.textContent = '';
    }, 5000);
}

/**
 * Update the best WPM display
 */
function updateBestWpm() {
    if (gameState.history.length > 0) {
        const best = Math.max(...gameState.history.map(h => h.wpm));
        document.getElementById('bestWpm').textContent = best;
    }
}

/**
 * Update the scoreboard display
 */
function updateScoreboard() {
    const scoreList = document.getElementById('scoreList');
    const bestWpm = gameState.history.length > 0 ? Math.max(...gameState.history.map(h => h.wpm)) : 0;
    
    scoreList.innerHTML = gameState.history.slice(0, 15).map((score, index) => {
        const isBest = score.wpm === bestWpm && bestWpm > 0;
        const difficulty = score.difficulty ? score.difficulty.toUpperCase() : 'MEDIUM';
        return `
            <div class="score-entry ${isBest ? 'best' : ''}">
                <div>
                    <strong>#${index + 1}</strong> ${escapeHTML(score.date)}
                    ${isBest ? ' 🏆' : ''}
                    <br>
                    <small style="color: #7dd3fc;">${escapeHTML(difficulty)} | Streak: ${score.bestStreak || 0}</small>
                </div>
                <div>
                    <strong>${score.wpm} WPM</strong> | ${score.accuracy}% | ${score.duration}s
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Render finger statistics
 */
function renderFingerStats() {
    const fingerStats = document.getElementById('fingerStats');
    const sorted = Object.entries(gameState.fingerCounts)
        .sort((a, b) => b[1] - a[1]);

    fingerStats.innerHTML = sorted.map(([finger, count]) => `
        <div class="finger-item" data-finger="${finger}">
            <div style="font-size: 0.9em; color: #7dd3fc;">${finger}</div>
            <div style="font-size: 1.8em; margin-top: 5px; color: #00d9ff;">${count}</div>
            <div style="font-size: 0.8em; margin-top: 5px; color: #7dd3fc;">keystrokes</div>
        </div>
    `).join('');
}

/**
 * Highlight a finger when used
 * @param {string} finger 
 */
function highlightFinger(finger) {
    const fingerEl = document.querySelector(`[data-finger="${finger}"]`);
    if (fingerEl) {
        fingerEl.classList.add('active');
        setTimeout(() => fingerEl.classList.remove('active'), 300);
    }
}

/**
 * Export results to JSON file
 */
function exportResults() {
    const data = {
        exportDate: new Date().toLocaleString(),
        totalTests: gameState.history.length,
        bestWpm: gameState.history.length > 0 ? Math.max(...gameState.history.map(h => h.wpm)) : 0,
        averageWpm: gameState.history.length > 0 
            ? Math.round(gameState.history.reduce((sum, h) => sum + h.wpm, 0) / gameState.history.length)
            : 0,
        averageAccuracy: gameState.history.length > 0
            ? Math.round(gameState.history.reduce((sum, h) => sum + h.accuracy, 0) / gameState.history.length)
            : 0,
        totalKeystrokes: gameState.totalKeystrokes,
        unlockedAchievements: gameState.achievements.filter(a => a.unlocked).length,
        achievements: gameState.achievements,
        history: gameState.history
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TypoVelocity_Results_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showMotivation('✅ Results exported successfully!');
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}