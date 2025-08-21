import { useState, useRef, useEffect } from "react";
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
import { getUserData, updatePDFInsights, hasUploadedPDFs, getUploadedPDFsCount } from "@/lib/user-data";
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
  status: 'ready' | 'processing' | 'completed' | 'error';
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedReport, setSelectedReport] = useState<PDFReport | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing PDFs from user data
  useEffect(() => {
    const userData = getUserData();
    if (hasUploadedPDFs()) {
      const existingPDFs: PDFReport[] = userData!.uploadedPDFs!.map(pdf => ({
        id: pdf.id,
        filename: pdf.filename,
        platform: pdf.platform,
        uploadDate: new Date(pdf.uploadDate),
        status: pdf.insights ? 'completed' : 'ready',
        pdfContent: pdf.content,
        insights: pdf.insights
      }));
      setUploadedFiles(existingPDFs);
      console.log(`Loaded ${getUploadedPDFsCount()} PDFs from user data`);
    } else {
      console.log('No uploaded PDFs found in user data');
    }
  }, []);

  // Function to analyze existing PDFs from setup
  const analyzeExistingPDF = async (file: PDFReport) => {
    if (!file.pdfContent) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      setProcessingProgress(20);
      
      // Update status to processing
      setUploadedFiles(prev => 
        prev.map(f => f.id === file.id ? { ...f, status: 'processing' } : f)
      );
      
      setProcessingProgress(40);
      
      const analysis = await analyzePDFContent({
        content: file.pdfContent,
        platform: file.platform,
        filename: file.filename
      });
      
      setProcessingProgress(80);
      
      // Convert Gemini response to our internal format
      console.log('Raw AI analysis response:', analysis);
      console.log('Analysis structure:', {
        summary: typeof analysis.summary,
        keyMetrics: Array.isArray(analysis.keyMetrics) ? analysis.keyMetrics.length : typeof analysis.keyMetrics,
        recommendations: Array.isArray(analysis.recommendations) ? analysis.recommendations.length : typeof analysis.recommendations,
        riskFactors: Array.isArray(analysis.riskFactors) ? analysis.riskFactors.length : typeof analysis.riskFactors,
        trends: Array.isArray(analysis.trends) ? analysis.trends.length : typeof analysis.trends
      });

      const insights: ReportInsights = {
        summary: analysis.summary || 'Analysis completed successfully',
        keyMetrics: Array.isArray(analysis.keyMetrics) && analysis.keyMetrics.length > 0
          ? analysis.keyMetrics.filter(metric => metric && metric.name && metric.value).map(metric => ({
              name: metric.name,
              value: metric.value,
              status: metric.status || 'normal',
              description: metric.description || 'No description available'
            }))
          : [],
        recommendations: Array.isArray(analysis.recommendations) && analysis.recommendations.length > 0
          ? analysis.recommendations.filter(rec => rec && rec.trim().length > 0)
          : ['Continue monitoring your health markers'],
        riskFactors: Array.isArray(analysis.riskFactors) && analysis.riskFactors.length > 0
          ? analysis.riskFactors.filter(risk => risk && risk.trim().length > 0)
          : ['No specific risk factors identified'],
        trends: Array.isArray(analysis.trends) && analysis.trends.length > 0
          ? analysis.trends.filter(trend => trend && trend.metric).map(trend => ({
              metric: trend.metric,
              direction: trend.direction || 'stable',
              change: trend.change || 'No change',
              period: trend.period || 'Recent'
            }))
          : []
      };

      console.log('Processed insights:', insights);
      console.log('Insights structure:', {
        summary: insights.summary,
        keyMetricsCount: insights.keyMetrics.length,
        recommendationsCount: insights.recommendations.length,
        riskFactorsCount: insights.riskFactors.length,
        trendsCount: insights.trends.length
      });

      // If all sections are empty, create fallback insights
      if (insights.keyMetrics.length === 0 && insights.recommendations.length === 0 && insights.riskFactors.length === 0) {
        console.log('All sections empty, creating fallback insights');
        insights.keyMetrics = [
          {
            name: 'PDF Analysis',
            value: 'Completed',
            status: 'normal',
            description: 'AI analysis completed but no specific metrics found in the PDF content'
          }
        ];
        insights.recommendations = [
          'The PDF has been analyzed but contains limited structured data',
          'Consider uploading a more detailed health report for comprehensive insights'
        ];
        insights.riskFactors = [
          'Unable to identify specific risk factors from the provided content'
        ];
      }
      
      setProcessingProgress(100);
      
      // Update the file with insights
      setUploadedFiles(prev => 
        prev.map(f => f.id === file.id ? { ...f, status: 'completed', insights } : f)
      );

      // Also update the global user data store
      updatePDFInsights(file.id, insights);
      
      toast({
        title: "Analysis Complete!",
        description: `${file.filename} has been analyzed with AI insights.`,
      });
      
    } catch (error) {
      console.error('Error analyzing existing PDF:', error);
      
      // Mark as error
      setUploadedFiles(prev => 
        prev.map(f => f.id === file.id ? { ...f, status: 'error' } : f)
      );
      
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const platforms = [
    { name: 'NeuroAge', color: 'bg-blue-500', icon: Brain },
    { name: 'Jona Health', color: 'bg-green-500', icon: Activity },
    { name: 'Iollo', color: 'bg-purple-500', icon: Target },
    { name: 'Function Health', color: 'bg-orange-500', icon: TrendingUp },
    { name: 'TokuEyes', color: 'bg-pink-500', icon: Activity },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    
    files.forEach(file => {
      if (validatePDFFile(file)) {
        validFiles.push(file);
      } else {
        if (file.type !== 'application/pdf') {
          invalidFiles.push(`${file.name}: Invalid file type`);
        } else if (file.size > 50 * 1024 * 1024) {
          invalidFiles.push(`${file.name}: File too large (>50MB)`);
        }
      }
    });
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      if (invalidFiles.length > 0) {
        toast({
          title: "Some files were invalid",
          description: invalidFiles.join(', '),
          variant: "destructive",
        });
      }
    } else if (invalidFiles.length > 0) {
      toast({
        title: "No valid files selected",
        description: invalidFiles.join(', '),
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const platform = prompt("Which platform are these reports from? (NeuroAge, Jona Health, Iollo, Function Health, TokuEyes)") || "Unknown";
    
    // Create reports for all selected files
    const reports: PDFReport[] = selectedFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      filename: file.name,
      platform,
      uploadDate: new Date(),
      status: 'processing'
    }));

    setUploadedFiles(prev => [...prev, ...reports]);
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';

    await processMultiplePDFs(reports);
  };

  const processMultiplePDFs = async (reports: PDFReport[]) => {
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Step 1: Extract text from all PDFs
      setProcessingProgress(20);
      const pdfTexts = await Promise.all(
        selectedFiles.map(file => extractTextFromPDF(file))
      );
      
      console.log(`Processing ${selectedFiles.length} PDFs`);
      pdfTexts.forEach((text, index) => {
        console.log(`PDF ${index + 1} text length:`, text.length);
      });
      
      // Step 2: Combine all PDF content for comprehensive analysis
      const combinedContent = pdfTexts.map((text, index) => 
        `=== ${selectedFiles[index].name} ===\n${text}\n\n`
      ).join('');
      
      console.log('Combined content length:', combinedContent.length);
      
      // Step 3: Analyze with Gemini
      setProcessingProgress(40);
      
      // Check if API key is available
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
      }

      console.log('API key available:', !!import.meta.env.VITE_GEMINI_API_KEY);
      
      const analysis = await analyzePDFContent({
        content: combinedContent,
        platform: reports[0].platform,
        filename: `${selectedFiles.length} reports combined`
      });
      
      // Step 4: Process results
      setProcessingProgress(80);
      
      console.log('Raw Gemini analysis response:', analysis);
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

      // Update all reports with the same insights
      setUploadedFiles(prev => 
        prev.map(r => 
          reports.some(report => report.id === r.id)
            ? { ...r, status: 'completed', insights, pdfContent: pdfTexts[reports.findIndex(report => report.id === r.id)] }
            : r
        )
      );

      setProcessingProgress(100);
      
      toast({
        title: "Analysis Complete!",
        description: `Your ${selectedFiles.length} ${reports[0].platform} reports have been processed with comprehensive AI analysis.`,
      });

    } catch (error) {
      console.error('Error processing PDFs:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        reportIds: reports.map(r => r.id),
        platform: reports[0].platform
      });
      
      // Mark all reports as failed
      setUploadedFiles(prev => 
        prev.map(r => 
          reports.some(report => report.id === r.id)
            ? { ...r, status: 'error' }
            : r
        )
      );

      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to process PDFs. Please try again.",
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
            AI-powered analysis of your uploaded longevity reports
          </p>
        </div>
      </div>

      {/* Existing PDFs from Setup */}
      {uploadedFiles.length > 0 && (
        <Card className="bg-white/40 backdrop-blur-sm border-white/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Reports from Setup</span>
            </CardTitle>
            <CardDescription>
              These PDFs were uploaded during your profile setup and are ready for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-white/20 rounded-lg border border-white/30">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-slate-800">{file.filename}</p>
                      <p className="text-sm text-slate-600">{file.platform} • {file.uploadDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'completed' && file.insights ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">Analyzed</Badge>
                    ) : file.status === 'ready' ? (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Ready for Analysis</Badge>
                    ) : file.status === 'processing' ? (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Processing...</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (file.status === 'ready' || !file.insights) {
                          // Trigger AI analysis for this PDF
                          analyzeExistingPDF(file);
                        } else if (file.status === 'completed' && file.insights) {
                          // Show insights modal
                          setSelectedReport(file);
                        }
                      }}
                      disabled={file.status === 'processing'}
                    >
                      {file.status === 'processing' ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : file.status === 'completed' && file.insights ? (
                        'View Insights'
                      ) : (
                        'Analyze with AI'
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
            <Label htmlFor="pdf-upload">Select PDF Files (Multiple)</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
          </div>
          
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-800">{file.name}</span>
                </div>
              ))}
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={selectedFiles.length === 0 || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing {selectedFiles.length} PDFs with AI...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload & Analyze {selectedFiles.length > 0 ? `${selectedFiles.length} PDFs` : 'PDFs'} with AI
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

      {/* Insights Modal */}
      {selectedReport && selectedReport.insights && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedReport.filename}</h2>
                  <p className="text-slate-600">{selectedReport.platform} • {selectedReport.uploadDate.toLocaleDateString()}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedReport(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Debug Section */}
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Debug: Raw Insights Data</h3>
                  <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                    {JSON.stringify(selectedReport.insights, null, 2)}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Summary</h3>
                  <p className="text-slate-600">{selectedReport.insights.summary}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Metrics</h3>
                  {selectedReport.insights.keyMetrics && selectedReport.insights.keyMetrics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedReport.insights.keyMetrics.map((metric, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-700">{metric.name}</span>
                            <Badge 
                              className={
                                metric.status === 'normal' ? 'bg-green-100 text-green-800' :
                                metric.status === 'elevated' ? 'bg-yellow-100 text-yellow-800' :
                                metric.status === 'low' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {metric.value}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{metric.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-yellow-800">No key metrics found in the analysis.</p>
                      <p className="text-sm text-yellow-700 mt-1">Debug info: {JSON.stringify(selectedReport.insights.keyMetrics)}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Recommendations</h3>
                    {selectedReport.insights.recommendations && selectedReport.insights.recommendations.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedReport.insights.recommendations.map((rec, index) => (
                          <li key={index} className="text-slate-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-yellow-800">No recommendations found in the analysis.</p>
                        <p className="text-sm text-yellow-700 mt-1">Debug info: {JSON.stringify(selectedReport.insights.recommendations)}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Risk Factors</h3>
                    {selectedReport.insights.riskFactors && selectedReport.insights.riskFactors.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedReport.insights.riskFactors.map((risk, index) => (
                          <li key={index} className="text-slate-600 flex items-start gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-yellow-800">No risk factors found in the analysis.</p>
                        <p className="text-sm text-yellow-700 mt-1">Debug info: {JSON.stringify(selectedReport.insights.riskFactors)}</p>
                      </div>
                      )}
                  </div>
                </div>

                {selectedReport.insights.trends.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Trends</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedReport.insights.trends.map((trend, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-slate-700">{trend.metric}</span>
                            <Badge 
                              className={
                                trend.direction === 'improving' ? 'bg-green-100 text-green-800' :
                                trend.direction === 'declining' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }
                            >
                              {trend.direction}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            {trend.change} over {trend.period}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFInsights;
