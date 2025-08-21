
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  Activity, 
  Target, 
  TrendingUp, 
  Settings, 
  User,
  Menu,
  X,
  Brain,
  FileText
} from "lucide-react";
import R42Logo from "@/components/ui/r42-logo";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
      { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Biomarkers", href: "/dashboard", icon: Activity },
  { name: "PDF Insights", href: "/pdf-insights", icon: FileText },
  { name: "Jona Health Reports", href: "/jona-health", icon: Activity },
  { name: "NeuroAge Reports", href: "/neuroage", icon: Brain },
  { name: "Iollo Reports", href: "/iollo", icon: Activity },
  { name: "Recommendations", href: "/recommendations", icon: Target },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full bg-white/30 backdrop-blur-sm border-r border-white/20">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <R42Logo size="lg" />
              <div>
                <h1 className="text-lg font-bold text-slate-800">R42 Copilot</h1>
                <p className="text-xs text-slate-600">Longevity Platform</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all
                    ${isActive(item.href)
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-white/40"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/20">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  AJ
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-slate-800">Alex Johnson</div>
                <div className="text-sm text-slate-600">Premium Member</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/30 backdrop-blur-sm border-b border-white/20">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-600">
                Last sync: 2 hours ago
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                Sync Data
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
