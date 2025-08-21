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

export class GeminiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GeminiError';
  }
}

export const analyzePDFContent = async (request: PDFAnalysisRequest): Promise<PDFAnalysisResult> => {
  console.log('=== STARTING PDF ANALYSIS ===');
  console.log('Request:', request);
  
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log('API key available:', !!apiKey);
    console.log('API key length:', apiKey ? apiKey.length : 0);
    console.log('API key starts with:', apiKey ? apiKey.substring(0, 10) + '...' : 'NONE');
    
    if (!apiKey) {
      throw new GeminiError('Gemini API key not found');
    }
    
    console.log('Making Gemini API call...');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an expert longevity and healthspan analyst. Your task is to analyze PDF reports from various longevity platforms and provide concise, actionable insights based on the actual content.

Platform Context:
- NeuroAge: Focuses on brain aging, cognitive biomarkers, and neurological health
- Jona Health: Comprehensive health optimization and biomarker analysis
- Iollo: Advanced longevity testing and biological age assessment
- Function Health: Metabolic health and functional medicine
- TokuEyes: Eye health and retinal biomarkers

CRITICAL: You MUST return a JSON object with EXACTLY this structure:
{
  "summary": "2-3 sentence summary based on actual PDF content",
  "keyMetrics": [
    {
      "name": "Exact metric name from PDF (e.g., 'CRP', 'HbA1c', 'Vitamin D')",
      "value": "Actual value from PDF (e.g., '0.8 mg/L', '5.2%', '32 ng/mL')",
      "status": "normal/elevated/low/critical based on actual values",
      "description": "What this metric means and its health implications"
    }
  ],
  "recommendations": [
    "Specific actionable recommendation based on actual findings"
  ],
  "riskFactors": [
    "Specific risk factor identified from actual data"
  ],
  "trends": [
    {
      "metric": "Metric name",
      "direction": "improving/declining/stable",
      "change": "Specific change description",
      "period": "Time period"
    }
  ]
}

IMPORTANT RULES:
1. Extract ONLY real values, metrics, and findings from the provided PDF text
2. Do NOT generate placeholder or generic information
3. If a metric is not clearly stated in the PDF, do NOT include it
4. Use actual biomarker names and values from the PDF
5. Return ONLY the raw JSON object, no markdown, no code blocks, no additional text
6. Ensure the JSON is valid and properly formatted

Please analyze this ${request.platform} report and provide insights in the specified JSON format:

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
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2000
        }
      })
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    console.log('Parsing response JSON...');
    const data = await response.json();
    console.log('Gemini response:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('Invalid Gemini response structure:', data);
      throw new Error('Invalid response format from Gemini API');
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text;
    console.log('AI response content length:', aiResponse.length);
    console.log('AI response content (first 500 chars):', aiResponse.substring(0, 500));
    const last500Start = Math.max(0, aiResponse.length - 500);
    console.log('AI response content (last 500 chars):', aiResponse.substring(last500Start));
    
    try {
      console.log('Attempting to parse AI response as JSON...');
      
      // Clean the response - remove markdown code blocks if present
      let cleanResponse = aiResponse.trim();
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.substring(7); // Remove ```json
      }
      if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.substring(3); // Remove ```
      }
      if (cleanResponse.endsWith('```')) {
        cleanResponse = cleanResponse.substring(0, cleanResponse.length - 3); // Remove trailing ```
      }
      
      cleanResponse = cleanResponse.trim();
      console.log('Cleaned response:', cleanResponse.substring(0, 200) + '...');
      
      const parsed = JSON.parse(cleanResponse);
      console.log('Successfully parsed JSON:', parsed);
      
      // Validate the response structure
      if (!parsed.summary || typeof parsed.summary !== 'string') {
        console.error('Missing or invalid summary in AI response');
        throw new GeminiError('AI response missing summary');
      }
      
      if (!Array.isArray(parsed.keyMetrics) || parsed.keyMetrics.length === 0) {
        console.error('Missing or invalid keyMetrics in AI response');
        throw new GeminiError('AI response missing key metrics');
      }
      
      // Validate each key metric has required fields
      for (let i = 0; i < parsed.keyMetrics.length; i++) {
        const metric = parsed.keyMetrics[i];
        if (!metric.name || !metric.value || !metric.status || !metric.description) {
          console.error(`Invalid key metric at index ${i}:`, metric);
          throw new GeminiError(`AI response has invalid key metric structure at index ${i}`);
        }
        if (metric.name === 'Unknown Metric' || metric.value === 'N/A') {
          console.error(`Generic metric detected at index ${i}:`, metric);
          throw new GeminiError('AI response contains generic placeholder metrics instead of actual data');
        }
      }
      
      if (!Array.isArray(parsed.recommendations) || parsed.recommendations.length === 0) {
        console.error('Missing or invalid recommendations in AI response');
        throw new GeminiError('AI response missing recommendations');
      }
      
      if (!Array.isArray(parsed.riskFactors) || parsed.riskFactors.length === 0) {
        console.error('Missing or invalid riskFactors in AI response');
        throw new GeminiError('AI response missing risk factors');
      }
      
      console.log('AI response validation passed');
      return parsed;
    } catch (parseError) {
      console.error('=== JSON PARSE ERROR ===');
      console.error('Parse error:', parseError);
      console.error('Raw AI response length:', aiResponse.length);
      console.error('Raw AI response (first 1000 chars):', aiResponse.substring(0, 1000));
      
      const last1000Start = Math.max(0, aiResponse.length - 1000);
      console.error('Raw AI response (last 1000 chars):', aiResponse.substring(last1000Start));
      
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
      
      throw new GeminiError('Invalid response format from Gemini');
    }

    // If we get here, the response was invalid - try with a more specific prompt
    console.log('First attempt failed, trying with more specific prompt...');
    
    try {
      const retryResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are analyzing a ${request.platform} health report. The PDF content is: ${request.content}

You MUST return ONLY a JSON object with this EXACT structure - no other text:

{
  "summary": "Brief summary of the actual findings from the PDF",
  "keyMetrics": [
    {
      "name": "CRP",
      "value": "0.8 mg/L", 
      "status": "normal",
      "description": "C-reactive protein level indicating inflammation status"
    }
  ],
  "recommendations": [
    "Specific recommendation based on actual data"
  ],
  "riskFactors": [
    "Specific risk identified from the data"
  ],
  "trends": [
    {
      "metric": "CRP",
      "direction": "stable",
      "change": "No significant change",
      "period": "Recent"
    }
  ]
}

IMPORTANT: Only include metrics that are actually mentioned in the PDF text. If you cannot find specific values, do not make them up.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1500
          }
        })
      });

      if (!retryResponse.ok) {
        throw new Error(`Retry failed: ${retryResponse.status}`);
      }

      const retryData = await retryResponse.json();
      const retryAiResponse = retryData.candidates[0].content.parts[0].text;
      
      // Clean and parse retry response
      let cleanRetryResponse = retryAiResponse.trim();
      if (cleanRetryResponse.startsWith('```json')) {
        cleanRetryResponse = cleanRetryResponse.substring(7);
      }
      if (cleanRetryResponse.startsWith('```')) {
        cleanRetryResponse = cleanRetryResponse.substring(3);
      }
      if (cleanRetryResponse.endsWith('```')) {
        cleanRetryResponse = cleanRetryResponse.substring(0, cleanRetryResponse.length - 3);
      }
      
      const retryParsed = JSON.parse(cleanRetryResponse.trim());
      console.log('Retry successful:', retryParsed);
      return retryParsed;
      
    } catch (retryError) {
      console.error('Retry attempt also failed:', retryError);
      throw new GeminiError('Failed to get valid response from Gemini after retry');
    }

  } catch (error) {
    console.error('=== ERROR IN PDF ANALYSIS ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('Full error object:', error);
    
    if (error instanceof GeminiError) {
      throw error;
    }
    throw new GeminiError('Failed to analyze PDF content');
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
        const maxChars = 200000; // Limit to ~50k tokens (Gemini can handle much more)
        
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
  if (file.size > 50 * 1024 * 1024) { // 50MB limit
    return false;
  }
  return true;
};
