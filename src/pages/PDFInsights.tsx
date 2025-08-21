import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Brain, 
  Activity, 
  Target, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  analyzePDFContent, 
  extractTextFromPDF, 
  validatePDFFile,
  type PDFAnalysisResponse 
} from "@/lib/openai-service";

interface PDFReport {
  id: string;
  filename: string;
  platform: string;
  uploadDate: Date;
  status: 'processing' | 'completed' | 'error';
  insights?: ReportInsights;
  pdfContent?: string;
}

interface ReportInsights {
  summary: string;
  keyMetrics: KeyMetric[];
  recommendations: string[];
  riskFactors: string[];
  trends: Trend[];
}

interface KeyMetric {
  name: string;
  value: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  description: string;
}

interface Trend {
  metric: string;
  direction: 'improving' | 'declining' | 'stable';
  change: string;
  period: string;
}

const PDFInsights = () => {
  const [uploadedFiles, setUploadedFiles] = useState<PDFReport[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const platforms = [
    { name: 'NeuroAge', color: 'bg-blue-500', icon: Brain },
    { name: 'Jona Health', color: 'bg-green-500', icon: Activity },
    { name: 'Iollo', color: 'bg-purple-500', icon: Target },
    { name: 'Function Health', color: 'bg-orange-500', icon: TrendingUp },
    { name: 'TokuEyes', color: 'bg-pink-500', icon: Activity },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validatePDFFile(file)) {
      setSelectedFile(file);
    } else if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF file.",
          variant: "destructive",
        });
      } else if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a PDF file smaller than 10MB.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const platform = prompt("Which platform is this report from? (NeuroAge, Jona Health, Iollo, Function Health, TokuEyes)") || "Unknown";
    
    const newReport: PDFReport = {
      id: Date.now().toString(),
      filename: selectedFile.name,
      platform,
      uploadDate: new Date(),
      status: 'processing'
    };

    setUploadedFiles(prev => [newReport, ...prev]);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    await processPDF(newReport);
  };

  const processPDF = async (report: PDFReport) => {
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Step 1: Extract text from PDF
      setProcessingProgress(20);
      const pdfText = await extractTextFromPDF(selectedFile!);
      
      console.log('PDF text extracted:', pdfText.substring(0, 500) + '...');
      console.log('PDF text length:', pdfText.length);
      
      // Step 2: Analyze with OpenAI
      setProcessingProgress(40);
      
      // Check if API key is available
          if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    console.log('API key available:', !!import.meta.env.VITE_GEMINI_API_KEY);
      
      const analysis = await analyzePDFContent({
        content: pdfText,
        platform: report.platform,
        filename: report.filename
      });
      
      // Step 3: Process results
      setProcessingProgress(80);
      
      console.log('Raw OpenAI analysis response:', analysis);
      console.log('Analysis keys:', Object.keys(analysis));
      console.log('Analysis structure:', {
        summary: typeof analysis.summary,
        keyMetrics: Array.isArray(analysis.keyMetrics) ? 'Array' : typeof analysis.keyMetrics,
        recommendations: Array.isArray(analysis.recommendations) ? 'Array' : typeof analysis.recommendations,
        riskFactors: Array.isArray(analysis.riskFactors) ? 'Array' : typeof analysis.riskFactors,
        trends: Array.isArray(analysis.trends) ? 'Array' : typeof analysis.trends,
        trendsValue: analysis.trends
      });
      
      // Convert Gemini response to our internal format with defensive checks
      const insights: ReportInsights = {
        summary: analysis.summary || 'Analysis completed successfully',
        keyMetrics: Array.isArray(analysis.keyMetrics) 
          ? analysis.keyMetrics.map(metric => ({
              name: metric?.name || 'Unknown Metric',
              value: metric?.value || 'N/A',
              status: metric?.status || 'normal',
              description: metric?.description || 'No description available'
            }))
          : [],
        recommendations: Array.isArray(analysis.recommendations) 
          ? analysis.recommendations 
          : ['Continue monitoring your health markers'],
        riskFactors: Array.isArray(analysis.riskFactors) 
          ? analysis.riskFactors 
          : ['No specific risk factors identified'],
        trends: Array.isArray(analysis.trends) 
          ? analysis.trends.map(trend => ({
              metric: trend?.metric || 'Unknown',
              direction: trend?.direction || 'stable',
              change: trend?.change || 'No change',
              period: trend?.period || 'Recent'
            }))
          : []
      };

      setUploadedFiles(prev => 
        prev.map(r => 
          r.id === report.id 
            ? { ...r, status: 'completed', insights, pdfContent: pdfText }
            : r
        )
      );

      setProcessingProgress(100);
      
      toast({
        title: "Analysis Complete!",
        description: `Your ${report.platform} report has been processed with real AI analysis.`,
      });

    } catch (error) {
      console.error('Error processing PDF:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        reportId: report.id,
        platform: report.platform
      });
      
      setUploadedFiles(prev => 
        prev.map(r => 
          r.id === report.id 
            ? { ...r, status: 'error' }
            : r
        )
      );

      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to process PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">PDF Insights</h1>
          <p className="text-slate-600 mt-2">
            Upload your longevity reports and get real AI-powered insights
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New Report
          </CardTitle>
          <CardDescription>
            Upload PDF reports from NeuroAge, Jona Health, Iollo, and other platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pdf-upload">Select PDF File</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
          </div>
          
          {selectedFile && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-800">{selectedFile.name}</span>
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing with AI...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload & Analyze with AI
              </>
            )}
          </Button>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>AI Processing...</span>
                <span>{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
          <CardDescription>
            View AI-generated insights from all your uploaded reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>No reports uploaded yet</p>
              <p className="text-sm">Upload your first PDF to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {uploadedFiles.map((report) => (
                <Card key={report.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{report.filename}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{report.platform}</Badge>
                            <Badge className={getStatusColor(report.status)}>
                              {getStatusIcon(report.status)}
                              <span className="ml-1 capitalize">{report.status}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">
                        {report.uploadDate.toLocaleDateString()}
                      </div>
                    </div>

                    {report.status === 'completed' && report.insights && (
                      <div className="mt-4 space-y-4">
                        {/* PDF Content Preview */}
                        {report.pdfContent && (
                          <div className="mb-4">
                            <details className="group">
                              <summary className="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
                                📄 View PDF Content (Raw Text)
                              </summary>
                              <div className="mt-2 p-3 bg-slate-50 rounded-lg max-h-40 overflow-y-auto">
                                <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono">
                                  {report.pdfContent.substring(0, 500)}...
                                </pre>
                              </div>
                            </details>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">AI Summary</h4>
                          <p className="text-sm text-slate-600">{report.insights.summary}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">Key Metrics</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {report.insights.keyMetrics.map((metric, index) => (
                              <div key={index} className="p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-slate-700">{metric.name}</span>
                                  <Badge 
                                    variant={metric.status === 'normal' ? 'default' : 'secondary'}
                                    className={metric.status === 'critical' ? 'bg-red-100 text-red-800' : ''}
                                  >
                                    {metric.value}
                                  </Badge>
                                </div>
                                <p className="text-xs text-slate-600">{metric.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-slate-800 mb-2">AI Recommendations</h4>
                            <ul className="space-y-1">
                              {report.insights.recommendations.map((rec, index) => (
                                <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-slate-800 mb-2">Risk Factors</h4>
                            <ul className="space-y-1">
                              {report.insights.riskFactors.map((risk, index) => (
                                <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                  {risk}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">Trends</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {report.insights.trends.map((trend, index) => (
                              <div key={index} className="p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-slate-700">{trend.metric}</span>
                                  <Badge 
                                    variant="outline"
                                    className={
                                      trend.direction === 'improving' ? 'bg-green-100 text-green-800' :
                                      trend.direction === 'declining' ? 'bg-red-100 text-red-800' :
                                      'bg-gray-100 text-gray-800'
                                    }
                                  >
                                    {trend.change}
                                  </Badge>
                                </div>
                                <p className="text-xs text-slate-600">
                                  {trend.direction} over {trend.period}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFInsights;
