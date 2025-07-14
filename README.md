# 🏰 Terraria Classes

Your ultimate guide to Terraria class builds, equipment recommendations, and progression strategies across multiple mods.

[![Check it out](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen)](https://terraria.lzart.com.br)

## 🌟 Features

- **Multi-Mod Support**: Comprehensive guides for Vanilla, Calamity, and Thorium mods
- **Class-Based Builds**: Detailed setups for all available classes including:
  - 🗡️ Melee
  - 🏹 Ranged
  - 🔮 Magic
  - 👻 Summoner
  - 🎵 Bard (Thorium)
  - ❤️ Healer (Thorium)
  - 🎯 Thrower (Thorium)
  - 🎯 Rogue (Calamity)
  - 🌟 Mixed builds
- **Game Stage Progression**: Equipment recommendations for every stage:
  From Pre-Boss to Endgame!

- **Equipment Categories**: Complete loadouts including:

  - ⚔️ Weapons
  - 🛡️ Armor sets
  - 💊 Potions & buffs
  - 🎯 Accessories
  - 🔫 Ammo

- **Responsive Design**: Optimized for desktop and mobile devices

- **Fast Loading**: Built with modern web technologies for optimal performance

## 🎮 Supported Mods

### 🌱 Vanilla Terraria

Experience the original Terraria with comprehensive class builds and equipment recommendations for the base game.

### 🔥 Calamity Mod

Explore the massive Calamity mod expansion with its unique classes, weapons, and challenging progression system.

### ⚡ Thorium Mod

Discover new classes and equipment with the Thorium mod, featuring Bard, Healer, and Thrower classes alongside traditional ones.

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + daisyUI 5
- **Build Tool**: Vite
- **Router**: Vue Router 4
- **State Management**: VueUse
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/YSpoof/TerrariaClasses.git
cd TerrariaClasses
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Deployment

Deploy to GitHub Pages:

```bash
pnpm deploy
```

## 📁 Project Structure

```
src/
├── components/           # Reusable Vue components
│   ├── ClassSelector.vue    # Class selection interface
│   ├── GameStageSelector.vue # Game progression selector
│   ├── ItemPanel.vue        # Equipment display panel
│   └── ...
├── pages/               # Route-based page components
│   ├── HomePage.vue         # Landing page
│   ├── VanillaPage.vue      # Vanilla Terraria builds
│   ├── CalamityPage.vue     # Calamity mod builds
│   └── ThoriumPage.vue      # Thorium mod builds
├── stores/              # State management
├── router/              # Vue Router configuration
└── types.d.ts          # TypeScript type definitions

public/
├── vanilla-assets/      # Vanilla game assets
├── thorium-assets/      # Thorium mod assets
└── mods/               # Mod icons and images
```

## 🎯 How to Use

1. **Select a Mod**: Choose between Vanilla, Calamity, or Thorium on the homepage
2. **Pick Your Class**: Select your preferred playstyle (Melee, Ranged, Magic, etc.)
3. **Choose Game Stage**: Select where you are in the game progression
4. **View Recommendations**: Get comprehensive equipment lists

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Adding New Content

- Equipment data is stored in JSON files in the `public` directory
- To add new builds or equipment, update the corresponding JSON files
- Assets should be placed in the appropriate mod folder under `public`

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[@kokasmark](https://github.com/kokasmark)** - This project was heavily inspired by the [Classamity](https://kokasmark.github.io/classamity/) project

## 🐛 Issues & Support

If you encounter any issues or have suggestions:

1. Check existing [Issues](https://github.com/YSpoof/TerrariaClasses/issues)
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs
