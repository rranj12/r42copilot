# R42 Longevity Navigator

A comprehensive React-based application for personalized longevity health tracking and biomarker analysis, built for the R42 Institute.

## 🚀 Features

### Core Functionality
- **Personalized Onboarding**: Multi-step profile setup with health goals and biomarker integration
- **Dashboard Analytics**: Comprehensive health metrics and progress tracking
- **Biomarker Integration**: Support for multiple diagnostic providers (ExSeed, GenomeLink, NeuroAge, Iollo)
- **Apple Health Integration**: Seamless health data synchronization
- **PDF Report Processing**: Upload and analyze biomarker reports with data visualization

### Data Visualization
- **NeuroAge Reports**: Cognitive health analysis with brain age assessment
- **Iollo Reports**: Metabolic health analysis with inflammation and oxidative stress markers
- **Interactive Charts**: Bar charts, doughnut charts, and trend analysis
- **Real-time Insights**: Personalized health recommendations and insights

### Wellness Features
- **Retreat Planning**: 3-day longevity retreat at Ritz-Carlton, Half Moon Bay
- **Wellness Hub**: Journal, Mediterranean recipes, and community forum
- **R42 Center of Excellence**: Clinical trials, webinars, research papers, and portfolio companies

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage persistence

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rranj12/r42copilot.git
   cd r42copilot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # Shadcn UI components
│   ├── DashboardLayout.tsx
│   └── r42-logo.tsx
├── pages/             # Application pages
│   ├── Dashboard.tsx
│   ├── Index.tsx
│   ├── Onboarding.tsx
│   ├── NeuroAge.tsx
│   ├── Iollo.tsx
│   ├── Retreat.tsx
│   ├── WellnessHub.tsx
│   └── R42CoE.tsx
├── lib/               # Utility functions
│   ├── data-visualization.ts
│   ├── user-data.ts
│   └── utils.ts
└── hooks/             # Custom React hooks
```

## 🔧 Key Features

### Onboarding Flow
- **Step 1**: Personal information and health goals
- **Step 2**: Biomarker data integration (ExSeed, GenomeLink, NeuroAge, Iollo)
- **Step 3**: Apple Health integration
- **Step 4**: Research consent and completion

### Biomarker Analysis
- **NeuroAge**: Cognitive health and brain age assessment
- **Iollo**: Metabolic health, inflammation, oxidative stress, and mitochondrial function
- **PDF Upload**: Process and visualize biomarker reports
- **Data Visualization**: Interactive charts and trend analysis

### Dashboard Features
- **Overview**: Quick stats and navigation
- **Biomarkers**: Status tracking for all diagnostic providers
- **Insights**: Personalized health recommendations
- **Progress**: Health goal tracking and achievements

### Additional Pages
- **Retreat**: 3-day longevity retreat planning with speaker profiles
- **Wellness Hub**: Journal, recipes, and community features
- **R42 CoE**: Research papers, clinical trials, and portfolio companies

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface with R42 branding
- **Accessibility**: WCAG compliant components
- **Dark/Light Mode**: Theme support (configurable)
- **Loading States**: Smooth user experience with loading indicators

## 📊 Data Visualization

### NeuroAge Reports
- Cognitive performance metrics
- Brain age assessment
- Neural efficiency analysis
- Trend tracking over time

### Iollo Reports
- Metabolic health markers
- Inflammation analysis
- Oxidative stress assessment
- Mitochondrial function metrics

## 🔐 Security & Privacy

- **Local Storage**: User data persisted locally
- **No External APIs**: All data processing done client-side
- **PDF Processing**: Simulated data extraction (production-ready backend needed)

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Environment Variables
Create a `.env` file for production configuration:
```env
VITE_APP_TITLE=R42 Longevity Navigator
VITE_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **R42 Institute**: For the vision and requirements
- **Shadcn UI**: For the beautiful component library
- **Chart.js**: For the data visualization capabilities
- **Vite**: For the fast development experience

## 📞 Support

For support, email support@r42institute.com or create an issue in this repository.

---

**Built with ❤️ for the R42 Institute**
