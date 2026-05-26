/**
 * TypoVelocity - Achievements System
 * Defines and manages all achievements
 */

/**
 * Achievement definitions
 * Each achievement has: id, name, description, icon, and unlocked status
 */
const achievements = [
    {
        id: 'first_test',
        name: 'First Steps',
        desc: 'Complete your first test',
        icon: '🎯',
        unlocked: false
    },
    {
        id: 'speed_demon_50',
        name: 'Speed Demon',
        desc: 'Reach 50 WPM',
        icon: '⚡',
        unlocked: false
    },
    {
        id: 'speed_demon_80',
        name: 'Velocity Master',
        desc: 'Reach 80 WPM',
        icon: '🚀',
        unlocked: false
    },
    {
        id: 'speed_demon_100',
        name: 'Legendary Speed',
        desc: 'Reach 100 WPM',
        icon: '💎',
        unlocked: false
    },
    {
        id: 'accuracy_master',
        name: 'Perfectionist',
        desc: '100% accuracy',
        icon: '🎪',
        unlocked: false
    },
    {
        id: 'streak_10',
        name: 'Combo Starter',
        desc: '10 word streak',
        icon: '🔥',
        unlocked: false
    },
    {
        id: 'streak_25',
        name: 'Unstoppable',
        desc: '25 word streak',
        icon: '⚡',
        unlocked: false
    },
    {
        id: 'streak_50',
        name: 'Godlike',
        desc: '50 word streak',
        icon: '👑',
        unlocked: false
    },
    {
        id: 'marathoner',
        name: 'Marathoner',
        desc: 'Complete 3 minute test',
        icon: '🏃',
        unlocked: false
    },
    {
        id: 'dedicated',
        name: 'Dedicated',
        desc: 'Complete 25 tests',
        icon: '💪',
        unlocked: false
    },
    {
        id: 'finger_master',
        name: 'Finger Master',
        desc: '1000 total keystrokes',
        icon: '👆',
        unlocked: false
    },
    {
        id: 'consistent',
        name: 'Consistency King',
        desc: '5 tests over 60 WPM',
        icon: '📈',
        unlocked: false
    }
];

/**
 * Check and unlock an achievement
 * @param {string} id - Achievement ID to check
 * @returns {boolean} True if achievement was just unlocked
 */
function checkAchievement(id) {
    if (!window.gameState || !window.gameState.achievements) {
        return false;
    }
    
    const achievement = window.gameState.achievements.find(a => a.id === id);
    
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        
        // Save to localStorage
        localStorage.setItem('typingAchievements', JSON.stringify(window.gameState.achievements));
        
        // Re-render achievements
        renderAchievements();
        
        // Show notification
        showMotivation(`🏆 Achievement Unlocked: ${achievement.name}!`);
        
        // Play sound
        if (window.playSound) {
            window.playSound('achievement');
        }
        
        return true;
    }
    
    return false;
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
 * Render all achievements to the DOM
 */
function renderAchievements() {
    const grid = document.getElementById('achievementGrid');
    
    if (!grid || !window.gameState || !window.gameState.achievements) {
        return;
    }
    
    grid.innerHTML = window.gameState.achievements.map(ach => `
        <div class="achievement-item ${ach.unlocked ? 'unlocked' : ''}">
            <div class="achievement-icon">${escapeHTML(ach.icon)}</div>
            <div class="achievement-name">${escapeHTML(ach.name)}</div>
            <div class="achievement-desc">${escapeHTML(ach.desc)}</div>
        </div>
    `).join('');
}

/**
 * Load achievements from localStorage
 * @returns {Array} Loaded achievements or default set
 */
function loadAchievements() {
    const saved = localStorage.getItem('typingAchievements');
    
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch (e) {
            console.error('Failed to load achievements:', e);
        }
    }
    
    return JSON.parse(JSON.stringify(achievements)); // Deep copy
}

/**
 * Reset all achievements (useful for testing)
 */
function resetAchievements() {
    if (window.gameState) {
        window.gameState.achievements = JSON.parse(JSON.stringify(achievements));
        localStorage.setItem('typingAchievements', JSON.stringify(window.gameState.achievements));
        renderAchievements();
        console.log('All achievements reset!');
    }
}

/**
 * Get achievement statistics
 * @returns {Object} Stats about achievements
 */
function getAchievementStats() {
    if (!window.gameState || !window.gameState.achievements) {
        return { total: 0, unlocked: 0, percentage: 0 };
    }
    
    const total = window.gameState.achievements.length;
    const unlocked = window.gameState.achievements.filter(a => a.unlocked).length;
    const percentage = Math.round((unlocked / total) * 100);
    
    return { total, unlocked, percentage };
}

// Export to global scope
window.achievements = achievements;
window.checkAchievement = checkAchievement;
window.renderAchievements = renderAchievements;
window.loadAchievements = loadAchievements;
window.resetAchievements = resetAchievements;
window.getAchievementStats = getAchievementStats;