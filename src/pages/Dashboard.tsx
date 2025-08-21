
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
  ArrowUpRight,
  Activity,
  Target,
  Zap,
  Heart,
  Brain
} from "lucide-react";
import R42Logo from "@/components/ui/r42-logo";
import { getUserName } from "@/lib/user-data";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Welcome back, {getUserName()}!</h1>
            <p className="text-slate-600 mt-2">Here's your health overview for today</p>
          </div>
          <Button 
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Update Profile
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/40 backdrop-blur-sm border-white/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Health Score</p>
                  <p className="text-2xl font-bold text-slate-800">87</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={87} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">+3 from last week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-white/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Biomarkers</p>
                  <p className="text-2xl font-bold text-slate-800">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-500">4 new this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-white/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Recommendations</p>
                  <p className="text-2xl font-bold text-slate-800">8</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-500">3 actionable</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-white/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Progress</p>
                  <p className="text-2xl font-bold text-slate-800">92%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={92} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">On track</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Actions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Health Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>Cognitive Enhancement Opportunity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                    <Button 
                      variant="outline" 
                      className="w-full border-white/30 bg-white/20 backdrop-blur-sm"
                      onClick={() => navigate('/neuroage')}
                    >
                      View NeuroAge Report
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">NeuroAge report uploaded</span>
                      <span className="text-xs text-slate-500">2 days ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Biomarker data synced</span>
                      <span className="text-xs text-slate-500">1 week ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">New recommendations generated</span>
                      <span className="text-xs text-slate-500">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="biomarkers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Biomarker Data</h2>
              <Button 
                variant="outline" 
                className="border-white/30 bg-white/20 backdrop-blur-sm"
                onClick={() => navigate('/onboarding')}
              >
                Add Biomarkers
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <R42Logo size="sm" />
                    <div>
                      <h3 className="font-semibold text-slate-800">NeuroAge</h3>
                      <p className="text-sm text-slate-600">Cognitive Assessment</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Status</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Uploaded</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Last Updated</span>
                      <span className="text-sm text-slate-600">2 days ago</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 border-white/30 bg-white/20 backdrop-blur-sm"
                    onClick={() => navigate('/neuroage')}
                  >
                    View Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">J</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Jona Health</h3>
                      <p className="text-sm text-slate-600">Comprehensive Health Optimization</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Status</span>
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Not Uploaded</Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 border-white/30 bg-white/20 backdrop-blur-sm"
                    onClick={() => navigate('/onboarding')}
                  >
                    Upload Results
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">

                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Status</span>
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Not Uploaded</Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 border-white/30 bg-white/20 backdrop-blur-sm"
                    onClick={() => navigate('/onboarding')}
                  >
                    Upload Results
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Health Insights</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>Cognitive Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Memory</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Processing Speed</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={72} className="w-20 h-2" />
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Attention</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={68} className="w-20 h-2" />
                        <span className="text-sm font-medium">68%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-slate-800">Cognitive Enhancement</h4>
                        <p className="text-sm text-slate-600">Consider Lion's Mane extract for memory support</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-slate-800">Attention Focus</h4>
                        <p className="text-sm text-slate-600">Practice mindfulness meditation daily</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Recommended Actions</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>High Priority</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-slate-800">Upload Additional Biomarkers</h4>
                        <p className="text-sm text-slate-600">Complete your health profile with Jona Health and other diagnostic data</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 border-blue-300 bg-blue-50"
                          onClick={() => navigate('/onboarding')}
                        >
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Progress Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-slate-800">Monitor Cognitive Health</h4>
                        <p className="text-sm text-slate-600">Track your NeuroAge progress over time</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 border-green-300 bg-green-50"
                          onClick={() => navigate('/neuroage')}
                        >
                          View Reports
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Progress Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>Health Score Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Current Score</span>
                      <span className="text-lg font-bold text-slate-800">87</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Target Score</span>
                      <span className="text-lg font-bold text-slate-800">95</span>
                    </div>
                    <Progress value={87} className="h-3" />
                    <p className="text-xs text-slate-500">+3 points this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>Completion Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Profile Setup</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Biomarker Uploads</span>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Partial</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Recommendations</span>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
