
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Brain, 
  Dumbbell, 
  Moon, 
  Apple, 
  Pill, 
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Star,
  TrendingUp
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Recommendations = () => {
  const [activeCategory, setActiveCategory] = useState("supplements");

  const supplementRecommendations = [
    {
      name: "Omega-3 EPA/DHA",
      dosage: "2g daily",
      timing: "With meals",
      purpose: "Cardiovascular health & inflammation reduction",
      evidence: "Meta-analysis of 17 RCTs showing 19% reduction in cardiovascular events",
      source: "PMID: 34567890",
      priority: "high",
      currentAdherence: 95,
      cost: "$25/month",
      brand: "Nordic Naturals Ultimate Omega"
    },
    {
      name: "Magnesium Glycinate",
      dosage: "400mg",
      timing: "Before bed",
      purpose: "Sleep quality & muscle recovery",
      evidence: "Improves sleep efficiency by 23% in adults over 40",
      source: "Turn Bio Study 2024",
      priority: "high",
      currentAdherence: 88,
      cost: "$18/month",
      brand: "Thorne Magnesium Bisglycinate"
    },
    {
      name: "Lion's Mane Extract",
      dosage: "1g daily",
      timing: "Morning with coffee",
      purpose: "Cognitive enhancement & neuroprotection",
      evidence: "Increases NGF production and cognitive test scores",
      source: "NeuroAge Research",
      priority: "medium",
      currentAdherence: 72,
      cost: "$35/month",
      brand: "Host Defense Lion's Mane"
    },
    {
      name: "Creatine Monohydrate",
      dosage: "5g daily",
      timing: "Post-workout",
      purpose: "Muscle strength & cognitive function",
      evidence: "3-15% increase in power output and working memory",
      source: "PMID: 32894123",
      priority: "medium",
      currentAdherence: 82,
      cost: "$12/month",
      brand: "Creapure Creatine"
    },
    {
      name: "Curcumin Complex",
      dosage: "1g daily",
      timing: "With fat-containing meal",
      purpose: "Anti-inflammatory & longevity support",
      evidence: "Reduces inflammatory markers by 25-30%",
      source: "PMID: 31234567",
      priority: "low",
      currentAdherence: 65,
      cost: "$28/month",
      brand: "Meriva Curcumin Phytosome"
    }
  ];

  const dietaryRecommendations = [
    {
      title: "Mediterranean-Style Eating Pattern",
      description: "High in omega-3 rich fish, olive oil, nuts, and vegetables",
      rationale: "Your metabolomics data shows optimal response to this pattern",
      evidence: "PREDIMED study: 30% reduction in cardiovascular events",
      implementation: [
        "3-4 servings of fatty fish per week",
        "Daily extra virgin olive oil (2-3 tbsp)",
        "Handful of mixed nuts daily",
        "7+ servings of vegetables daily"
      ],
      adherence: 78,
      impact: "High"
    },
    {
      title: "Intermittent Fasting (16:8)",
      description: "16-hour fast with 8-hour eating window",
      rationale: "Your HbA1c improvement correlates with fasting periods",
      evidence: "Improves insulin sensitivity and promotes autophagy",
      implementation: [
        "Eat between 12pm-8pm",
        "Black coffee/tea during fasting",
        "Hydrate well during fasting window",
        "Break fast with protein and fiber"
      ],
      adherence: 85,
      impact: "High"
    },
    {
      title: "Prebiotic Fiber Optimization",
      description: "Targeted fiber intake based on microbiome analysis",
      rationale: "Your Jona results show beneficial bacteria respond to specific fibers",
      evidence: "Personalized nutrition based on microbiome composition",
      implementation: [
        "25g inulin-rich foods daily",
        "Resistant starch (cooled potatoes/rice)",
        "Diverse plant foods (30+ per week)",
        "Fermented vegetables 3x/week"
      ],
      adherence: 62,
      impact: "Medium"
    }
  ];

  const lifestyleRecommendations = [
    {
      category: "Exercise",
      icon: Dumbbell,
      recommendations: [
        {
          title: "Zone 2 Cardio Training",
          frequency: "3x per week, 45 minutes",
          rationale: "Your VO2 max gains indicate optimal adaptation",
          target: "Heart rate 130-150 bpm",
          adherence: 80
        },
        {
          title: "Resistance Training",
          frequency: "4x per week, compound movements",
          rationale: "Maintain muscle mass and bone density",
          target: "Progressive overload protocol",
          adherence: 75
        }
      ]
    },
    {
      category: "Sleep",
      icon: Moon,
      recommendations: [
        {
          title: "Sleep Hygiene Protocol",
          frequency: "Daily consistency",
          rationale: "Your sleep score improved with these practices",
          target: "7.5-8.5 hours, same schedule",
          adherence: 92
        },
        {
          title: "Blue Light Management",
          frequency: "2 hours before bed",
          rationale: "Improves melatonin production",
          target: "Blue light blocking glasses",
          adherence: 68
        }
      ]
    },
    {
      category: "Stress Management",
      icon: Brain,
      recommendations: [
        {
          title: "Meditation Practice",
          frequency: "20 minutes daily",
          rationale: "Reduces cortisol and improves stress resilience",
          target: "Mindfulness-based stress reduction",
          adherence: 65
        },
        {
          title: "Cold Exposure",
          frequency: "3x per week",
          rationale: "Hormetic stress response activation",
          target: "2-3 minutes cold shower",
          adherence: 45
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Personalized Action Plan</h1>
          <p className="text-purple-100 text-lg">
            Science-backed recommendations tailored to your unique biomarker profile
          </p>
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>94% Protocol Adherence</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span>8.2% Health Improvement</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="supplements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="supplements" className="flex items-center space-x-2">
              <Pill className="w-4 h-4" />
              <span>Supplements</span>
            </TabsTrigger>
            <TabsTrigger value="diet" className="flex items-center space-x-2">
              <Apple className="w-4 h-4" />
              <span>Diet</span>
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Lifestyle</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="supplements" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Supplement Protocol</h2>
              <Button variant="outline" className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                Export Protocol
              </Button>
            </div>

            <div className="space-y-4">
              {supplementRecommendations.map((supplement, index) => (
                <Card key={index} className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold text-slate-800">{supplement.name}</h3>
                          <Badge className={getPriorityColor(supplement.priority)}>
                            {supplement.priority} priority
                          </Badge>
                        </div>
                        <p className="text-slate-600">{supplement.purpose}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">{supplement.dosage}</div>
                        <div className="text-sm text-slate-600">{supplement.timing}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-slate-700">Scientific Evidence</div>
                        <p className="text-sm text-slate-600">{supplement.evidence}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {supplement.source}
                          </Badge>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium text-slate-700">Current Adherence</div>
                        <Progress value={supplement.currentAdherence} className="h-2" />
                        <p className="text-sm text-slate-600">{supplement.currentAdherence}% this month</p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium text-slate-700">Recommended Brand</div>
                        <p className="text-sm text-slate-600">{supplement.brand}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{supplement.cost}</span>
                          <Button size="sm" variant="outline">
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="diet" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Dietary Recommendations</h2>
              <Button variant="outline" className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                Generate Meal Plan
              </Button>
            </div>

            <div className="space-y-6">
              {dietaryRecommendations.map((diet, index) => (
                <Card key={index} className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-800">{diet.title}</h3>
                        <p className="text-slate-600">{diet.description}</p>
                      </div>
                      <Badge className={`${diet.impact === "High" ? "bg-red-100 text-red-800 border-red-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}`}>
                        {diet.impact} Impact
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-slate-700">Implementation Guidelines</div>
                        <ul className="space-y-2">
                          {diet.implementation.map((item, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm font-medium text-slate-700">Scientific Rationale</div>
                        <p className="text-sm text-slate-600 mb-2">{diet.rationale}</p>
                        <p className="text-sm text-slate-600 italic">{diet.evidence}</p>
                        
                        <div className="mt-4">
                          <div className="text-sm font-medium text-slate-700 mb-2">Current Adherence</div>
                          <Progress value={diet.adherence} className="h-2" />
                          <p className="text-xs text-slate-600 mt-1">{diet.adherence}% this month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Lifestyle Optimization</h2>
              <Button variant="outline" className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                Create Schedule
              </Button>
            </div>

            <div className="space-y-6">
              {lifestyleRecommendations.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="p-6 bg-white/40 backdrop-blur-sm border-white/30">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800">{category.category}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.recommendations.map((rec, idx) => (
                          <div key={idx} className="space-y-3 p-4 bg-white/20 rounded-lg">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-slate-800">{rec.title}</h4>
                              <Badge variant="outline">{rec.frequency}</Badge>
                            </div>
                            <p className="text-sm text-slate-600">{rec.rationale}</p>
                            <div className="space-y-2">
                              <div className="text-xs font-medium text-slate-700">Target: {rec.target}</div>
                              <Progress value={rec.adherence} className="h-1.5" />
                              <div className="text-xs text-slate-600">{rec.adherence}% adherence</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;
