import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FlaskConical, 
  Calendar, 
  FileText, 
  Building2,
  ArrowRight,
  ExternalLink,
  Users,
  Clock,
  Star,
  Target,
  TrendingUp,
  Award
} from "lucide-react";
import R42Logo from "@/components/ui/r42-logo";
import { useNavigate } from "react-router-dom";

const R42CoE = () => {
  const navigate = useNavigate();

  const clinicalTrials = [
    {
      id: 1,
      title: "Rapamycin for Longevity Enhancement",
      phase: "Phase 2",
      status: "Recruiting",
      location: "Multiple Sites",
      description: "Investigating the effects of low-dose rapamycin on aging biomarkers and healthspan.",
      participants: "200",
      duration: "24 months",
      sponsor: "R42 Institute"
    },
    {
      id: 2,
      title: "Metformin in Aging Prevention",
      phase: "Phase 3",
      status: "Active",
      location: "Stanford University",
      description: "Long-term study of metformin's effects on age-related diseases and mortality.",
      participants: "500",
      duration: "36 months",
      sponsor: "NIH"
    },
    {
      id: 3,
      title: "Senolytics for Cellular Rejuvenation",
      phase: "Phase 1",
      status: "Recruiting",
      location: "Mayo Clinic",
      description: "Testing senolytic compounds to clear senescent cells and improve tissue function.",
      participants: "50",
      duration: "12 months",
      sponsor: "R42 Institute"
    }
  ];

  const webinars = [
    {
      id: 1,
      title: "The Future of Longevity Medicine",
      date: "March 15, 2025",
      time: "2:00 PM EST",
      speaker: "Dr. Sarah Chen",
      description: "Exploring cutting-edge approaches to extending healthspan and preventing age-related diseases.",
      registration: "Open",
      attendees: "150"
    },
    {
      id: 2,
      title: "Biomarkers in Aging Research",
      date: "March 22, 2025",
      time: "1:00 PM EST",
      speaker: "Dr. Michael Rodriguez",
      description: "Understanding key biomarkers and their role in measuring biological age and healthspan.",
      registration: "Open",
      attendees: "89"
    },
    {
      id: 3,
      title: "Nutrition and Longevity",
      date: "March 29, 2025",
      time: "3:00 PM EST",
      speaker: "Dr. Emily Watson",
      description: "Evidence-based nutrition strategies for optimizing healthspan and preventing chronic diseases.",
      registration: "Coming Soon",
      attendees: "0"
    }
  ];

  const researchPapers = [
    {
      id: 1,
      title: "The Hallmarks of Aging",
      authors: "López-Otín C, Blasco MA, Partridge L, Serrano M, Kroemer G",
      journal: "Cell",
      year: 2013,
      citations: 2847,
      impact: "High",
      doi: "10.1016/j.cell.2013.05.039",
      abstract: "The original hallmarks of aging paper that defined the nine cellular and molecular hallmarks of aging.",
      url: "https://www.cell.com/cell/fulltext/S0092-8674(13)00645-4"
    },
    {
      id: 2,
      title: "Senolytic Drugs: Reducing Senescent Cell Viability to Extend Health Span",
      authors: "Robbins PD, Jurk D, Khosla S, Kirkland JL, LeBrasseur NK, et al.",
      journal: "Annual Review of Pharmacology and Toxicology",
      year: 2021,
      citations: 1247,
      impact: "High",
      doi: "10.1146/annurev-pharmtox-050120-105018",
      abstract: "Comprehensive review of senolytic drugs that selectively kill senescent cells to extend healthspan and treat age-related diseases.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7790861/"
    },
    {
      id: 3,
      title: "Rapamycin for Longevity: From Yeast to Humans",
      authors: "Johnson SC, Rabinovitch PS, Kaeberlein M",
      journal: "Nature",
      year: 2013,
      citations: 892,
      impact: "High",
      doi: "10.1038/nature11889",
      abstract: "Seminal paper on rapamycin's effects on aging and lifespan extension across species.",
      url: "https://www.nature.com/articles/nature11889"
    },
    {
      id: 4,
      title: "Calorie Restriction and Longevity: From Animal Models to Human Studies",
      authors: "Fontana L, Partridge L, Longo VD",
      journal: "Science",
      year: 2010,
      citations: 1243,
      impact: "High",
      doi: "10.1126/science.1172539",
      abstract: "Review of calorie restriction effects on aging and potential applications for human healthspan extension.",
      url: "https://www.science.org/doi/10.1126/science.1172539"
    },
    {
      id: 5,
      title: "NAD+ and sirtuins in aging and disease",
      authors: "Imai S, Guarente L",
      journal: "Trends in Cell Biology",
      year: 2014,
      citations: 987,
      impact: "High",
      doi: "10.1016/j.tcb.2014.04.002",
      abstract: "Comprehensive overview of NAD+ metabolism in aging and its therapeutic implications for age-related diseases.",
      url: "https://www.cell.com/trends/cell-biology/fulltext/S0962-8924(14)00052-7"
    },
    {
      id: 6,
      title: "Autophagy and aging",
      authors: "Rubinsztein DC, Mariño G, Kroemer G",
      journal: "Cell",
      year: 2011,
      citations: 2156,
      impact: "High",
      doi: "10.1016/j.cell.2011.07.030",
      abstract: "Review of autophagy mechanisms in aging and their potential for therapeutic intervention.",
      url: "https://www.cell.com/cell/fulltext/S0092-8674(11)00849-0"
    },
    {
      id: 7,
      title: "The Hallmarks of Aging: An Expanding Universe",
      authors: "López-Otín C, Blasco MA, Partridge L, Serrano M, Kroemer G",
      journal: "Cell",
      year: 2023,
      citations: 1567,
      impact: "High",
      doi: "10.1016/j.cell.2023.01.002",
      abstract: "Updated review expanding on the original hallmarks with new discoveries in aging biology.",
      url: "https://www.cell.com/cell/fulltext/S0092-8674(23)00002-4"
    }
  ];

  const portfolioCompanies = [
    {
      id: 1,
      name: "NeuroAge TX",
      focus: "Cognitive Enhancement",
      stage: "Series A",
      description: "Developing novel therapeutics for cognitive decline and brain aging.",
      founded: 2022,
      employees: "25",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      name: "Metabolic Health Solutions",
      focus: "Metabolic Optimization",
      stage: "Series B",
      description: "AI-powered platform for personalized metabolic health optimization.",
      founded: 2021,
      employees: "45",
      location: "Boston, MA"
    },
    {
      id: 3,
      name: "Cellular Rejuvenation Inc",
      focus: "Senolytics",
      stage: "Pre-Clinical",
      description: "Developing next-generation senolytic compounds for age-related diseases.",
      founded: 2023,
      employees: "12",
      location: "San Diego, CA"
    }
  ];

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
              <Button variant="ghost" className="text-slate-700 hover:bg-white/40" onClick={() => navigate('/retreat')}>
                Retreat
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:bg-white/40" onClick={() => navigate('/wellness-hub')}>
                Wellness Hub
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
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 mb-4">
              <Award className="w-4 h-4 mr-2" />
              Center of Excellence
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              R42 Center of
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                Excellence
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Discover cutting-edge research, clinical trials, and innovations in longevity science. 
              Stay informed about the latest developments in the field.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="trials" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="trials">Clinical Trials</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
              <TabsTrigger value="papers">Research Papers</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio Companies</TabsTrigger>
            </TabsList>

            <TabsContent value="trials" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Promising Clinical Trials</h2>
                <p className="text-slate-600">Discover ongoing research studies in longevity and age-related diseases</p>
              </div>

              <div className="space-y-6">
                {clinicalTrials.map((trial) => (
                  <Card key={trial.id} className="bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-800 mb-2">{trial.title}</h3>
                          <p className="text-slate-600 mb-4">{trial.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              {trial.phase}
                            </Badge>
                            <Badge className={`${
                              trial.status === 'Recruiting' ? 'bg-green-100 text-green-800 border-green-200' :
                              trial.status === 'Active' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}>
                              {trial.status}
                            </Badge>
                            <Badge variant="outline">{trial.location}</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Participants:</span>
                          <p className="font-medium">{trial.participants}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Duration:</span>
                          <p className="font-medium">{trial.duration}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Sponsor:</span>
                          <p className="font-medium">{trial.sponsor}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Location:</span>
                          <p className="font-medium">{trial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="webinars" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Upcoming R42 Webinars</h2>
                <p className="text-slate-600">Join our expert-led sessions on longevity science and research</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webinars.map((webinar) => (
                  <Card key={webinar.id} className="bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={`${
                          webinar.registration === 'Open' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {webinar.registration}
                        </Badge>
                        <div className="flex items-center text-sm text-slate-600">
                          <Users className="w-4 h-4 mr-1" />
                          {webinar.attendees}
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{webinar.title}</h3>
                      <p className="text-sm text-slate-600 mb-4">{webinar.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                          <span>{webinar.date} at {webinar.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-slate-500" />
                          <span>{webinar.speaker}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                        disabled={webinar.registration === 'Coming Soon'}
                      >
                        {webinar.registration === 'Open' ? 'Register Now' : 'Coming Soon'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="papers" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Most Cited Longevity Papers</h2>
                <p className="text-slate-600">Key research papers from PubMed on aging and longevity</p>
              </div>

              <div className="space-y-6">
                {researchPapers.map((paper) => (
                  <Card key={paper.id} className="bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-800 mb-2">{paper.title}</h3>
                          <p className="text-slate-600 mb-4">{paper.abstract}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                              {paper.journal}
                            </Badge>
                            <Badge variant="outline">{paper.year}</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              {paper.citations} citations
                            </Badge>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              {paper.impact} Impact
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(paper.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Authors:</span>
                          <p className="font-medium">{paper.authors}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">DOI:</span>
                          <p className="font-medium font-mono text-xs">{paper.doi}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">R42 Portfolio Companies</h2>
                <p className="text-slate-600">Innovative startups advancing longevity science and technology</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioCompanies.map((company) => (
                  <Card key={company.id} className="bg-white/40 backdrop-blur-sm border-white/30 hover:bg-white/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                          <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-800 text-lg">{company.name}</h3>
                        <p className="text-sm text-slate-600">{company.focus}</p>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">{company.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Stage:</span>
                          <span className="font-medium">{company.stage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Founded:</span>
                          <span className="font-medium">{company.founded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Employees:</span>
                          <span className="font-medium">{company.employees}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Location:</span>
                          <span className="font-medium">{company.location}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
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

export default R42CoE; 