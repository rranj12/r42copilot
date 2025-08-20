export interface PDFAnalysisRequest {
  content: string;
  platform: string;
  filename: string;
}

export interface PDFAnalysisResponse {
  summary: string;
  keyMetrics: KeyMetric[];
  recommendations: string[];
  riskFactors: string[];
  trends: Trend[];
  confidence: number;
}

export interface KeyMetric {
  name: string;
  value: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  description: string;
  referenceRange?: string;
}

export interface Trend {
  metric: string;
  direction: 'improving' | 'declining' | 'stable';
  change: string;
  period: string;
  significance: 'high' | 'medium' | 'low';
}

export class OpenAIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export const analyzePDFContent = async (request: PDFAnalysisRequest): Promise<PDFAnalysisResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ''}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert longevity analyst. Analyze the PDF content and provide insights in this exact JSON format:
{
  "summary": "2-3 sentence summary",
  "keyMetrics": [
    {"name": "Metric name", "value": "actual value", "status": "normal/elevated/low/critical", "description": "explanation"}
  ],
  "recommendations": ["actionable recommendation 1", "recommendation 2"],
  "riskFactors": ["risk factor 1", "risk factor 2"],
  "trends": [
    {"metric": "metric name", "direction": "improving/declining/stable", "change": "change value", "period": "time period"}
  ]
}`
          },
          {
            role: 'user',
            content: `Analyze this ${request.platform} report: ${request.content}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    try {
      return JSON.parse(aiResponse);
    } catch {
      throw new OpenAIError('Invalid response format from OpenAI');
    }

  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error;
    }
    throw new OpenAIError('Failed to analyze PDF content');
  }
};

export const extractTextFromPDF = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const mockContent = `Sample PDF content for ${file.name}
      
This simulates the actual text extracted from your PDF. The AI will analyze this content to provide insights.

Key findings from your ${file.name}:
- Biomarker values and test results
- Reference ranges and clinical notes
- Recommendations and risk factors

This allows the system to demonstrate real AI analysis while you implement proper PDF parsing.`;
      
      resolve(mockContent);
    };
    reader.readAsText(file, 'UTF-8');
  });
};

export const validatePDFFile = (file: File): boolean => {
  if (file.type !== 'application/pdf') {
    return false;
  }
  if (file.size > 10 * 1024 * 1024) {
    return false;
  }
  return true;
};
