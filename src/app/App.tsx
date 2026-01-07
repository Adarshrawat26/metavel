import {
  Bell,
  Building2,
  ChevronRight,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

// Types
import type { Page } from "../types";

// Components
import {
  AnalyticsModule,
  ApprovalModule,
  ComplyModule,
  Dashboard,
  ExecuteModule,
  ExitModule,
  GenerateModule,
  NegotiateModule,
  RequestModule,
  ReviewModule,
  SearchModule,
  TenderAIModule,
  VendorsModule,
} from "../components/modules";
import { Auth, Settings } from "../components/shared";

// Constants
import { NAV_GROUPS, NAV_ITEMS } from "../constants/navigation";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isLoggedIn) {
    return (
      <>
        <Toaster position="top-right" />
        <Auth onLogin={() => setIsLoggedIn(true)} />
      </>
    );
  }

  const getPageTitle = () => {
    const item = NAV_ITEMS.find(n => n.id === currentPage);
    return item ? item.label : "Dashboard";
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard onNavigate={setCurrentPage} />;
      case "contracts": return <SearchModule onNavigate={setCurrentPage} />;
      case "tender-ai": return <TenderAIModule onNavigate={setCurrentPage} />;
      case "review": return <ReviewModule onNavigate={setCurrentPage} />;
      case "library": return <VendorsModule onNavigate={setCurrentPage} />;
      case "risk": return <ComplyModule onNavigate={setCurrentPage} />;
      case "renewals": return <ReviewModule onNavigate={setCurrentPage} />;
      case "audit": return <AnalyticsModule onNavigate={setCurrentPage} />;
      case "admin": return <Settings />;
      case "managers": return <VendorsModule onNavigate={setCurrentPage} />;
      case "calendar": return <Dashboard onNavigate={setCurrentPage} />;
      case "settings": return <Settings />;
      case "requests": return <RequestModule onNavigate={setCurrentPage} />;
      case "generate": return <GenerateModule onNavigate={setCurrentPage} />;
      case "negotiate": return <NegotiateModule onNavigate={setCurrentPage} />;
      case "approval": return <ApprovalModule onNavigate={setCurrentPage} />;
      case "execute": return <ExecuteModule onNavigate={setCurrentPage} />;
      case "search": return <SearchModule onNavigate={setCurrentPage} />;
      case "comply": return <ComplyModule onNavigate={setCurrentPage} />;
      case "exit": return <ExitModule onNavigate={setCurrentPage} />;
      case "vendors": return <VendorsModule onNavigate={setCurrentPage} />;
      case "analytics": return <AnalyticsModule onNavigate={setCurrentPage} />;
      default: return <Dashboard onNavigate={setCurrentPage} />;
    }
  };


  const handleLogout = () => {
    toast.info("Logging out...");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex h-screen bg-white text-black font-['Nunito_Sans']">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-black/5 transition-all duration-300 flex flex-col shrink-0 z-20`}
      >
        {/* Brand Section */}
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-black tracking-tight text-base">Metaval</span>
                <span className="text-[10px] text-black/40 font-bold tracking-widest uppercase">Contract & Proc</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center mx-auto">
              <Building2 className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto custom-scrollbar">
          {NAV_GROUPS.map((group) => (
            <div key={group} className="space-y-1">
              {isSidebarOpen && (
                <h3 className="px-4 text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-3">{group}</h3>
              )}
              {NAV_ITEMS.filter(item => item.group === group).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={`w-full group flex items-center gap-3 px-4 py-2 rounded transition-all ${
                    currentPage === item.id 
                      ? "bg-black text-white font-semibold" 
                      : "text-black/50 hover:text-black hover:bg-black/5"
                  }`}
                >
                  <item.icon className={`w-4 h-4 shrink-0 ${currentPage === item.id ? "text-white" : "text-black/40 group-hover:text-black"}`} />
                  {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-black/5 space-y-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 text-black/30 hover:text-black hover:bg-black/5 rounded transition-all"
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded text-black/30 hover:text-black hover:bg-black/5 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Topbar */}
        <header className="h-16 border-b border-black/5 flex items-center justify-between px-10 shrink-0 z-10">
          <div className="flex items-center gap-12 flex-1">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/30">
              <span>Metaval</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-black">{getPageTitle()}</span>
            </div>

            {/* Search */}
            <div className="flex items-center flex-1 max-w-md relative">
              <Search className="w-3.5 h-3.5 text-black/20 absolute left-3" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-black/5 border-none rounded py-1.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-black focus:bg-white transition-all outline-none text-black"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 ml-4">
            <button className="flex items-center gap-2 bg-[#FF7A45] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#F26636] transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-black/20 hover:text-black hover:bg-black/5 rounded transition-all">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-black rounded-full border border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-8 h-8 bg-black/5 rounded flex items-center justify-center text-black border border-black/5 transition-all group-hover:border-black/10">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left hidden xl:block">
                  <p className="text-sm font-bold text-black leading-none">Robert Chen</p>
                  <p className="text-[10px] text-black/30 mt-1 uppercase tracking-widest font-bold">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
