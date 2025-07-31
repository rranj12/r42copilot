import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  ChefHat, 
  MessageCircle, 
  Plus,
  Heart,
  Target,
  Calendar,
  Star,
  Clock,
  Users,
  ArrowRight,
  Edit,
  Trash2
} from "lucide-react";
import R42Logo from "@/components/ui/r42-logo";
import { useNavigate } from "react-router-dom";

const WellnessHub = () => {
  const navigate = useNavigate();
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: "2025-01-15",
      title: "Meditation Progress",
      content: "Completed 20 minutes of mindfulness meditation. Feeling more centered and focused.",
      mood: "calm",
      goals: ["stress-reduction", "focus"]
    },
    {
      id: 2,
      date: "2025-01-14",
      title: "Exercise Routine",
      content: "Did 30 minutes of strength training. Energy levels are improving.",
      mood: "energized",
      goals: ["strength", "energy"]
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "neutral",
    goals: []
  });

  const recipes = [
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      time: "25 min",
      difficulty: "Easy",
      rating: 4.8,
      tags: ["vegetarian", "high-protein", "antioxidant-rich"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Greek Yogurt with Berries",
      time: "5 min",
      difficulty: "Easy",
      rating: 4.9,
      tags: ["probiotic", "antioxidant", "quick"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Salmon with Olive Oil",
      time: "20 min",
      difficulty: "Medium",
      rating: 4.7,
      tags: ["omega-3", "protein", "heart-healthy"],
      image: "/placeholder.svg"
    }
  ];

  const forumTopics = [
    {
      id: 1,
      title: "Best morning routine for longevity?",
      author: "Sarah M.",
      replies: 12,
      views: 45,
      lastActivity: "2 hours ago",
      category: "lifestyle"
    },
    {
      id: 2,
      title: "Supplements for cognitive enhancement",
      author: "Mike R.",
      replies: 8,
      views: 32,
      lastActivity: "1 day ago",
      category: "supplements"
    },
    {
      id: 3,
      title: "Meditation techniques for stress reduction",
      author: "Lisa K.",
      replies: 15,
      views: 67,
      lastActivity: "3 hours ago",
      category: "wellness"
    }
  ];

  const addJournalEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...newEntry
      };
      setJournalEntries([entry, ...journalEntries]);
      setNewEntry({ title: "", content: "", mood: "neutral", goals: [] });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <R42Logo size="lg" />
              <div>
                <h1 className="text-xl font-bold text-slate-800">R42 Copilot</h1>
                <p className="text-xs text-slate-600">Personalized Longevity Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-700 hover:bg-white/40" onClick={() => navigate('/retreat')}>
                Retreat
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:bg-white/40" onClick={() => navigate('/r42-coe')}>
                R42 CoE
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:bg-white/40">
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/onboarding')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Wellness & Longevity
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Wellness
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block">
                Hub
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Track your wellness journey, discover longevity-promoting recipes, 
              and connect with like-minded individuals in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="journal" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="journal">Wellness Journal</TabsTrigger>
              <TabsTrigger value="recipes">Mediterranean Recipes</TabsTrigger>
              <TabsTrigger value="forum">Community Forum</TabsTrigger>
            </TabsList>

            <TabsContent value="journal" className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-800">Wellness Journal</h2>
                <Button 
                  onClick={() => document.getElementById('new-entry')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </div>

              {/* New Entry Form */}
              <Card id="new-entry" className="bg-white/40 backdrop-blur-sm border-white/30">
                <CardHeader>
                  <CardTitle>New Journal Entry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newEntry.title}
                        onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                        placeholder="What's on your mind?"
                        className="bg-white/50 border-white/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mood">Mood</Label>
                      <select
                        id="mood"
                        value={newEntry.mood}
                        onChange={(e) => setNewEntry({...newEntry, mood: e.target.value})}
                        className="w-full p-2 rounded-md border border-white/30 bg-white/50"
                      >
                        <option value="neutral">Neutral</option>
                        <option value="happy">Happy</option>
                        <option value="calm">Calm</option>
                        <option value="energized">Energized</option>
                        <option value="stressed">Stressed</option>
                        <option value="tired">Tired</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                      placeholder="Write about your wellness journey, goals, or experiences..."
                      className="bg-white/50 border-white/30 min-h-[120px]"
                    />
                  </div>
                  <Button 
                    onClick={addJournalEntry}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    Save Entry
                  </Button>
                </CardContent>
              </Card>

              {/* Journal Entries */}
              <div className="space-y-6">
                {journalEntries.map((entry) => (
                  <Card key={entry.id} className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{entry.title}</CardTitle>
                          <p className="text-sm text-slate-600">{entry.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {entry.mood}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700">{entry.content}</p>
                      {entry.goals.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {entry.goals.map((goal, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recipes" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Mediterranean Longevity Recipes</h2>
                <p className="text-slate-600">Discover delicious, science-backed recipes that promote longevity and health</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <Card key={recipe.id} className="bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-4 flex items-center justify-center">
                        <ChefHat className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{recipe.title}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {recipe.time}
                          </span>
                          <span>{recipe.difficulty}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium ml-1">{recipe.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {recipe.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                        onClick={() => {
                          const recipeLinks = {
                            1: 'https://www.loveandlemons.com/quinoa-buddha-bowl/',
                            2: 'https://www.healthline.com/nutrition/greek-yogurt-benefits',
                            3: 'https://www.themediterraneandish.com/mediterranean-salmon-recipe/'
                          };
                          window.open(recipeLinks[recipe.id], '_blank');
                        }}
                      >
                        View Recipe
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                >
                  View All Recipes
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="forum" className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Community Forum</h2>
                  <p className="text-slate-600">Connect with fellow wellness enthusiasts and share experiences</p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Topic
                </Button>
              </div>

              <div className="space-y-4">
                {forumTopics.map((topic) => (
                  <Card key={topic.id} className="bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-2">{topic.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                            <span>By {topic.author}</span>
                            <span>{topic.lastActivity}</span>
                            <Badge variant="outline" className="text-xs">
                              {topic.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {topic.replies} replies
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {topic.views} views
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-white/20 backdrop-blur-sm py-12 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <R42Logo size="md" />
              <div>
                <div className="font-semibold text-slate-800">R42 Copilot</div>
                <div className="text-sm text-slate-600">2025 R42 Institute</div>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Powered by science. Driven by data.
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-slate-500 text-center">
              <strong>Important:</strong> This tool is for informational purposes only. Always consult with qualified healthcare professionals before starting any new intervention or supplement regimen.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WellnessHub; 