import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Brain,
  Download,
  Share2,
  RefreshCw
} from "lucide-react";
import R42Logo from "@/components/ui/r42-logo";
import { getUserName, getUserData, getPDFsByPlatform, clearLocalStorageIfNeeded, isLocalStorageAvailable, forceClearLocalStorage } from "@/lib/user-data";

import { useNavigate } from "react-router-dom";

const NeuroAge = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [neuroAgePDFs, setNeuroAgePDFs] = useState<any[]>([]);
  const [hasNeuroAgeData, setHasNeuroAgeData] = useState(false);
  const [latestNeuroAgePDF, setLatestNeuroAgePDF] = useState<any>(null);
  const [neuroAgeInsights, setNeuroAgeInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Load data on component mount and when component becomes visible
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      try {
        // Check if localStorage needs clearing
        clearLocalStorageIfNeeded();
        
        const data = getUserData();
        setUserData(data);
        
        const pdfs = getPDFsByPlatform('NeuroAge');
        setNeuroAgePDFs(pdfs);
        
        const hasData = pdfs.length > 0;
        setHasNeuroAgeData(hasData);
        
        if (hasData) {
          setLatestNeuroAgePDF(pdfs[0]);
          setNeuroAgeInsights(pdfs[0]?.insights);
        }
      } catch (error) {
        console.error('Error loading NeuroAge data:', error);
        setHasError(true);
        setErrorMessage('Failed to load NeuroAge data. Please try refreshing the page.');
        
        // If there's an error, try to clear localStorage and retry once
        try {
          clearLocalStorageIfNeeded();
          const data = getUserData();
          setUserData(data);
          
          const pdfs = getPDFsByPlatform('NeuroAge');
          setNeuroAgePDFs(pdfs);
          
          const hasData = pdfs.length > 0;
          setHasNeuroAgeData(hasData);
          
          if (hasData) {
            setLatestNeuroAgePDF(pdfs[0]);
            setNeuroAgeInsights(pdfs[0]?.insights);
            setHasError(false); // Clear error if retry succeeds
            setErrorMessage('');
          }
        } catch (retryError) {
          console.error('Retry failed:', retryError);
          setErrorMessage('Unable to load data. Please check your browser storage or try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    
    // Add event listener for when page becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">NeuroAge Reports</h1>
            <p className="text-slate-600 mt-2">Loading your cognitive and brain health analysis...</p>
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto animate-spin">
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Loading NeuroAge Data</h3>
            <p className="text-slate-600">
              Please wait while we load your health data...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Show error state if data loading failed
  if (hasError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">NeuroAge Reports</h1>
            <p className="text-slate-600 mt-2">Error loading your cognitive and brain health analysis</p>
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Error Loading Data</h3>
            <p className="text-slate-600 mb-4">
              {errorMessage}
            </p>
            <div className="flex space-x-3 justify-center">
              <Button 
                onClick={() => {
                  setHasError(false);
                  setErrorMessage('');
                  setIsLoading(true);
                  // Reload data
                  const loadData = () => {
                    try {
                      clearLocalStorageIfNeeded();
                      const data = getUserData();
                      setUserData(data);
                      const pdfs = getPDFsByPlatform('NeuroAge');
                      setNeuroAgePDFs(pdfs);
                      setHasNeuroAgeData(pdfs.length > 0);
                      if (pdfs.length > 0) {
                        setLatestNeuroAgePDF(pdfs[0]);
                        setNeuroAgeInsights(pdfs[0]?.insights);
                      }
                    } catch (error) {
                      console.error('Reload failed:', error);
                      setHasError(true);
                      setErrorMessage('Reload failed. Please try again.');
                    } finally {
                      setIsLoading(false);
                    }
                  };
                  loadData();
                }}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  if (isLocalStorageAvailable()) {
                    forceClearLocalStorage();
                    setErrorMessage('localStorage cleared. Please refresh the page.');
                  } else {
                    setErrorMessage('localStorage not available. Please check your browser settings.');
                  }
                }}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Clear Storage
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/onboarding')}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Go to Onboarding
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!hasNeuroAgeData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">NeuroAge Reports</h1>
            <p className="text-slate-600 mt-2">View your cognitive and brain health analysis</p>
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">No NeuroAge Data Available</h3>
            <p className="text-slate-600">
              Upload your NeuroAge PDF report during onboarding to see detailed visualizations and insights.
            </p>
            <Button 
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              Upload Report
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">NeuroAge Reports</h1>
          <p className="text-slate-600 mt-2">Cognitive and brain health analysis for {getUserName()}</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-white/30 bg-white/20 backdrop-blur-sm"
            onClick={() => {
              setIsLoading(true);
              const data = getUserData();
              setUserData(data);
              const pdfs = getPDFsByPlatform('NeuroAge');
              setNeuroAgePDFs(pdfs);
              setHasNeuroAgeData(pdfs.length > 0);
              if (pdfs.length > 0) {
                setLatestNeuroAgePDF(pdfs[0]);
                setNeuroAgeInsights(pdfs[0]?.insights);
              }
              setIsLoading(false);
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" className="border-white/30 bg-white/20 backdrop-blur-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="border-white/30 bg-white/20 backdrop-blur-sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Report Summary */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <R42Logo size="sm" />
            <div>
                          <h3 className="text-lg font-semibold text-slate-800">NeuroAge Report Analysis</h3>
            <p className="text-sm text-slate-600">AI-powered insights from your uploaded NeuroAge PDF</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {neuroAgeInsights?.keyMetrics?.length || 0}
              </div>
              <div className="text-sm text-slate-600">Key Metrics Found</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {neuroAgeInsights?.recommendations?.length || 0}
              </div>
              <div className="text-sm text-slate-600">AI Recommendations</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {neuroAgeInsights?.riskFactors?.length || 0}
              </div>
              <div className="text-sm text-slate-600">Risk Factors</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Real Data Display */}
      {neuroAgeInsights ? (
        <div className="space-y-6">
          {/* AI Summary */}
          <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">AI Analysis Summary</h3>
            <p className="text-slate-600">{neuroAgeInsights.summary}</p>
          </Card>

          {/* Key Metrics */}
          {neuroAgeInsights.keyMetrics && neuroAgeInsights.keyMetrics.length > 0 && (
            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Metrics from Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {neuroAgeInsights.keyMetrics.map((metric: any, index: number) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-700">{metric.name}</span>
                      <Badge 
                        className={
                          metric.status === 'normal' ? 'bg-green-100 text-green-800' :
                          metric.status === 'elevated' ? 'bg-yellow-100 text-yellow-800' :
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
            </Card>
          )}

          {/* Recommendations */}
          {neuroAgeInsights.recommendations && neuroAgeInsights.recommendations.length > 0 && (
            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {neuroAgeInsights.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{rec}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Risk Factors */}
          {neuroAgeInsights.riskFactors && neuroAgeInsights.riskFactors.length > 0 && (
            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Factors Identified</h3>
              <div className="space-y-3">
                {neuroAgeInsights.riskFactors.map((risk: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{risk}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Trends */}
          {neuroAgeInsights.trends && neuroAgeInsights.trends.length > 0 && (
            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Trends Analysis</h3>
              <div className="space-y-3">
                {neuroAgeInsights.trends.map((trend: any, index: number) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-lg border">
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
                    <p className="text-sm text-slate-600">{trend.change}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Analysis in Progress</h3>
            <p className="text-slate-600">
              Your NeuroAge report is being analyzed by AI. Check back soon for detailed insights.
            </p>
          </div>
        </Card>
      )}

      {/* Overall Score Distribution */}
      <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Overall Score Distribution</h3>
        <div className="h-64 flex justify-center">
          <div className="w-48 h-48">
            <Doughnut 
              data={getOverallScoreData(neuroAgeData)}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
        </div>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Cognitive Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Memory Performance</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Processing Speed</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Attention Span</span>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Moderate</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Executive Function</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Brain Health Markers</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Neural Efficiency</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">Optimal</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Cognitive Flexibility</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Reaction Time</span>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Moderate</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Pattern Recognition</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">AI-Generated Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-slate-800">Cognitive Enhancement</h4>
              <p className="text-sm text-slate-600">Your attention span shows room for improvement. Consider adding Lion's Mane extract and optimizing sleep hygiene.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-medium text-slate-800">Reaction Time Optimization</h4>
              <p className="text-sm text-slate-600">Moderate reaction time suggests cognitive training could be beneficial. Consider brain training exercises and meditation.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-slate-800">Memory Maintenance</h4>
              <p className="text-sm text-slate-600">Excellent memory performance. Maintain current cognitive protocols and consider advanced memory techniques.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NeuroAge; 