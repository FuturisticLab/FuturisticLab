# 🚀 TypoVelocity - Futuristic Typing Speed Trainer

A groundbreaking, sci-fi themed typing performance game designed to improve typing speed and accuracy through engaging gameplay, real-time feedback, and achievement systems.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Gameplay
- **Multiple Time Modes**: 30s, 1min, 2min, 3min sessions
- **4 Difficulty Levels**: Easy, Medium, Hard, Extreme
- **Real-time Stats**: WPM, Accuracy, Streak tracking
- **Visual Feedback**: Character-by-character typing indicators

### Advanced Features
- 🎨 **4 Color Themes**: Blue, Green, Purple, Orange
- 🔊 **Dynamic Sound Effects**: Correct/incorrect feedback, streak sounds, achievement alerts
- 🏆 **12 Achievements**: Unlockable badges for milestones
- 👆 **Finger Tracking**: Detailed analysis of which fingers are used most
- 📊 **Performance History**: Track progress over time
- 📈 **Streak System**: Combo tracking with motivational messages
- 💾 **Export Data**: Download complete performance reports (JSON)

### UX Enhancements
- Responsive design for all screen sizes
- Smooth animations and transitions
- LED-style futuristic interface
- Hover effects and visual polish
- Persistent data storage (localStorage)

## 🎮 Live Demo

[Play TypoVelocity Now!](https://futuristiclab.github.io/typovelocity/) *(Update after deployment)*

## 📁 Project Structure

```
typovelocity/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── app.js          # Main game logic
│   ├── audio.js        # Sound effects system
│   └── achievements.js # Achievement tracking
├── assets/
│   └── screenshots/    # Game screenshots (optional)
├── README.md           # This file
└── LICENSE             # MIT License
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/typovelocity.git
cd typovelocity
```

2. **Open in browser**
```bash
# Option 1: Direct file open
open index.html

# Option 2: Use a local server (recommended)
python -m http.server 8000
# or
npx serve
```

3. **Navigate to** `http://localhost:8000`

### Deployment to GitHub Pages

1. **Create a new GitHub repository**
   - Go to github.com/new
   - Name it `typovelocity`
   - Initialize without README (we have one)

2. **Push your code**
```bash
git init
git add .
git commit -m "Initial commit: TypoVelocity v1.0"
git branch -M main
git remote add origin https://github.com/yourusername/typovelocity.git
git push -u origin main
```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from branch `main`, folder `/ (root)`
   - Save and wait 1-2 minutes

4. **Access your live site**
   - Visit: `https://yourusername.github.io/typovelocity`

## 🎯 How to Play

1. **Select Difficulty**: Choose from Easy, Medium, Hard, or Extreme
2. **Choose Duration**: Pick 30s, 1min, 2min, or 3min
3. **Click START**: Begin typing the displayed words
4. **Type Accurately**: Press SPACE after each word
5. **Build Streaks**: Consecutive correct words trigger bonuses
6. **Unlock Achievements**: Complete challenges to earn badges
7. **Track Progress**: View detailed statistics and history

## 🏆 Achievements

| Achievement | Description | Icon |
|------------|-------------|------|
| First Steps | Complete your first test | 🎯 |
| Speed Demon | Reach 50 WPM | ⚡ |
| Velocity Master | Reach 80 WPM | 🚀 |
| Legendary Speed | Reach 100 WPM | 💎 |
| Perfectionist | 100% accuracy | 🎪 |
| Combo Starter | 10 word streak | 🔥 |
| Unstoppable | 25 word streak | ⚡ |
| Godlike | 50 word streak | 👑 |
| Marathoner | Complete 3 minute test | 🏃 |
| Dedicated | Complete 25 tests | 💪 |
| Finger Master | 1000 total keystrokes | 👆 |
| Consistency King | 5 tests over 60 WPM | 📈 |

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations, gradients, flexbox/grid
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: Client-side data persistence
- **Web Audio API**: Dynamic sound generation

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Performance
- Lightweight: ~50KB total (uncompressed)
- No external dependencies
- Instant loading
- 60 FPS animations

## 🎨 Customization

### Adding New Word Banks
Edit `js/app.js` and modify the `wordBanks` object:

```javascript
const wordBanks = {
  custom: [
    'your', 'custom', 'words', 'here'
  ]
};
```

### Changing Themes
Edit `css/style.css` theme classes:

```css
body.theme-custom {
    background: linear-gradient(135deg, #color1, #color2);
    color: #customColor;
}
```

### Adding Achievements
Edit `js/achievements.js` and add to the `achievements` array:

```javascript
{
  id: 'custom_achievement',
  name: 'Achievement Name',
  desc: 'Achievement description',
  icon: '🎯',
  unlocked: false
}
```

## 📊 Data Export Format

The exported JSON contains:
```json
{
  "exportDate": "timestamp",
  "totalTests": 0,
  "bestWpm": 0,
  "averageWpm": 0,
  "averageAccuracy": 0,
  "totalKeystrokes": 0,
  "unlockedAchievements": 0,
  "achievements": [],
  "history": []
}
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Test on multiple browsers
- Update README if adding features
- Keep commits atomic and descriptive

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by typing trainers like TypeRacer and Monkeytype
- Futuristic design inspired by cyberpunk aesthetics
- Sound effects generated using Web Audio API

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/typovelocity](https://github.com/yourusername/typovelocity)

---

**Made with ⚡ and ❤️ for typing enthusiasts**

## 🗺️ Roadmap

### Version 1.1 (Planned)
- [ ] Multiplayer mode
- [ ] Custom word lists
- [ ] Dark/light mode toggle
- [ ] Keyboard heatmap visualization
- [ ] Progress graphs and charts

### Version 2.0 (Future)
- [ ] User accounts
- [ ] Global leaderboards
- [ ] Daily challenges
- [ ] Mobile app version
- [ ] Practice specific words/patterns

## 📚 Additional Resources

- [Touch Typing Guide](https://www.typing.com/student/lessons)
- [Keyboard Layout Reference](https://en.wikipedia.org/wiki/QWERTY)
- [WPM Benchmarks](https://www.speedtypingonline.com/typing-test)

## 💡 Tips for Improvement

1. **Posture**: Sit upright with feet flat on the floor
2. **Hand Position**: Keep wrists elevated, not resting
3. **Look at Screen**: Don't watch your fingers
4. **Rhythm**: Type in steady rhythm, not bursts
5. **Practice**: Consistency beats intensity - 15min daily is better than 2hrs weekly

## ⚡ Performance Tips

- Clear browser cache if experiencing issues
- Disable browser extensions that may interfere
- Use a wired keyboard for best latency
- Close other tabs to maximize performance
- Enable hardware acceleration in browser settings
