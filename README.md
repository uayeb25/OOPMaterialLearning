# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# MongoDB Aggregation Pipeline - Educational Visualization 🍭

An interactive React application that teaches MongoDB aggregation pipeline concepts through step-by-step animations and visual explanations.

## 🎯 Purpose

This educational tool demonstrates how MongoDB aggregation pipelines work using a candy store system example. Students learn about:

- `$match` operations for filtering documents
- `$addFields` for data transformation
- `$lookup` for JOIN operations between collections
- Pipeline stages and data flow

## 🚀 Features

- **Interactive Presentation**: PowerPoint-style navigation with smooth animations
- **Visual Learning**: Step-by-step breakdown of each pipeline stage
- **Real Data Examples**: Uses realistic candy store collections
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging transitions

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **CSS3** with modern responsive design

## 📦 Collections Used

### catalogs
Contains product and bundle information:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id_catalog_type": "507f1f77bcf86cd799439001",
  "name": "Bundle Chocolates Especiales",
  "description": "Caja con chocolates premium",
  "cost": 450.00,
  "discount": 15,
  "active": true
}
```

### catalogtypes
Defines whether items are bundles or individual products:
```json
{
  "_id": "507f1f77bcf86cd799439001", 
  "description": "bundle",
  "active": true
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd learningfun
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 Usage

- Use **Previous/Next** buttons to navigate through slides
- Press **Reiniciar** to restart the presentation
- Use keyboard shortcuts:
  - **Arrow Right** or **Space**: Next slide
  - **Arrow Left**: Previous slide  
  - **Home**: Reset presentation

## 📚 Learning Path

1. **Introduction**: Understanding the pipeline objective
2. **Initial Data**: Viewing the source collections
3. **Target Result**: Understanding the expected output
4. **Connection Demo**: Visualizing data relationships
5. **Step 1 - $match**: Filtering specific documents
6. **Step 2 - $addFields**: Converting data types
7. **Step 3 - $lookup**: JOIN operations explained
8. **Step 4 - Final $match**: Validating results

## 🎨 Customization

The application is designed to be easily customizable:

- **Data**: Modify `sampleCatalogs` and `sampleCatalogTypes` in `App.tsx`
- **Styling**: Update `App.css` for different themes
- **Slides**: Add or modify slide components as needed
- **Animations**: Adjust Framer Motion parameters for different effects

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Styles and animations  
├── main.tsx         # Application entry point
└── vite-env.d.ts    # Vite type definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for educational purposes to make MongoDB concepts more accessible
- Inspired by the need for visual learning tools in database education
- Uses modern React patterns and best practices

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
