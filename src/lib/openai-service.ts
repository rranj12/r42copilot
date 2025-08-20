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

export const analyzePDFContent = async (request: PDFAnalysisRequest): Promise<PDFAnalysisResult> => {
  console.log('=== STARTING PDF ANALYSIS ===');
  console.log('Request:', request);
  
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log('API key available:', !!apiKey);
    console.log('API key length:', apiKey ? apiKey.length : 0);
    console.log('API key starts with:', apiKey ? apiKey.substring(0, 10) + '...' : 'NONE');
    
    if (!apiKey) {
      throw new OpenAIError('OpenAI API key not found');
    }
    
    console.log('Making OpenAI API call...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
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

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    console.log('Parsing response JSON...');
    const data = await response.json();
    console.log('OpenAI response:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response format from OpenAI API');
    }
    
    const aiResponse = data.choices[0].message.content;
    console.log('AI response content length:', aiResponse.length);
    console.log('AI response content (first 500 chars):', aiResponse.substring(0, 500));
    console.log('AI response content (last 500 chars):', aiResponse.substring(Math.max(0, aiResponse.length - 500));
    
    try {
      console.log('Attempting to parse AI response as JSON...');
      const parsed = JSON.parse(aiResponse);
      console.log('Successfully parsed JSON:', parsed);
      return parsed;
    } catch (parseError) {
      console.error('=== JSON PARSE ERROR ===');
      console.error('Parse error:', parseError);
      console.error('Raw AI response length:', aiResponse.length);
      console.error('Raw AI response (first 1000 chars):', aiResponse.substring(0, 1000));
      console.error('Raw AI response (last 1000 chars):', aiResponse.substring(Math.max(0, aiResponse.length - 1000));
      
      // Try to find where the JSON might be malformed
      const jsonStart = aiResponse.indexOf('{');
      const jsonEnd = aiResponse.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        const potentialJson = aiResponse.substring(jsonStart, jsonEnd + 1);
        console.error('Potential JSON section:', potentialJson);
        try {
          const parsed = JSON.parse(potentialJson);
          console.log('Successfully parsed potential JSON section:', parsed);
          return parsed;
        } catch (secondError) {
          console.error('Failed to parse potential JSON section:', secondError);
        }
      }
      
      throw new OpenAIError('Invalid response format from OpenAI');
    }

  } catch (error) {
    console.error('=== ERROR IN PDF ANALYSIS ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('Full error object:', error);
    
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
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Smart text extraction with length limits
        let text = '';
        let charCount = 0;
        const maxChars = 50000; // Limit to ~12k tokens (well under OpenAI's limit)
        
        // Look for readable text patterns that are likely to be actual content
        for (let i = 0; i < uint8Array.length && charCount < maxChars; i++) {
          if (uint8Array[i] >= 32 && uint8Array[i] <= 126) { // Printable ASCII
            text += String.fromCharCode(uint8Array[i]);
            charCount++;
          }
        }
        
        // Clean up the text
        text = text
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/[^\x20-\x7E]/g, '') // Remove non-printable characters
          .trim();
        
        // If we have too much text, truncate intelligently
        if (text.length > maxChars) {
          // Try to find a good breaking point (end of sentence or word)
          const truncated = text.substring(0, maxChars);
          const lastPeriod = truncated.lastIndexOf('.');
          const lastSpace = truncated.lastIndexOf(' ');
          
          if (lastPeriod > maxChars * 0.8) {
            text = truncated.substring(0, lastPeriod + 1);
          } else if (lastSpace > maxChars * 0.8) {
            text = truncated.substring(0, lastSpace);
          } else {
            text = truncated;
          }
        }
        
        console.log(`Extracted ${text.length} characters from PDF`);
        
        if (!text || text.length < 100) {
          text = `PDF content extracted from ${file.name}. This PDF contains health and biomarker data that will be analyzed by AI.`;
        }
        
        resolve(text);
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
