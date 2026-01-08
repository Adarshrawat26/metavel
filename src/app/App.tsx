import React from "react";
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
  const [requestModuleInitialView, setRequestModuleInitialView] = useState<"list" | "new" | "detail" | "workflow" | "edit-chat" | undefined>(undefined);

  const handleNavigate = (target: Page | { page: Page; initialView?: "list" | "new" | "detail" | "workflow" | "edit-chat" }) => {
    if (typeof target === "object" && target.page === "requests" && target.initialView) {
      setRequestModuleInitialView(target.initialView);
      setCurrentPage("requests");
    } else {
      const page = typeof target === "string" ? target : target.page;
      setRequestModuleInitialView(undefined);
      setCurrentPage(page);
    }
  };

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
      case "dashboard": return <Dashboard onNavigate={handleNavigate} />;
      case "contracts": return <SearchModule onNavigate={handleNavigate} />;
      case "tender-ai": return <TenderAIModule onNavigate={handleNavigate} />;
      case "review": return <ReviewModule onNavigate={handleNavigate} />;
      case "library": return <VendorsModule onNavigate={handleNavigate} />;
      case "risk": return <ComplyModule onNavigate={handleNavigate} />;
      case "renewals": return <ReviewModule onNavigate={handleNavigate} />;
      case "audit": return <AnalyticsModule onNavigate={handleNavigate} />;
      case "admin": return <Settings />;
      case "managers": return <VendorsModule onNavigate={handleNavigate} />;
      case "calendar": return <Dashboard onNavigate={handleNavigate} />;
      case "settings": return <Settings />;
      case "requests": return <RequestModule onNavigate={handleNavigate} initialView={requestModuleInitialView} />;
      case "generate": return <GenerateModule onNavigate={handleNavigate} />;
      case "negotiate": return <NegotiateModule onNavigate={handleNavigate} />;
      case "approval": return <ApprovalModule onNavigate={handleNavigate} />;
      case "execute": return <ExecuteModule onNavigate={handleNavigate} />;
      case "search": return <SearchModule onNavigate={handleNavigate} />;
      case "comply": return <ComplyModule onNavigate={handleNavigate} />;
      case "exit": return <ExitModule onNavigate={handleNavigate} />;
      case "vendors": return <VendorsModule onNavigate={handleNavigate} />;
      case "analytics": return <AnalyticsModule onNavigate={handleNavigate} />;
      default: return <Dashboard onNavigate={handleNavigate} />;
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
            <div className="flex flex-col">
              <span className="font-bold text-black tracking-tight text-xl">Metaval</span>
              <span className="text-xs text-black/40 font-bold tracking-widest uppercase">Contract & Proc</span>
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-black/40 hover:text-black hover:bg-black/5 transition-all group border border-transparent hover:border-black/10"
          >
            <LogOut className="w-4 h-4 shrink-0 text-black/30 group-hover:text-black transition-colors" />
            {isSidebarOpen && <span className="text-[12px] font-black uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Topbar */}
        <header className="h-20 border-b border-black/5 bg-white flex items-center justify-between px-8 shrink-0 z-10 sticky top-0 backdrop-blur-sm bg-white/95">
          <div className="flex items-center gap-8 flex-1 min-w-0">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-black/40 shrink-0">
              <span className="hover:text-black transition-colors cursor-pointer">Metaval</span>
              <ChevronRight className="w-3 h-3 text-black/20" />
              <span className="text-black font-black">{getPageTitle()}</span>
            </div>

            {/* Search */}
            <div className="flex items-center flex-1 max-w-lg relative min-w-0">
              <Search className="w-4 h-4 text-black/30 absolute left-4 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search contracts, documents, or users..." 
                className="w-full bg-black/5 border border-transparent rounded-lg py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#FF7A45]/20 focus:border-[#FF7A45] focus:bg-white transition-all outline-none text-black placeholder:text-black/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-6 shrink-0">
            <button className="flex items-center gap-2 bg-[#FF7A45] text-white px-5 py-2.5 rounded-lg text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all shadow-sm hover:shadow-md">
              <Plus className="w-4 h-4" />
              <span>New</span>
            </button>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 text-black/40 hover:text-black hover:bg-black/5 rounded-lg transition-all group">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#FF7A45] rounded-full border-2 border-white ring-1 ring-white"></span>
              </button>
              
              <div className="flex items-center gap-3 cursor-pointer group px-2 py-1.5 rounded-lg hover:bg-black/5 transition-all">
                <div className="w-10 h-10 bg-[#FF7A45] rounded-full flex items-center justify-center text-white text-sm font-black uppercase shrink-0 shadow-sm">
                  RC
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-black text-black leading-tight">Robert Chen</p>
                  <p className="text-[10px] text-black/40 mt-0.5 uppercase tracking-widest font-bold">Admin</p>
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
