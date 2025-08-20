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
            content: `You are an expert longevity and healthspan analyst. Your task is to analyze PDF reports from various longevity platforms and provide concise, actionable insights based on the actual content.

Platform Context:
- NeuroAge: Focuses on brain aging, cognitive biomarkers, and neurological health
- Jona Health: Comprehensive health optimization and biomarker analysis
- Iollo: Advanced longevity testing and biological age assessment
- Function Health: Metabolic health and functional medicine
- TokuEyes: Eye health and retinal biomarkers

Analysis Requirements:
1. Provide a concise summary (2-3 sentences) based on the actual PDF content
2. Identify 3-5 key metrics with their actual values, status, and descriptions from the report
3. Generate 4-6 actionable recommendations based on the findings
4. Highlight 2-3 risk factors or areas of concern from the data
5. Identify trends if multiple measurements are available
6. Use medical terminology appropriately but explain in accessible language
7. Base ALL insights on the actual PDF content provided, not generic information

IMPORTANT: Extract real values, metrics, and findings from the provided PDF text. Do not generate placeholder or generic information.

Output Format: Return a valid JSON object with the exact structure specified in the interface.`
          },
          {
            role: 'user',
            content: `Please analyze this ${request.platform} report and provide insights in the specified JSON format:

Filename: ${request.filename}
Platform: ${request.platform}
PDF Content: ${request.content}

Focus on:
- Key biomarkers and their actual values from the report
- Healthspan implications based on the data
- Actionable lifestyle and supplement recommendations from the findings
- Risk assessment based on actual results
- Trend analysis if multiple measurements are available

Return only the JSON response, no additional text.`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
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
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        
        // Import PDF.js dynamically
        const pdfjsLib = await import('pdfjs-dist');
        
        // Set worker source for PDF.js
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        
        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        
        // Extract text from each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Combine text items from the page
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
          
          fullText += pageText + '\n';
        }
        
        if (!fullText || fullText.trim().length === 0) {
          reject(new Error('No text content found in PDF'));
          return;
        }
        
        resolve(fullText);
      } catch (error) {
        console.error('PDF parsing error:', error);
        reject(new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
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
