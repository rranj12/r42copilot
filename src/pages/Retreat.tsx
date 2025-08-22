import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Activity,
  ArrowRight,
  Clock,
  MapPin,
  Star,
  MessageCircle,
  FileText,
  Heart,
  Target
} from "lucide-react";
import R42Logo from "@/components/ui/r42-logo";
import { useNavigate } from "react-router-dom";

const Retreat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <R42Logo size="lg" />
              <div>
                <h1 className="text-xl font-bold text-slate-800">R42 Copilot</h1>
                <p className="text-xs text-slate-600">Personalized Longevity Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-700 hover:bg-white/40" onClick={() => navigate('/wellness-hub')}>
                Wellness Hub
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
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              March 15-17, 2025
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              R42 Longevity
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent block">
                Retreat
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Immerse yourself in cutting-edge longevity science with leading researchers, 
              personalized biomarker analysis, and transformative wellness practices.
            </p>
            <div className="flex items-center justify-center space-x-8 text-slate-600">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>3 Days</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Half Moon Bay, CA</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>50 Participants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="agenda">Agenda & Speakers</TabsTrigger>
              <TabsTrigger value="lectures">Lecture Summaries</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Retreat Agenda</h2>
                <p className="text-slate-600">A comprehensive 3-day experience at the Ritz-Carlton, Half Moon Bay</p>
              </div>

              <div className="space-y-8">
                {/* Day 1 */}
                <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">1</span>
                      </div>
                      <span>Day 1: Arrival & Restoration (Starts at Noon)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">12:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Welcome & Check-In</h4>
                          <p className="text-sm text-slate-600">Light refreshments and herbal welcome elixirs. Guests receive wellness gift bags with tools like Oura rings and supplements.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">1:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Longevity Lunch (TBD)</h4>
                          <p className="text-sm text-slate-600">Prepared by Ritz-Carlton chefs using healthy, organic, and longevity-focused ingredients.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">2:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Biomarker & Health Assessments</h4>
                          <p className="text-sm text-slate-600">DEXA scan, HRV, glucose, and optional biological age testing.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">3:30 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Seminar: The Science of Aging Gracefully</h4>
                          <p className="text-sm text-slate-600">A dive into cellular damage, mitochondria, and hallmarks of aging.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">5:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Restorative Yoga & Guided Breathwork</h4>
                          <p className="text-sm text-slate-600">Held on the oceanfront bluff to support nervous system reset.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">6:30 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Longevity Dinner (TBD)</h4>
                          <p className="text-sm text-slate-600">Anti-inflammatory, nutrient-dense cuisine to support rejuvenation.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">8:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Longevity Product Discovery</h4>
                          <p className="text-sm text-slate-600">Red light therapy, supplements (NMN, glycine, spermidine), and sleep tracking demos (Oura, Whoop).</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 2 */}
                <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-green-600">2</span>
                      </div>
                      <span>Day 2: Activation & Exploration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">7:30 AM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Sunrise Yoga & Mobility Flow</h4>
                          <p className="text-sm text-slate-600">Joint mobility, fascia release, and gentle strength building.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">8:30 AM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Longevity Breakfast (TBD)</h4>
                          <p className="text-sm text-slate-600">Organic and nutrient-rich meal to start the day strong.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">9:30 AM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Seminar: Hormetic Stress & Longevity</h4>
                          <p className="text-sm text-slate-600">How biological stressors like heat and cold promote resilience.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">11:00 AM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Tech & Therapies Sampler</h4>
                          <p className="text-sm text-slate-600">NAD+ IV education, peptide overview, and optional hyperbaric demo.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">12:30 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Longevity Lunch (TBD)</h4>
                          <p className="text-sm text-slate-600">Gut-friendly, seasonal and anti-inflammatory meal.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">2:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Guided Coastal Longevity Hike</h4>
                          <p className="text-sm text-slate-600">Mindful hike with breathwork and grounding on Half Moon Bay cliffs.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">4:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Contrast Therapy Circuit</h4>
                          <p className="text-sm text-slate-600">Cold plunge and infrared sauna with longevity science insights.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">6:30 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Longevity Dinner (TBD)</h4>
                          <p className="text-sm text-slate-600">Metabolic-supportive meal with optional fasting-mimicking dishes.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">8:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Workshop: Craft Your Longevity Blueprint</h4>
                          <p className="text-sm text-slate-600">Build personalized protocol and pair with accountability partners.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day 3 */}
                <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-600">3</span>
                      </div>
                      <span>Day 3: Integration & Departure (Ends Early Afternoon)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">7:30 AM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Qi Gong & Tai Chi</h4>
                          <p className="text-sm text-slate-600">Slow movement practice for balance and energy flow.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">8:30 AM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Longevity Breakfast (TBD)</h4>
                          <p className="text-sm text-slate-600">Light, nourishing meal to support digestion and clarity.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">9:30 AM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Seminar: Gut-Brain Axis, Microbiome & Metabolic Health</h4>
                          <p className="text-sm text-slate-600">Discussion on microbiome longevity and interpreting test results.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">11:00 AM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Closing Circle + Protocol Package</h4>
                          <p className="text-sm text-slate-600">Final reflections, supplement plan, and 4-week follow-up strategies.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 text-sm font-semibold text-slate-600">12:00 PM</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">Longevity Lunch & Farewell (TBD)</h4>
                          <p className="text-sm text-slate-600">To-go meal and wellness snack packs for the road.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <span>Your Test Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      During the retreat, you'll receive personalized insights from your uploaded biomarker data, 
                      helping you understand your current health status and optimize your longevity protocol.
                    </p>
                    <Button 
                      onClick={() => navigate('/onboarding')}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      Upload Test Results
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>Location & Accommodations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Hosted at the luxurious Ritz-Carlton, Half Moon Bay with stunning oceanfront views, 
                      world-class amenities, and dedicated wellness facilities.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      View Location
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="agenda" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Retreat Experience & Activities</h2>
                <p className="text-slate-600">Immersive longevity science and wellness practices at the Ritz-Carlton, Half Moon Bay</p>
              </div>

              {/* Day 1 - Arrival & Restoration */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2">Day 1: Arrival & Restoration</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <span>Science of Aging Gracefully</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Deep dive into cellular damage, mitochondria, and hallmarks of aging. Learn the latest research on how to age gracefully and maintain vitality.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Cellular Biology</Badge>
                          <Badge className="bg-green-100 text-green-800 border-green-200">Mitochondria</Badge>
                          <Badge variant="outline">Aging Science</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Time:</strong> 3:30 PM - 4:30 PM
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-green-600" />
                        <span>Biomarker Assessments</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Comprehensive health evaluation including DEXA scan, HRV monitoring, glucose testing, and optional biological age assessment.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">DEXA Scan</Badge>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">HRV</Badge>
                          <Badge variant="outline">Glucose Testing</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Time:</strong> 2:00 PM - 3:00 PM
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Day 2 - Activation & Exploration */}
                <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">Day 2: Activation & Exploration</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <span>Hormetic Stress & Longevity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Learn how biological stressors like heat, cold, and exercise promote resilience and longevity. Discover the science behind hormesis.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">Hormesis</Badge>
                          <Badge className="bg-orange-100 text-orange-800 border-orange-200">Stress Response</Badge>
                          <Badge variant="outline">Longevity</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Time:</strong> 9:30 AM - 10:30 AM
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <span>Tech & Therapies Sampler</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Experience cutting-edge longevity technologies including NAD+ IV therapy, peptide overview, and optional hyperbaric oxygen therapy.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">NAD+ IV</Badge>
                          <Badge className="bg-orange-100 text-orange-800 border-orange-200">Peptides</Badge>
                          <Badge variant="outline">Hyperbaric</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Time:</strong> 11:00 AM - 12:00 PM
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Day 3 - Integration & Departure */}
                <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">Day 3: Integration & Departure</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        <span>Gut-Brain Axis & Microbiome</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Comprehensive discussion on microbiome longevity, gut-brain connection, and interpreting your test results for optimal health.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">Microbiome</Badge>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Gut-Brain Axis</Badge>
                          <Badge variant="outline">Metabolic Health</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Time:</strong> 9:30 AM - 10:30 AM
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-green-600" />
                        <span>Longevity Blueprint Workshop</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Build your personalized longevity protocol and connect with accountability partners for continued success after the retreat.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">Personalized</Badge>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Protocol</Badge>
                          <Badge variant="outline">Accountability</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Time:</strong> 8:00 PM (Day 2)
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                          <strong>Panel Topic:</strong> Functional Longevity Training
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        <span>Dr. Andrew Huberman</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Stanford neuroscientist and podcaster discussing science-backed health and aging tools.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Neuroscience</Badge>
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">Brain Aging</Badge>
                          <Badge variant="outline">Stanford</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Panel Topic:</strong> Brain Aging, Hormones & Male Vitality
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Wellness Activities */}
                <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">Wellness Activities & Instructors</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-green-600" />
                        <span>Pavan Manocha - Yoga Instructor</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Yoga instructor at the Sivananda Yoga Vedanta Center in San Francisco. International management consultant and adjunct professor.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">Yoga</Badge>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Sustainability</Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          <strong>Clients:</strong> United Nations (UN), World Economic Forum (WEF)
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-green-600" />
                        <span>Dr. Heidi Fu - Acupuncture</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                          Provides acupuncture and Chinese Medicine for pain, infertility, anti-aging, beauty, anxiety, stress, depression, insomnia, and emotional balance.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">Acupuncture</Badge>
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">Chinese Medicine</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lectures" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Lecture Summaries</h2>
                <p className="text-slate-600">Access detailed summaries and materials from retreat lectures</p>
              </div>

              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Lecture Summaries Coming Soon!</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Detailed summaries and materials from the retreat lectures will be available after the event. 
                  Check back here for comprehensive notes and resources from our expert speakers.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Connect with Fellow Participants</h2>
                <p className="text-slate-600">Build lasting connections with like-minded longevity enthusiasts</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <span>Participant Directory</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">
                        Browse profiles of fellow participants and connect with those who share your interests.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                      >
                        View Participants
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/40 backdrop-blur-sm border-white/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <span>Discussion Forums</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">
                        Join ongoing discussions about longevity topics and share your experiences.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        Join Discussions
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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

export default Retreat; 