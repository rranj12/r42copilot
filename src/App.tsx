
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NeuroAge from "./pages/NeuroAge";
import Iollo from "./pages/Iollo";
import Retreat from "./pages/Retreat";
import WellnessHub from "./pages/WellnessHub";
import R42CoE from "./pages/R42CoE";
import Recommendations from "./pages/Recommendations";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/neuroage" element={<NeuroAge />} />
        <Route path="/iollo" element={<Iollo />} />
        <Route path="/retreat" element={<Retreat />} />
        <Route path="/wellness-hub" element={<WellnessHub />} />
        <Route path="/r42-coe" element={<R42CoE />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
