import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

export interface NeuroAgeData {
  cognitiveScore: number;
  brainAge: number;
  dataQuality: number;
  cognitiveMetrics: {
    memory: number;
    processingSpeed: number;
    attention: number;
    executiveFunction: number;
    workingMemory: number;
    visualSpatial: number;
  };
  brainHealthMetrics: {
    neuralEfficiency: number;
    cognitiveFlexibility: number;
    reactionTime: number;
    patternRecognition: number;
  };
  trends: {
    labels: string[];
    cognitiveData: number[];
    brainAgeData: number[];
  };
}

export const generateNeuroAgeData = (fileName: string): NeuroAgeData => {
  // Simulate data extraction from PDF
  // In a real app, this would parse the actual PDF content
  const baseScore = 70 + Math.random() * 30; // 70-100 range
  
  return {
    cognitiveScore: Math.round(baseScore),
    brainAge: Math.round(65 + Math.random() * 15), // 65-80 range
    dataQuality: Math.round(85 + Math.random() * 15), // 85-100 range
    cognitiveMetrics: {
      memory: Math.round(75 + Math.random() * 25),
      processingSpeed: Math.round(70 + Math.random() * 30),
      attention: Math.round(60 + Math.random() * 40),
      executiveFunction: Math.round(80 + Math.random() * 20),
      workingMemory: Math.round(65 + Math.random() * 35),
      visualSpatial: Math.round(70 + Math.random() * 30),
    },
    brainHealthMetrics: {
      neuralEfficiency: Math.round(75 + Math.random() * 25),
      cognitiveFlexibility: Math.round(70 + Math.random() * 30),
      reactionTime: Math.round(60 + Math.random() * 40),
      patternRecognition: Math.round(80 + Math.random() * 20),
    },
    trends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      cognitiveData: [65, 68, 72, 75, 78, 82],
      brainAgeData: [70, 72, 69, 71, 74, 76],
    }
  };
};

export const getCognitiveChartData = (data: NeuroAgeData) => ({
  labels: ['Memory', 'Processing Speed', 'Attention', 'Executive Function'],
  datasets: [
    {
      label: 'Cognitive Performance',
      data: [
        data.cognitiveMetrics.memory,
        data.cognitiveMetrics.processingSpeed,
        data.cognitiveMetrics.attention,
        data.cognitiveMetrics.executiveFunction,
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(168, 85, 247, 1)',
      ],
      borderWidth: 2,
    },
  ],
});

export const getBrainHealthChartData = (data: NeuroAgeData) => ({
  labels: ['Neural Efficiency', 'Cognitive Flexibility', 'Reaction Time', 'Pattern Recognition'],
  datasets: [
    {
      label: 'Brain Health Metrics',
      data: [
        data.brainHealthMetrics.neuralEfficiency,
        data.brainHealthMetrics.cognitiveFlexibility,
        data.brainHealthMetrics.reactionTime,
        data.brainHealthMetrics.patternRecognition,
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(168, 85, 247, 1)',
      ],
      borderWidth: 2,
    },
  ],
});

export const getTrendChartData = (data: NeuroAgeData) => ({
  labels: data.trends.labels,
  datasets: [
    {
      label: 'Cognitive Score',
      data: data.trends.cognitiveData,
      borderColor: 'rgba(168, 85, 247, 1)',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Brain Age',
      data: data.trends.brainAgeData,
      borderColor: 'rgba(34, 197, 94, 1)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
});

export const getOverallScoreData = (data: NeuroAgeData) => ({
  labels: ['Cognitive', 'Brain Age'],
  datasets: [
    {
      data: [data.cognitiveScore, data.brainAge],
      backgroundColor: [
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
      ],
      borderColor: [
        'rgba(168, 85, 247, 1)',
        'rgba(34, 197, 94, 1)',
      ],
      borderWidth: 2,
    },
  ],
});

export interface IolloData {
  metabolicScore: number;
  inflammationScore: number;
  oxidativeStressScore: number;
  mitochondrialScore: number;
  overallScore: number;
  metabolicMetrics: {
    insulin: number;
    glucose: number;
    hba1c: number;
    triglycerides: number;
  };
  inflammationMetrics: {
    crp: number;
    il6: number;
    tnf: number;
    fibrinogen: number;
  };
  oxidativeStressMetrics: {
    mda: number;
    gsh: number;
    sod: number;
    catalase: number;
  };
  mitochondrialMetrics: {
    atp: number;
    coq10: number;
    carnitine: number;
    nad: number;
  };
  trends: {
    month: string;
    score: number;
  }[];
  insights: {
    title: string;
    description: string;
    type: 'positive' | 'warning' | 'negative';
  }[];
  recommendations: {
    title: string;
    description: string;
  }[];
}

export const generateIolloData = (fileName: string): IolloData => {
  // Simulate data extraction from PDF
  // In a real app, this would parse the actual PDF content
  const baseScore = 70 + Math.random() * 30; // 70-100 range
  
  return {
    metabolicScore: Math.round(75 + Math.random() * 25),
    inflammationScore: Math.round(60 + Math.random() * 40),
    oxidativeStressScore: Math.round(65 + Math.random() * 35),
    mitochondrialScore: Math.round(70 + Math.random() * 30),
    overallScore: Math.round(baseScore),
    metabolicMetrics: {
      insulin: Math.round(70 + Math.random() * 30),
      glucose: Math.round(75 + Math.random() * 25),
      hba1c: Math.round(80 + Math.random() * 20),
      triglycerides: Math.round(65 + Math.random() * 35),
    },
    inflammationMetrics: {
      crp: Math.round(60 + Math.random() * 40),
      il6: Math.round(65 + Math.random() * 35),
      tnf: Math.round(70 + Math.random() * 30),
      fibrinogen: Math.round(75 + Math.random() * 25),
    },
    oxidativeStressMetrics: {
      mda: Math.round(65 + Math.random() * 35),
      gsh: Math.round(70 + Math.random() * 30),
      sod: Math.round(75 + Math.random() * 25),
      catalase: Math.round(80 + Math.random() * 20),
    },
    mitochondrialMetrics: {
      atp: Math.round(70 + Math.random() * 30),
      coq10: Math.round(75 + Math.random() * 25),
      carnitine: Math.round(65 + Math.random() * 35),
      nad: Math.round(80 + Math.random() * 20),
    },
    trends: [
      { month: 'Jan', score: 65 },
      { month: 'Feb', score: 68 },
      { month: 'Mar', score: 72 },
      { month: 'Apr', score: 75 },
      { month: 'May', score: 78 },
      { month: 'Jun', score: 82 },
    ],
    insights: [
      {
        title: 'Good Metabolic Health',
        description: 'Your insulin sensitivity and glucose metabolism are within optimal ranges.',
        type: 'positive'
      },
      {
        title: 'Elevated Inflammation',
        description: 'CRP levels are slightly elevated. Consider anti-inflammatory interventions.',
        type: 'warning'
      },
      {
        title: 'Strong Mitochondrial Function',
        description: 'Your cellular energy production is functioning well.',
        type: 'positive'
      }
    ],
    recommendations: [
      {
        title: 'Anti-inflammatory Diet',
        description: 'Increase omega-3 fatty acids and reduce processed foods to lower inflammation markers.'
      },
      {
        title: 'Intermittent Fasting',
        description: 'Consider time-restricted feeding to improve metabolic flexibility.'
      },
      {
        title: 'Exercise Protocol',
        description: 'Add high-intensity interval training to boost mitochondrial function.'
      }
    ]
  };
};

export const getMetabolicChartData = (data: IolloData) => ({
  labels: ['Insulin Sensitivity', 'Glucose', 'HbA1c', 'Triglycerides'],
  datasets: [
    {
      label: 'Metabolic Health',
      data: [
        data.metabolicMetrics.insulin,
        data.metabolicMetrics.glucose,
        data.metabolicMetrics.hba1c,
        data.metabolicMetrics.triglycerides,
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 2,
    },
  ],
});

export const getInflammationChartData = (data: IolloData) => ({
  labels: ['CRP', 'IL-6', 'TNF-α', 'Fibrinogen'],
  datasets: [
    {
      label: 'Inflammation Markers',
      data: [
        data.inflammationMetrics.crp,
        data.inflammationMetrics.il6,
        data.inflammationMetrics.tnf,
        data.inflammationMetrics.fibrinogen,
      ],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 101, 101, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(251, 191, 36, 0.8)',
      ],
      borderColor: [
        'rgba(239, 68, 68, 1)',
        'rgba(245, 101, 101, 1)',
        'rgba(251, 146, 60, 1)',
        'rgba(251, 191, 36, 1)',
      ],
      borderWidth: 2,
    },
  ],
});

export const getOxidativeStressChartData = (data: IolloData) => ({
  labels: ['MDA', 'GSH', 'SOD', 'Catalase'],
  datasets: [
    {
      label: 'Oxidative Stress',
      data: [
        data.oxidativeStressMetrics.mda,
        data.oxidativeStressMetrics.gsh,
        data.oxidativeStressMetrics.sod,
        data.oxidativeStressMetrics.catalase,
      ],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderColor: [
        'rgba(239, 68, 68, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(168, 85, 247, 1)',
      ],
      borderWidth: 2,
    },
  ],
});

export const getMitochondrialChartData = (data: IolloData) => ({
  labels: ['ATP', 'CoQ10', 'Carnitine', 'NAD+'],
  datasets: [
    {
      label: 'Mitochondrial Function',
      data: [
        data.mitochondrialMetrics.atp,
        data.mitochondrialMetrics.coq10,
        data.mitochondrialMetrics.carnitine,
        data.mitochondrialMetrics.nad,
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(236, 72, 153, 1)',
      ],
      borderWidth: 2,
    },
  ],
}); 