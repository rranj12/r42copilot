
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ArrowRight, ArrowLeft, Check, Apple } from "lucide-react";
import R42Logo from "@/components/ui/r42-logo";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { setUserData } from "@/lib/user-data";
import { generateNeuroAgeData, generateIolloData } from "@/lib/data-visualization";
import { extractTextFromPDF } from "@/lib/openai-service";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
    healthGoals: "",
    currentSupplements: "",
    diagnosticData: {
      jonaHealth: false,
      neuroAge: false,
      iollo: false,
    },
    appleHealthConnected: false,
    researchConsent: false,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      setUserData(formData);
      toast({
        title: "Profile Created Successfully!",
        description: "Your personalized longevity plan is being generated.",
      });
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateDiagnosticData = (provider: string, checked: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      diagnosticData: {
        ...prev.diagnosticData,
        [provider]: checked === true
      }
    }));
  };

  const handleAppleHealthConnect = () => {
    // Simulate Apple Health connection
    updateFormData("appleHealthConnected", true);
    toast({
      title: "Apple Health Connected!",
      description: "Your health data is now syncing with R42 Copilot.",
    });
  };

  const handleFileUpload = async (provider: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        try {
          // Extract text from PDF
          const text = await extractTextFromPDF(file);
          
          // Create PDF record
          const pdfRecord = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            filename: file.name,
            platform: provider,
            uploadDate: new Date(),
            content: text
          };

          // Store in form data
          setFormData(prev => ({
            ...prev,
            uploadedPDFs: [...(prev.uploadedPDFs || []), pdfRecord]
          }));

          // Generate data based on provider
          if (provider === "NeuroAge") {
            const neuroAgeData = generateNeuroAgeData(file.name);
            setFormData(prev => ({
              ...prev,
              neuroAgeData: neuroAgeData
            }));
          } else if (provider === "Iollo") {
            const iolloData = generateIolloData(file.name);
            setFormData(prev => ({
              ...prev,
              iolloData: iolloData
            }));
          } else if (provider === "JonaHealth") {
            setFormData(prev => ({
              ...prev,
              jonaHealthData: { filename: file.name, uploaded: true }
            }));
          }

          toast({
            title: `${provider} Results Uploaded!`,
            description: `PDF content extracted and stored for AI analysis.`,
          });

          console.log(`Uploading ${file.name} for ${provider}`);
        } catch (error) {
          console.error('Error processing PDF:', error);
          toast({
            title: "PDF Processing Error",
            description: "Failed to extract content from PDF. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
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
                <p className="text-xs text-slate-600">Profile Setup</p>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Step {step} of 4
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm font-medium text-slate-700">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-white/40 rounded-full h-2 backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-white/40 backdrop-blur-sm border-white/30 p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to R42 Copilot</h2>
                <p className="text-slate-600">Let's start by getting to know you better</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className="bg-white/50 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    className="bg-white/50 border-white/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="bg-white/50 border-white/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    className="bg-white/50 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sex">Sex</Label>
                  <Select onValueChange={(value) => updateFormData("sex", value)}>
                    <SelectTrigger className="bg-white/50 border-white/30">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (inches)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => updateFormData("height", e.target.value)}
                    className="bg-white/50 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateFormData("weight", e.target.value)}
                    className="bg-white/50 border-white/30"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Health Goals & Current State</h2>
                <p className="text-slate-600">Help us understand your longevity objectives</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthGoals">Primary Health Goals</Label>
                <Textarea
                  id="healthGoals"
                  placeholder="e.g., Improve energy levels, optimize sleep, enhance cognitive function, increase longevity..."
                  value={formData.healthGoals}
                  onChange={(e) => updateFormData("healthGoals", e.target.value)}
                  className="bg-white/50 border-white/30 min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSupplements">Current Supplements & Medications</Label>
                <Textarea
                  id="currentSupplements"
                  placeholder="List any supplements, medications, or treatments you're currently taking..."
                  value={formData.currentSupplements}
                  onChange={(e) => updateFormData("currentSupplements", e.target.value)}
                  className="bg-white/50 border-white/30 min-h-[120px]"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Biomarker Data Integration</h2>
                <p className="text-slate-600">Connect your diagnostic test results for personalized insights</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-600 mb-4">
                  Select the diagnostic platforms you have test results from. You can upload data files or sync directly where supported.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-white/20 border-white/30">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="jonaHealth"
                        checked={formData.diagnosticData.jonaHealth}
                        onCheckedChange={(checked) => updateDiagnosticData("jonaHealth", checked)}
                      />
                      <div>
                        <Label htmlFor="jonaHealth" className="font-medium">Jona Health</Label>
                        <p className="text-sm text-slate-600">Comprehensive Health Optimization</p>
                      </div>
                    </div>
                    {formData.diagnosticData.jonaHealth && (
                      <div className="mt-3">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload("JonaHealth", e)}
                          className="hidden"
                          id="jonaHealth-upload"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => document.getElementById('jonaHealth-upload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Results
                        </Button>
                      </div>
                    )}
                  </Card>



                  <Card className="p-4 bg-white/20 border-white/30">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="neuroAge"
                        checked={formData.diagnosticData.neuroAge}
                        onCheckedChange={(checked) => updateDiagnosticData("neuroAge", checked)}
                      />
                      <div>
                        <Label htmlFor="neuroAge" className="font-medium">NeuroAge</Label>
                        <p className="text-sm text-slate-600">Multi-Modal</p>
                      </div>
                    </div>
                    {formData.diagnosticData.neuroAge && (
                      <div className="mt-3">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload("NeuroAge", e)}
                          className="hidden"
                          id="neuroAge-upload"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => document.getElementById('neuroAge-upload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Results
                        </Button>
                      </div>
                    )}
                  </Card>

                  <Card className="p-4 bg-white/20 border-white/30">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="iollo"
                        checked={formData.diagnosticData.iollo}
                        onCheckedChange={(checked) => updateDiagnosticData("iollo", checked)}
                      />
                      <div>
                        <Label htmlFor="iollo" className="font-medium">Iollo</Label>
                        <p className="text-sm text-slate-600">Biomarker Data</p>
                      </div>
                    </div>
                    {formData.diagnosticData.iollo && (
                      <div className="mt-3">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload("Iollo", e)}
                          className="hidden"
                          id="iollo-upload"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => document.getElementById('iollo-upload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Results
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Don't have test results yet? No problem! You can still create your profile and add diagnostic data later. 
                    We'll provide general recommendations based on your demographics and goals.
                  </p>
                </div>

                {/* Apple Health Integration */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Apple Health Integration</h3>
                  <Card className="p-6 bg-gradient-to-br from-green-50/50 to-emerald-50/50 border-green-200/30">
                    <div className="text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <Apple className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-slate-800">Enhance Your Experience</h4>
                        <p className="text-slate-600 leading-relaxed">
                          Connect your Apple Health account to automatically sync your activity, heart rate, sleep, 
                          and other health metrics. This helps us provide more personalized recommendations and track 
                          your progress over time.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <h5 className="font-medium text-slate-800">What we'll access:</h5>
                          <ul className="space-y-1 text-slate-600">
                            <li>• Activity & Exercise data</li>
                            <li>• Heart Rate & Variability</li>
                            <li>• Sleep Analysis</li>
                            <li>• Body Measurements</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-medium text-slate-800">Benefits:</h5>
                          <ul className="space-y-1 text-slate-600">
                            <li>• Real-time health tracking</li>
                            <li>• Personalized insights</li>
                            <li>• Progress monitoring</li>
                            <li>• Data-driven recommendations</li>
                          </ul>
                        </div>
                      </div>

                      {formData.appleHealthConnected ? (
                        <div className="p-4 bg-green-50/50 rounded-lg border border-green-200/30">
                          <div className="flex items-center justify-center space-x-2 text-green-800">
                            <Check className="w-5 h-5" />
                            <span className="font-medium">Apple Health Connected Successfully!</span>
                          </div>
                          <p className="text-sm text-green-700 text-center mt-2">
                            Your health data is now syncing with R42 Copilot.
                          </p>
                        </div>
                      ) : (
                        <Button 
                          onClick={handleAppleHealthConnect}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2"
                        >
                          <Apple className="w-4 h-4 mr-2" />
                          Connect Apple Health
                        </Button>
                      )}
                    </div>
                  </Card>

                  <div className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
                    <p className="text-sm text-blue-800">
                      <strong>Privacy First:</strong> Your Apple Health data is encrypted and used only to provide 
                      personalized recommendations. You can disconnect at any time in your settings.
                    </p>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm text-slate-600">
                      You can skip this step and connect Apple Health later from your dashboard settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Research Contribution</h2>
                <p className="text-slate-600">Help advance longevity science through federated learning</p>
              </div>

              <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-200/30">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="researchConsent"
                      checked={formData.researchConsent}
                      onCheckedChange={(checked) => updateFormData("researchConsent", checked)}
                      className="mt-1"
                    />
                    <div className="space-y-2">
                      <Label htmlFor="researchConsent" className="text-base font-medium">
                        Contribute to R42 Research Network
                      </Label>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        By opting in, you'll contribute your anonymized biomarker data and outcomes to R42's 
                        federated learning network. This helps improve our AI models and advances longevity 
                        research for everyone. Your personal information remains completely private and secure.
                      </p>
                    </div>
                  </div>

                  {formData.researchConsent && (
                    <div className="ml-6 space-y-3 p-4 bg-green-50/50 rounded-lg border border-green-200/30">
                      <div className="flex items-center space-x-2 text-green-800">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Thank you for contributing to longevity science!</span>
                      </div>
                      <p className="text-xs text-green-700">
                        Your contribution will help train AI models that benefit the entire longevity community. 
                        You can withdraw consent at any time in your privacy settings.
                      </p>
                    </div>
                  )}

                  <div className="text-xs text-slate-500 space-y-1">
                    <p>• All data is encrypted and anonymized before contribution</p>
                    <p>• You maintain full control over your data sharing preferences</p>
                    <p>• Contributing is optional and doesn't affect your personalized recommendations</p>
                  </div>
                </div>
              </Card>

              <div className="text-center">
                <div className="text-lg font-medium text-slate-800 mb-2">Ready to Start Your Longevity Journey?</div>
                <p className="text-slate-600">
                  Your personalized dashboard and recommendations will be generated based on your profile.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {step === 1 ? "Back to Home" : "Previous"}
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              {step === 4 ? "Complete Setup" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
