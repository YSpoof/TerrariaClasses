# Terraria Calamity Mod Class Setups Guide

A comprehensive, interactive guide for optimal class setups in Terraria's Calamity Mod (currently). This application provides detailed equipment recommendations, accessories, and builds for all classes throughout every stage of the game.

## 🎮 Features

- **Complete Class Coverage**: Melee, Ranger, Mage, Summoner, and Rogue classes
- **Progression-Based**: Setups organized by game stages (Pre-Hardmode, Hardmode, Post-Moon Lord, etc.)
- **Interactive Interface**: Modern, responsive design with dark/light theme support
- **Mobile Friendly**: Optimized for both desktop and mobile gaming sessions
- **Fast Loading**: Built with Vite for optimal performance

## 🚀 Live Demo

Visit [terraria.lzart.com.br](https://terraria.lzart.com.br) to use the guide immediately.

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4 with daisyUI 5 components
- **Language**: TypeScript
- **Routing**: Vue Router
- **Deployment**: GitHub Pages

## 📦 Project Setup

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YSpoof/TerrariaClasses.git
cd TerrariaClasses

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Type-check and build
pnpm build

# Preview production build locally
pnpm preview
```

### Deployment

```bash
# Deploy to GitHub Pages
pnpm deploy
```

## 🎯 Usage

1. **Select Game Stage**: Choose your current progression stage (Pre-Boss, Pre-Hardmode, etc.)
2. **Pick Your Class**: Select from Melee, Ranger, Mage, Summoner, or Rogue
3. **View Recommendations**: Get detailed equipment, accessory, and buff recommendations

## 🎨 Customization

### Themes

The application supports both light and dark themes with automatic system preference detection. The custom theme configuration is in `src/styles.css`:

```css
@plugin "daisyui/theme" {
  name: "light";
  default: true;
  /* Custom color variables */
}
```

### Adding New Data

Class setup data is fetched from an external JSON source. To modify the data structure, update the TypeScript interfaces in `src/types.d.ts`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Calamity Mod Team](https://calamitymod.com/) for creating the amazing mod
- [Re-Logic](https://re-logic.com/) for Terraria
- [kokasmark](https://github.com/kokasmark) for the original data source

## 🐛 Bug Reports & Feature Requests

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/YSpoof/TerrariaClasses/issues) on GitHub.
