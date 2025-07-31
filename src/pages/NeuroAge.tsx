import { useState } from "react";
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
import { getUserName, getUserData } from "@/lib/user-data";
import { 
  getCognitiveChartData, 
  getBrainHealthChartData, 
  getTrendChartData, 
  getOverallScoreData 
} from "@/lib/data-visualization";
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";

const NeuroAge = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const neuroAgeData = userData?.neuroAgeData;

  if (!neuroAgeData) {
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
              <h3 className="text-lg font-semibold text-slate-800">NeuroAge Multi-Modal Analysis</h3>
              <p className="text-sm text-slate-600">Comprehensive cognitive and brain health assessment</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{neuroAgeData.cognitiveScore}</div>
              <div className="text-sm text-slate-600">Cognitive Score</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{neuroAgeData.brainAge}</div>
              <div className="text-sm text-slate-600">Brain Age</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{neuroAgeData.dataQuality}%</div>
              <div className="text-sm text-slate-600">Data Quality</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Cognitive Performance</h3>
          <div className="h-64">
            <Bar 
              data={getCognitiveChartData(neuroAgeData)}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Brain Health Metrics</h3>
          <div className="h-64">
            <Bar 
              data={getBrainHealthChartData(neuroAgeData)}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </Card>
      </div>

      {/* Trends Chart */}
      <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">6-Month Trends</h3>
        <div className="h-64">
          <Line 
            data={getTrendChartData(neuroAgeData)}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
          />
        </div>
      </Card>

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