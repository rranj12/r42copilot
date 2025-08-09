
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Activity, Target, Users, Shield, TrendingUp } from "lucide-react";
import R42Logo from "@/components/ui/r42-logo";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <R42Logo size="lg" />
                <div>
                  <h1 className="text-xl font-bold text-slate-800">R42 Copilot</h1>
                  <p className="text-xs text-slate-600">Personalized Longevity Platform</p>
                </div>
              </button>
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

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Powered by Advanced Biomarker Analysis
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Integrate data from leading diagnostics platforms and receive AI-generated, 
              personalized recommendations backed by published research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Multi-Platform Integration</h3>
              <p className="text-slate-600">
                Connect data from Iollo, Jona, Function Health, TokuEyes, and more for comprehensive insights.
              </p>
            </Card>

            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-4">
                <R42Logo size="sm" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">AI-Powered Recommendations</h3>
              <p className="text-slate-600">
                Receive personalized diet, supplement, and lifestyle protocols based on your unique biomarker profile.
              </p>
            </Card>

            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Progress Tracking</h3>
              <p className="text-slate-600">
                Monitor your biomarker trends over time and track the effectiveness of your personalized protocols.
              </p>
            </Card>

            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Science-Backed Insights</h3>
              <p className="text-slate-600">
                Every recommendation is grounded in published research and insights from R42-funded startups.
              </p>
            </Card>

            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-8000 mb-2">Research Contribution</h3>
              <p className="text-slate-600">
                Opt-in to contribute your data to R42's research network and help advance longevity science.
              </p>
            </Card>

            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Privacy & Security</h3>
              <p className="text-slate-600">
                Your health data is encrypted and protected with enterprise-grade security measures.
              </p>
            </Card>
          </div>


        </div>
      </section>

      {/* Retreat Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Join Our Exclusive Longevity Retreat
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Immerse yourself in cutting-edge longevity science with leading researchers, 
              personalized biomarker analysis, and transformative wellness practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Expert Speakers</h3>
              <p className="text-slate-600 text-sm">
                Learn from world-renowned longevity researchers and practitioners.
              </p>
            </Card>

            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Biomarker Analysis</h3>
              <p className="text-slate-600 text-sm">
                Get personalized insights from your uploaded test results.
              </p>
            </Card>

            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Wellness Practices</h3>
              <p className="text-slate-600 text-sm">
                Experience yoga, meditation, and other longevity-promoting activities.
              </p>
            </Card>

            <Card className="p-6 bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Community</h3>
              <p className="text-slate-600 text-sm">
                Connect with like-minded individuals on their longevity journey.
              </p>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => navigate('/retreat')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg"
            >
              Explore Retreat Details
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
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

export default Index;
