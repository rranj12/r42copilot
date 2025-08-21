import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Moon, Footprints, Scale, TrendingUp, Brain, Zap } from "lucide-react";
import { getUserData } from "@/lib/user-data";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AppleHealth = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  if (!userData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Apple Health Data</h1>
          <p className="text-slate-600 mb-6">Please complete your profile setup to view your health data.</p>
          <Button onClick={() => navigate('/onboarding')}>
            Complete Setup
          </Button>
        </div>
      </div>
    );
  }

  if (!userData.appleHealthData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Apple Health Data</h1>
          <p className="text-slate-600 mb-6">No Apple Health data uploaded yet.</p>
          <Button onClick={() => navigate('/onboarding')}>
            Upload Apple Health Data
          </Button>
        </div>
      </div>
    );
  }

  const { appleHealthData } = userData;
  const { healthMetrics, recordCount } = appleHealthData;

  const analyzeHealthData = async () => {
    setIsAnalyzing(true);
    
    try {
      // Create a comprehensive health summary for AI analysis
      const healthSummary = {
        totalRecords: recordCount,
        heartRate: {
          count: healthMetrics.heartRate.length,
          recent: healthMetrics.heartRate.slice(-5),
          average: healthMetrics.heartRate.length > 0 
            ? healthMetrics.heartRate.reduce((sum, r) => sum + parseFloat(r.value), 0) / healthMetrics.heartRate.length 
            : 0
        },
        steps: {
          count: healthMetrics.steps.length,
          recent: healthMetrics.steps.slice(-7), // Last 7 days
          total: healthMetrics.steps.reduce((sum, r) => sum + parseInt(r.value), 0)
        },
        sleep: {
          count: healthMetrics.sleep.length,
          recent: healthMetrics.sleep.slice(-7)
        },
        weight: {
          count: healthMetrics.weight.length,
          recent: healthMetrics.weight.slice(-5),
          trend: healthMetrics.weight.length > 1 
            ? healthMetrics.weight[healthMetrics.weight.length - 1].value - healthMetrics.weight[0].value
            : 0
        },
        activity: {
          count: healthMetrics.activity.length,
          recent: healthMetrics.activity.slice(-7),
          total: healthMetrics.activity.reduce((sum, r) => sum + parseFloat(r.value), 0)
        }
      };

      // Simulate AI analysis (in real implementation, this would call your AI service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysis = {
        summary: `Analysis of ${recordCount} health records from Apple Health data`,
        keyMetrics: [
          {
            name: "Heart Rate",
            value: `${healthSummary.heartRate.average.toFixed(1)} BPM`,
            status: healthSummary.heartRate.average > 100 ? 'elevated' : 'normal',
            description: `Average heart rate from ${healthSummary.heartRate.count} measurements`
          },
          {
            name: "Daily Steps",
            value: `${Math.round(healthSummary.steps.total / Math.max(healthSummary.steps.count, 1))} steps`,
            status: 'normal',
            description: `Average daily step count over ${healthSummary.steps.count} days`
          },
          {
            name: "Weight Trend",
            value: healthSummary.weight.trend > 0 ? `+${healthSummary.weight.trend.toFixed(1)} lbs` : `${healthSummary.weight.trend.toFixed(1)} lbs`,
            status: Math.abs(healthSummary.weight.trend) < 2 ? 'stable' : 'elevated',
            description: `Weight change over ${healthSummary.weight.count} measurements`
          }
        ],
        recommendations: [
          "Maintain consistent sleep schedule based on your sleep patterns",
          "Continue regular physical activity to maintain heart health",
          "Monitor weight trends and adjust nutrition accordingly",
          "Consider heart rate variability for stress management"
        ],
        riskFactors: [
          healthSummary.heartRate.average > 100 ? "Elevated resting heart rate - consider stress management" : "Heart rate within normal range",
          healthSummary.steps.total < 10000 ? "Low step count - aim for 10,000+ daily steps" : "Good daily activity level maintained"
        ],
        trends: [
          {
            metric: "Heart Rate",
            direction: healthSummary.heartRate.recent.length > 1 ? 
              (healthSummary.heartRate.recent[healthSummary.heartRate.recent.length - 1].value > healthSummary.heartRate.recent[0].value ? 'declining' : 'improving') : 'stable',
            change: "Recent measurements show trend",
            period: "Last 5 measurements"
          },
          {
            metric: "Activity Level",
            direction: "stable",
            change: "Consistent daily energy burn",
            period: "Weekly average"
          }
        ]
      };

      setAnalysisResults(analysis);
      
      toast({
        title: "Health Analysis Complete!",
        description: "AI has analyzed your Apple Health data and provided insights.",
      });
      
    } catch (error) {
      console.error('Error analyzing health data:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze health data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Apple Health Data</h1>
          <p className="text-slate-600">Comprehensive health insights from your Apple Health export</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/onboarding')}
          className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          Upload New Data
        </Button>
      </div>

      {/* Data Overview */}
      <Card className="bg-white/40 backdrop-blur-sm border-white/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Data Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white/20 rounded-lg border border-white/30">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="font-medium">Heart Rate</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{healthMetrics.heartRate.length}</p>
              <p className="text-sm text-slate-600">measurements</p>
            </div>
            
            <div className="p-4 bg-white/20 rounded-lg border border-white/30">
              <div className="flex items-center space-x-2 mb-2">
                <Footprints className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Steps</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{healthMetrics.steps.length}</p>
              <p className="text-sm text-slate-600">daily records</p>
            </div>
            
            <div className="p-4 bg-white/20 rounded-lg border border-white/30">
              <div className="flex items-center space-x-2 mb-2">
                <Moon className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Sleep</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{healthMetrics.sleep.length}</p>
              <p className="text-sm text-slate-600">sleep records</p>
            </div>
            
            <div className="p-4 bg-white/20 rounded-lg border border-white/30">
              <div className="flex items-center space-x-2 mb-2">
                <Scale className="w-4 h-4 text-green-500" />
                <span className="font-medium">Weight</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{healthMetrics.weight.length}</p>
              <p className="text-sm text-slate-600">measurements</p>
            </div>
            
            <div className="p-4 bg-white/20 rounded-lg border border-white/30">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">Activity</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{healthMetrics.activity.length}</p>
              <p className="text-sm text-slate-600">energy records</p>
            </div>
            
            <div className="p-4 bg-white/20 rounded-lg border border-white/30">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <span className="font-medium">Total Records</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{recordCount}</p>
              <p className="text-sm text-slate-600">health data points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <Card className="bg-white/40 backdrop-blur-sm border-white/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>AI Health Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!analysisResults ? (
            <div className="text-center space-y-4">
              <p className="text-slate-600">
                Get AI-powered insights from your Apple Health data
              </p>
              <Button 
                onClick={analyzeHealthData}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Summary</h3>
                <p className="text-slate-600">{analysisResults.summary}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisResults.keyMetrics.map((metric: any, index: number) => (
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysisResults.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-slate-600 flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Risk Factors</h3>
                  <ul className="space-y-2">
                    {analysisResults.riskFactors.map((risk: string, index: number) => (
                      <li key={index} className="text-slate-600 flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResults.trends.map((trend: any, index: number) => (
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppleHealth;
