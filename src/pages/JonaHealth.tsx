import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, TrendingUp, Target, Heart, Brain, Zap } from "lucide-react";
import { getUserData } from "@/lib/user-data";
import { useNavigate } from "react-router-dom";

const JonaHealth = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
  }, []);

  if (!userData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Jona Health Reports</h1>
          <p className="text-slate-600 mb-6">Please complete your profile setup to view your reports.</p>
          <Button onClick={() => navigate('/onboarding')}>
            Complete Setup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Jona Health Reports</h1>
          <p className="text-slate-600">Comprehensive health optimization insights and biomarker analysis</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/onboarding')}
          className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          Upload New Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/40 backdrop-blur-sm border-white/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Cardiovascular Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Overall Score</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>
                  </div>
                  <Progress value={85} className="w-full h-2" />
                  <p className="text-xs text-slate-500">Based on latest Jona Health assessment</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-sm border-white/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  <span>Cognitive Function</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Overall Score</span>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good</Badge>
                  </div>
                  <Progress value={72} className="w-full h-2" />
                  <p className="text-xs text-slate-500">Based on latest Jona Health assessment</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-sm border-white/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>Energy & Vitality</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Overall Score</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Moderate</Badge>
                  </div>
                  <Progress value={65} className="w-full h-2" />
                  <p className="text-xs text-slate-500">Based on latest Jona Health assessment</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/40 backdrop-blur-sm border-white/30">
            <CardHeader>
              <CardTitle>Recent Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-lg border border-green-200/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-800">Cardiovascular markers are optimal</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Excellent</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-blue-800">Cognitive biomarkers show improvement</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50/50 rounded-lg border border-yellow-200/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-yellow-800">Energy markers need attention</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Moderate</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biomarkers" className="space-y-6">
          <Card className="bg-white/40 backdrop-blur-sm border-white/30">
            <CardHeader>
              <CardTitle>Key Biomarkers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/20 rounded-lg border border-white/30">
                    <h4 className="font-medium text-slate-800 mb-2">Inflammatory Markers</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">CRP</span>
                        <span className="text-sm font-medium">0.8 mg/L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">ESR</span>
                        <span className="text-sm font-medium">12 mm/hr</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/20 rounded-lg border border-white/30">
                    <h4 className="font-medium text-slate-800 mb-2">Metabolic Markers</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">HbA1c</span>
                        <span className="text-sm font-medium">5.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Fasting Glucose</span>
                        <span className="text-sm font-medium">85 mg/dL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="bg-white/40 backdrop-blur-sm border-white/30">
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
                  <h4 className="font-medium text-blue-800 mb-2">Positive Trends</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Inflammatory markers are within optimal range</li>
                    <li>• Metabolic health shows excellent control</li>
                    <li>• Cardiovascular biomarkers indicate good health</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50/50 rounded-lg border border-yellow-200/30">
                  <h4 className="font-medium text-yellow-800 mb-2">Areas for Improvement</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Energy markers could be optimized</li>
                    <li>• Consider additional micronutrient testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="bg-white/40 backdrop-blur-sm border-white/30">
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-200/30">
                  <h4 className="font-medium text-green-800 mb-2">Lifestyle Recommendations</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Continue current exercise routine (excellent cardiovascular health)</li>
                    <li>• Maintain Mediterranean-style diet</li>
                    <li>• Prioritize 7-8 hours of quality sleep</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
                  <h4 className="font-medium text-blue-800 mb-2">Supplement Considerations</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Vitamin D3 (if levels are below optimal)</li>
                    <li>• Omega-3 fatty acids for cognitive support</li>
                    <li>• Consider magnesium for energy optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JonaHealth;
