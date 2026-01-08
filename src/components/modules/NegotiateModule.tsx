import {
    ArrowLeft,
    Check,
    Download,
    MessageSquare,
    Send,
    X
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export function NegotiateModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [activePane, setActivePane] = useState<"redline" | "status">("redline");
  const [selectedClause, setSelectedClause] = useState<number | null>(null);

  const CLAUSES = [
    { 
      id: 1, 
      title: "4.1 Liability Cap", 
      original: "The total aggregate liability of the Supplier under this Agreement shall not exceed 100% of the total Fees paid in the 12 months preceding the event.",
      revised: "The total aggregate liability of the Supplier under this Agreement shall not exceed 200% of the total Fees paid in the 12 months preceding the event.",
      status: "Revised",
      comments: 3
    },
    { 
      id: 2, 
      title: "4.2 Indemnification", 
      original: "Supplier shall indemnify and hold harmless the Customer from and against any and all claims, damages, and costs arising out of Supplier's negligence.",
      revised: "Supplier shall indemnify and hold harmless the Customer from and against any and all third-party claims, damages, and costs arising out of Supplier's gross negligence.",
      status: "Conflict",
      comments: 1
    },
    { 
      id: 3, 
      title: "7.1 Intellectual Property", 
      original: "Customer shall own all Intellectual Property Rights in the Deliverables created by Supplier during the term of this Agreement.",
      revised: "Customer shall own all Intellectual Property Rights in the Deliverables created specifically for Customer by Supplier during the term of this Agreement, excluding Pre-existing Materials.",
      status: "Accepted",
      comments: 0
    }
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden font-['Nunito_Sans'] text-black">
      {/* Header */}
      <header className="border-b border-black/5 flex items-center justify-between px-6 py-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("contracts")} className="p-1.5 hover:bg-black/5 rounded transition-colors text-black/20 hover:text-black">
            <ArrowLeft className="w-3 h-3" />
          </button>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Negotiate</h1>
              <span className="px-2 py-0.5 bg-[#FF7A45] text-white rounded text-[12px] font-black uppercase tracking-[0.15em]">Round 3</span>
            </div>
            <p className="text-black/40 font-bold uppercase tracking-widest text-[13px]">Global Steel MSA • Contract Review</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-black/5 border border-black/5 rounded p-0.5">
            <button 
              onClick={() => setActivePane("redline")}
              className={`px-3 py-1.5 text-[12px] font-black uppercase tracking-widest rounded transition-all ${activePane === 'redline' ? 'bg-[#FF7A45] text-white shadow-sm' : 'text-black/40 hover:text-black hover:bg-black/5'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setActivePane("status")}
              className={`px-3 py-1.5 text-[12px] font-black uppercase tracking-widest rounded transition-all ${activePane === 'status' ? 'bg-[#FF7A45] text-white shadow-sm' : 'text-black/40 hover:text-black hover:bg-black/5'}`}
            >
              Status
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-black/5 border border-black/5 rounded text-[12px] font-black uppercase tracking-widest hover:bg-black/10 transition-all">
            <Download className="w-3 h-3" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#FF7A45] text-white rounded text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all">
            <Send className="w-3 h-3" /> Transmit
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor */}
        <div className="flex-1 overflow-y-auto p-12 bg-black/[0.02]">
          <div className="max-w-4xl mx-auto bg-white border border-black/5 min-h-[1000px] p-20 space-y-12">
            <div className="border-b border-black/5 pb-12 text-center space-y-4">
              <h1 className="text-2xl font-black text-black uppercase tracking-[0.3em]">Master Services Agreement</h1>
              <p className="text-[16px] text-black/30 font-black uppercase tracking-[0.2em]">v3.2 • Internal Draft • Jan 7, 2026</p>
            </div>

            {CLAUSES.map((clause) => (
              <div 
                key={clause.id}
                onClick={() => setSelectedClause(clause.id)}
                className={`group relative p-8 rounded transition-all cursor-pointer border ${
                  selectedClause === clause.id ? 'border-black bg-black/[0.01]' : 'border-transparent hover:bg-black/[0.02]'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-[16px] font-black uppercase tracking-widest text-black">{clause.title}</h3>
                  <div className="flex items-center gap-4">
                    {clause.status === 'Conflict' && (
                      <span className="px-2 py-0.5 bg-[#FF7A45] text-white rounded text-[8px] font-black uppercase tracking-widest">Conflict</span>
                    )}
                    {clause.comments > 0 && (
                      <span className="flex items-center gap-1.5 text-[16px] text-black/30 font-black uppercase tracking-widest">
                        <MessageSquare className="w-3 h-3" /> {clause.comments}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-12 text-xs leading-relaxed font-bold">
                  <div className="text-black/20 line-through decoration-black/10 decoration-1">
                    {clause.original}
                  </div>
                  <div className="text-black/60 p-4 bg-black/[0.02] border-l border-black">
                    {clause.revised}
                  </div>
                </div>

                {selectedClause === clause.id && (
                  <div className="absolute -right-16 top-0 flex flex-col gap-2">
                    <button onClick={() => toast.success("Accepted")} className="p-3 bg-[#FF7A45] text-white rounded-full shadow-xl hover:bg-[#F26636] hover:scale-105 transition-transform"><Check className="w-4 h-4" /></button>
                    <button onClick={() => toast.error("Rejected")} className="p-3 bg-white text-black border border-black/10 rounded-full shadow-xl hover:scale-105 transition-transform"><X className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            ))}

            <div className="text-[16px] text-black/20 font-black uppercase tracking-[0.2em] mt-20 text-center">
              End of Document • Page 1 of 42
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-96 bg-white border-l border-black/5 flex flex-col shrink-0">
          <div className="flex border-b border-black/5">
            <button className="flex-1 py-4 text-[16px] font-black text-black border-b border-black uppercase tracking-widest">Discussion</button>
            <button className="flex-1 py-4 text-[16px] font-black text-black/20 hover:text-black transition-colors uppercase tracking-widest">AI Insights</button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {selectedClause ? (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="text-[16px] font-black text-black/30 uppercase tracking-[0.2em]">Thread: Clause {selectedClause}</h4>
                  <button onClick={() => setSelectedClause(null)} className="text-[16px] font-black text-black hover:opacity-60 uppercase tracking-widest">Close</button>
                </div>

                <div className="space-y-8">
                  {[
                    { user: "James Wilson (Vendor)", avatar: "JW", text: "Standard industrial policy requires 200% for this risk tier.", time: "2h ago", side: "external" },
                    { user: "Sarah Miller (Legal)", avatar: "SM", text: "Acceptable if we tighten indemnification in 4.2.", time: "45m ago", side: "internal" },
                  ].map((msg, i) => (
                    <div key={i} className={`flex flex-col gap-2 ${msg.side === 'internal' ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-black ${msg.side === 'internal' ? 'bg-[#FF7A45] text-white' : 'bg-black/5 text-black/30'}`}>
                          {msg.avatar}
                        </div>
                        <span className="text-[16px] font-black text-black uppercase tracking-widest">{msg.user}</span>
                      </div>
                      <div className={`max-w-[90%] p-4 rounded text-[16px] font-bold leading-relaxed border ${
                        msg.side === 'internal' ? 'bg-[#FF7A45] text-white border-[#FF7A45]' : 'bg-black/[0.02] text-black border-black/5'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-black/20 font-black uppercase tracking-widest">{msg.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center text-black/10">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-[16px] font-black text-black uppercase tracking-widest">Selection Required</h4>
                  <p className="text-[16px] text-black/30 font-black uppercase tracking-[0.2em] leading-relaxed">Select a clause in the editor to view specific discussions.</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 border-t border-black/5 bg-black/[0.01]">
            <div className="relative">
              <textarea 
                rows={3}
                placeholder="Type your negotiation message or clause change request..."
                className="w-full bg-white border border-black/10 rounded p-4 text-[16px] font-bold outline-none focus:ring-1 focus:ring-black transition-all resize-none"
              />
              <button className="absolute right-4 bottom-4 p-2 bg-[#FF7A45] text-white rounded hover:bg-[#F26636] transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
