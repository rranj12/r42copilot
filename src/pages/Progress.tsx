
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  Download,
  Share,
  Trophy,
  Zap
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Progress = () => {
  // Sample progress data
  const healthScoreHistory = [
    { date: "Jan 2024", score: 74, change: 0 },
    { date: "Feb 2024", score: 76, change: 2 },
    { date: "Mar 2024", score: 78, change: 2 },
    { date: "Apr 2024", score: 80, change: 2 },
    { date: "May 2024", score: 82, change: 2 },
    { date: "Jun 2024", score: 82, change: 0 },
  ];

  const biomarkerTrends = [
    {
      name: "HbA1c",
      unit: "%",
      data: [
        { date: "Jan", value: 5.8, status: "elevated" },
        { date: "Mar", value: 5.5, status: "moderate" },
        { date: "May", value: 5.2, status: "optimal" },
      ],
      improvement: -0.6,
      trend: "improving"
    },
    {
      name: "VO2 Max",
      unit: "ml/kg/min",
      data: [
        { date: "Jan", value: 48.2, status: "good" },
        { date: "Mar", value: 50.1, status: "good" },
        { date: "May", value: 52.3, status: "excellent" },
      ],
      improvement: 4.1,
      trend: "improving"
    },
    {
      name: "Sleep Quality",
      unit: "%",
      data: [
        { date: "Jan", value: 73, status: "moderate" },
        { date: "Mar", value: 79, status: "good" },
        { date: "May", value: 85, status: "good" },
      ],
      improvement: 12,
      trend: "improving"
    },
    {
      name: "Inflammation (CRP)",
      unit: "mg/L",
      data: [
        { date: "Jan", value: 0.6, status: "optimal" },
        { date: "Mar", value: 0.8, status: "elevated" },
        { date: "May", value: 0.8, status: "elevated" },
      ],
      improvement: 0.2,
      trend: "worsening"
    }
  ];

  const achievements = [
    {
      title: "Metabolic Optimization",
      description: "HbA1c improved to optimal range",
      date: "May 2024",
      category: "Biomarker",
      impact: "High"
    },
    {
      title: "Cardiovascular Excellence",
      description: "VO2 Max reached excellent category",
      date: "May 2024",
      category: "Fitness",
      impact: "High"
    },
    {
      title: "Sleep Master",
      description: "Consistent 85%+ sleep quality for 30 days",
      date: "April 2024",
      category: "Recovery",
      impact: "Medium"
    },
    {
      title: "Protocol Adherence",
      description: "95% supplement adherence for 60 days",
      date: "March 2024",
      category: "Lifestyle",
      impact: "Medium"
    }
  ];

  const goals = [
    {
      title: "Reduce Inflammatory Markers",
      target: "CRP < 0.5 mg/L",
      current: "0.8 mg/L",
      progress: 25,
      deadline: "Aug 2024",
      status: "on-track"
    },
    {
      title: "Improve Cognitive Performance",
      target: "Memory test score > 90%",
      current: "85%",
      progress: 85,
      deadline: "Jul 2024",
      status: "ahead"
    },
    {
      title: "Optimize Body Composition",
      target: "12% body fat",
      current: "14.2%",
      progress: 67,
      deadline: "Sep 2024",
      status: "on-track"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
      case "excellent":
        return "text-green-600 bg-green-50";
      case "good":
        return "text-blue-600 bg-blue-50";
      case "moderate":
        return "text-yellow-600 bg-yellow-50";
      case "elevated":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendColor = (trend: string) => {
    return trend === "improving" ? "text-green-600" : "text-red-600";
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case "ahead":
        return "bg-green-500";
      case "on-track":
        return "bg-blue-500";
      case "behind":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Progress Tracking</h1>
              <p className="text-green-100 text-lg">
                Monitor your longevity journey and celebrate achievements
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Share className="w-4 h-4 mr-2" />
                Share Progress
              </Button>
            </div>
          </div>
        </div>

        {/* Health Score Trend */}
        <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Health Score Trend</h2>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              +8 points (3 months)
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {healthScoreHistory.map((month, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-slate-600 mb-1">{month.date}</div>
                  <div className="text-2xl font-bold text-slate-800">{month.score}</div>
                  {month.change !== 0 && (
                    <div className={`text-xs flex items-center justify-center space-x-1 ${
                      month.change > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {month.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{month.change > 0 ? "+" : ""}{month.change}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-end justify-between p-4">
              {healthScoreHistory.map((month, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-t from-blue-500 to-green-500 rounded-t"
                  style={{ 
                    height: `${(month.score / 100) * 100}%`,
                    width: '12%'
                  }}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="biomarkers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="biomarkers">Biomarker Trends</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="biomarkers" className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Biomarker Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {biomarkerTrends.map((biomarker, index) => (
                <Card key={index} className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-800">{biomarker.name}</h3>
                      <div className={`flex items-center space-x-1 ${getTrendColor(biomarker.trend)}`}>
                        {biomarker.trend === "improving" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="text-sm font-medium">
                          {biomarker.improvement > 0 ? "+" : ""}{biomarker.improvement}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {biomarker.data.map((point, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{point.date}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{point.value} {biomarker.unit}</span>
                            <Badge className={getStatusColor(point.status)}>
                              {point.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-20 bg-gradient-to-r from-slate-100 to-slate-50 rounded flex items-end justify-between p-2">
                      {biomarker.data.map((point, idx) => (
                        <div 
                          key={idx}
                          className={`rounded-t ${biomarker.trend === "improving" ? "bg-green-500" : "bg-red-500"}`}
                          style={{ 
                            height: `${((point.value - Math.min(...biomarker.data.map(d => d.value))) / 
                              (Math.max(...biomarker.data.map(d => d.value)) - Math.min(...biomarker.data.map(d => d.value)))) * 60 + 20}%`,
                            width: '20%'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Recent Achievements</h2>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Trophy className="w-4 h-4 mr-1" />
                4 achievements unlocked
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-800">{achievement.title}</h3>
                        <p className="text-slate-600">{achievement.description}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">{achievement.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{achievement.category}</Badge>
                        <Badge className={`${achievement.impact === "High" ? "bg-red-100 text-red-800 border-red-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}`}>
                          {achievement.impact} Impact
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Active Goals</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <Target className="w-4 h-4 mr-2" />
                Set New Goal
              </Button>
            </div>

            <div className="space-y-4">
              {goals.map((goal, index) => (
                <Card key={index} className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-800">{goal.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span>Target: <strong>{goal.target}</strong></span>
                          <span>Current: <strong>{goal.current}</strong></span>
                          <span>Deadline: <strong>{goal.deadline}</strong></span>
                        </div>
                      </div>
                      <Badge className={`${
                        goal.status === "ahead" ? "bg-green-100 text-green-800 border-green-200" :
                        goal.status === "on-track" ? "bg-blue-100 text-blue-800 border-blue-200" :
                        "bg-red-100 text-red-800 border-red-200"
                      }`}>
                        {goal.status === "ahead" ? "Ahead of Schedule" : 
                         goal.status === "on-track" ? "On Track" : "Behind Schedule"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Progress</span>
                        <span className="text-sm font-medium text-slate-700">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getGoalStatusColor(goal.status)}`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Progress;
