import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Database,
    FileText,
    LogOut,
    Send,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StageIndicator } from "../shared/StageIndicator";

export function ExitModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [exitType, setExitType] = useState<"natural" | "cause" | "convenience">("natural");

  const handleTerminate = () => {
    toast.error("Termination sequence initiated.");
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-['Nunito_Sans'] text-black">
      <StageIndicator currentStage={9} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
            <div className="p-3 bg-[#FF7A45] text-white rounded">
              <LogOut className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Termination</h1>
              <p className="text-black/40 font-black uppercase tracking-widest text-[12px]">Contract Exit & Handover Protocols</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "natural", label: "Natural Expiry", desc: "End of Term", icon: Clock },
              { id: "cause", label: "For Cause", desc: "Due to Breach", icon: AlertTriangle },
              { id: "convenience", label: "Convenience", desc: "30-Day Notice", icon: FileText },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setExitType(type.id as any)}
                className={`p-5 rounded border-2 text-left transition-all ${
                  exitType === type.id 
                  ? "bg-[#FF7A45] border-[#FF7A45] text-white" 
                  : "bg-white border-black/5 text-black/40 hover:border-black/20"
                }`}
              >
                <div className={`p-1.5 rounded mb-3 w-fit ${exitType === type.id ? "bg-white text-black" : "bg-[#FF7A45] text-white"}`}>
                  <type.icon className="w-4 h-4" />
                </div>
                <h3 className="text-[12px] font-black uppercase tracking-widest">{type.label}</h3>
                <p className="text-[12px] font-black uppercase tracking-widest mt-1.5 opacity-60">{type.desc}</p>
              </button>
            ))}
          </div>

          <div className="border border-black/5 rounded overflow-hidden">
            <div className="p-5 border-b border-black/5 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-black/20" />
              <h2 className="text-lg font-black uppercase tracking-tight">Closure Checklist</h2>
            </div>
            <div className="p-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-[12px] font-black text-black/30 uppercase tracking-[0.2em]">Administrative</h3>
                  <div className="space-y-2">
                    {[
                      "Termination Notice Dispatched",
                      "Final Ledger Settlement",
                      "Pending Orders Closed",
                      "Bonds Released"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-4 h-4 rounded border border-black/10 flex items-center justify-center group-hover:border-black transition-colors">
                          <CheckCircle2 className="w-3 h-3 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-widest text-black/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[12px] font-black text-black/30 uppercase tracking-[0.2em]">Operations</h3>
                  <div className="space-y-2">
                    {[
                      "Access Credentials Revoked",
                      "IP/Technical Transfer",
                      "Asset Reclaim Complete",
                      "Data Sanitization"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-4 h-4 rounded border border-black/10 flex items-center justify-center group-hover:border-black transition-colors">
                          <CheckCircle2 className="w-3 h-3 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-widest text-black/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#FF7A45] text-white p-5 rounded space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-white/40" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Debrief</h3>
                </div>
                <p className="text-[12px] text-white/40 font-black uppercase tracking-widest leading-relaxed">
                  Capture exit rationale to optimize future procurement strategies.
                </p>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded p-3 text-[14px] font-bold text-white outline-none focus:ring-1 focus:ring-white transition-all resize-none"
                  placeholder="EXPLANATION CODE..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleTerminate}
              className="flex-1 bg-[#FF7A45] text-white p-3 rounded text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#F26636] transition-all flex items-center justify-center gap-3"
            >
              <Send className="w-4 h-4" />
              Execute Closure
            </button>
            <button 
              onClick={() => onNavigate("review")}
              className="px-8 border border-black/10 text-black/40 rounded text-[12px] font-black uppercase tracking-[0.2em] hover:text-black hover:bg-black/5 transition-all"
            >
              Abort
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
