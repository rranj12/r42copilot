import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
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
} from 'chart.js';
import { 
  Download, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Heart,
  Zap,
  Target
} from 'lucide-react';
import { getUserData, getUserName } from '../lib/user-data';
import { generateIolloData, getMetabolicChartData, getInflammationChartData, getOxidativeStressChartData, getMitochondrialChartData, getOverallScoreData } from '../lib/data-visualization';

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

const Iollo = () => {
  const userData = getUserData();
  const userName = getUserName();
  const iolloData = userData.iolloData;

  const handleExportReport = () => {
    // In a real app, this would generate and download a PDF report
    console.log('Exporting Iollo report...');
  };

  const handleShare = () => {
    // In a real app, this would share the report
    console.log('Sharing Iollo report...');
  };

  if (!iolloData) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Iollo Metabolic Report</h1>
            <p className="text-slate-600 mb-6">
              Upload your Iollo biomarker data to see detailed metabolic insights and recommendations.
            </p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Iollo Metabolic Report</h1>
              <p className="text-slate-600">Comprehensive biomarker analysis for {userName}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExportReport}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Report Generated: {new Date().toLocaleDateString()}
          </Badge>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Metabolic Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{iolloData.metabolicScore}%</div>
              <Progress value={iolloData.metabolicScore} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Inflammation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{iolloData.inflammationScore}%</div>
              <Progress value={iolloData.inflammationScore} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Oxidative Stress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{iolloData.oxidativeStressScore}%</div>
              <Progress value={iolloData.oxidativeStressScore} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Mitochondrial Function</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{iolloData.mitochondrialScore}%</div>
              <Progress value={iolloData.mitochondrialScore} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Metabolic Health Overview
              </CardTitle>
              <CardDescription>Key metabolic biomarkers and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={getMetabolicChartData(iolloData)} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false }
                },
                scales: {
                  y: { beginAtZero: true, max: 100 }
                }
              }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Inflammation Markers
              </CardTitle>
              <CardDescription>Inflammatory biomarker levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={getInflammationChartData(iolloData)} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false }
                },
                scales: {
                  y: { beginAtZero: true, max: 100 }
                }
              }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Oxidative Stress Analysis
              </CardTitle>
              <CardDescription>Free radical damage and antioxidant status</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={getOxidativeStressChartData(iolloData)} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false }
                },
                scales: {
                  y: { beginAtZero: true, max: 100 }
                }
              }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Mitochondrial Function
              </CardTitle>
              <CardDescription>Energy production and cellular health</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={getMitochondrialChartData(iolloData)} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false }
                },
                scales: {
                  y: { beginAtZero: true, max: 100 }
                }
              }} />
            </CardContent>
          </Card>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overall Biomarker Health Score</CardTitle>
            <CardDescription>Comprehensive assessment of your metabolic health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <Doughnut data={getOverallScoreData(iolloData)} options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: false }
                  }
                }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800">{iolloData.overallScore}%</div>
                    <div className="text-sm text-slate-600">Health Score</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {iolloData.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    insight.type === 'positive' ? 'bg-green-500' : 
                    insight.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <h4 className="font-semibold text-slate-800">{insight.title}</h4>
                    <p className="text-sm text-slate-600">{insight.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {iolloData.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                    <p className="text-sm text-slate-600">{rec.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Iollo; 