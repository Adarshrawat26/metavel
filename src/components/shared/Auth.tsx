import React, { useState } from "react";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface AuthProps {
  onLogin: () => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [view, setView] = useState<"login" | "forgot" | "reset" | "success">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (view === "login") onLogin();
      else if (view === "forgot") setView("reset");
      else if (view === "reset") setView("success");
    }, 1500);
  };

  const renderContent = () => {
    switch (view) {
      case "login":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded mx-auto">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-black tracking-tighter uppercase">Metaval</h1>
                <p className="text-black/30 font-black tracking-[0.2em] uppercase text-[16px]">Contract & Procurement</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[16px] font-black text-black/30 uppercase tracking-widest ml-1">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                    <input 
                      type="email" 
                      required
                      placeholder="name@company.com"
                      className="w-full bg-black/[0.03] border-none rounded py-3 pl-12 pr-4 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[16px] font-black text-black/30 uppercase tracking-widest">Password</label>
                    <button 
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-[16px] font-black text-black/40 hover:text-black uppercase tracking-widest"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="••••••••"
                      className="w-full bg-black/[0.03] border-none rounded py-3 pl-12 pr-12 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 hover:text-black"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FF7A45] text-white font-black py-4 rounded text-[15px] uppercase tracking-[0.2em] transition-all hover:bg-[#F26636] disabled:opacity-50"
              >
                {isLoading ? "Authenticating..." : "Enter Workspace"}
              </button>
            </form>
          </motion.div>
        );

      case "forgot":
        return (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-sm space-y-8"
          >
            <button onClick={() => setView("login")} className="flex items-center gap-2 text-black/40 hover:text-black transition-all text-[16px] font-black uppercase tracking-widest">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <div className="space-y-4">
              <h2 className="text-xl font-black text-black uppercase tracking-tight">Recovery</h2>
              <p className="text-black/40 text-xs font-bold leading-relaxed">Enter your work email and we'll send a recovery token.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="email" 
                required
                placeholder="name@company.com"
                className="w-full bg-black/[0.03] border-none rounded py-3 px-4 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
              />
              <button className="w-full bg-[#FF7A45] text-white font-black py-4 rounded text-[15px] uppercase tracking-[0.2em] transition-all hover:bg-[#F26636]">
                {isLoading ? "Sending..." : "Request Token"}
              </button>
            </form>
          </motion.div>
        );

      case "reset":
        return (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-sm space-y-8"
          >
            <h2 className="text-xl font-black text-black uppercase tracking-tight">New Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="password" required placeholder="New Password" className="w-full bg-black/[0.03] border-none rounded py-3 px-4 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white" />
              <input type="password" required placeholder="Confirm Password" className="w-full bg-black/[0.03] border-none rounded py-3 px-4 text-xs outline-none focus:ring-1 focus:ring-black focus:bg-white" />
              <button className="w-full bg-[#FF7A45] text-white font-black py-4 rounded text-[15px] uppercase tracking-[0.2em] transition-all hover:bg-[#F26636]">
                Update
              </button>
            </form>
          </motion.div>
        );

      case "success":
        return (
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm text-center space-y-8"
          >
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto text-black">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-black text-black uppercase tracking-tight">Verified</h2>
              <p className="text-black/40 text-xs font-bold">Your credentials have been updated.</p>
            </div>
            <button 
              onClick={() => setView("login")}
              className="w-full bg-[#FF7A45] text-white font-black py-4 rounded text-[15px] uppercase tracking-[0.2em] transition-all hover:bg-[#F26636]"
            >
              Continue to Login
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-12 font-['Nunito_Sans']">
      {renderContent()}
    </div>
  );
}
