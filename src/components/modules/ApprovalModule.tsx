import {
    Clock,
    FileText,
    ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ApprovalModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [selectedApproval, setSelectedApproval] = useState<any>(null);

  const APPROVALS = [
    { id: "APP-001", contract: "Global Steel MSA", requester: "Sarah Miller", stage: "Legal Review", due: "Today", priority: "High", value: "$2.4M" },
    { id: "APP-002", contract: "Apex Valves Supply", requester: "John Chen", stage: "Finance Approval", due: "Tomorrow", priority: "Med", value: "$850k" },
    { id: "APP-003", contract: "Mining Lease X1", requester: "Emma Wilson", stage: "Executive Review", due: "Jan 10", priority: "High", value: "$5.2M" },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 max-w-[1200px] mx-auto bg-white text-black font-['Nunito_Sans']">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Approvals</h1>
          <p className="text-black/40 font-bold uppercase tracking-widest text-[13px]">Governance & Authorization Queue</p>
        </div>
        <div className="flex bg-black/5 rounded p-1">
          <button className="bg-[#FF7A45] text-white px-3 py-1 text-[12px] font-black uppercase tracking-widest rounded shadow-sm">My Desk</button>
          <button className="px-3 py-1 text-[12px] font-black text-black/40 hover:text-black uppercase tracking-widest">Team Queue</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {APPROVALS.map((app) => (
          <div 
            key={app.id}
            onClick={() => setSelectedApproval(app)}
            className={`border rounded p-4 cursor-pointer transition-all ${
              selectedApproval?.id === app.id ? "border-black bg-black/[0.01]" : "border-black/5 hover:border-black/20"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 bg-[#FF7A45] text-white rounded flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <span className={`text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                app.priority === 'High' ? 'bg-[#FF7A45] text-white' : 'bg-black/5 text-black/30'
              }`}>
                {app.priority}
              </span>
            </div>
            <h3 className="text-[13px] font-black text-black uppercase tracking-widest mb-0.5">{app.contract}</h3>
            <p className="text-[12px] text-black/20 font-black uppercase tracking-[0.15em] mb-4 tabular-nums">{app.id} • {app.value}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px] uppercase tracking-widest font-black">
                <span className="text-black/30">Stage</span>
                <span className="text-black">{app.stage}</span>
              </div>
              <div className="flex items-center justify-between text-[12px] uppercase tracking-widest font-black">
                <span className="text-black/30">Due</span>
                <span className="text-black flex items-center gap-1.5">
                  <Clock className="w-2.5 h-2.5" /> {app.due}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-black/5 flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); toast.success("Approved!"); }}
                className="flex-1 py-2 bg-[#FF7A45] text-white text-[11px] font-black uppercase tracking-widest rounded hover:bg-[#F26636] transition-all flex items-center justify-center gap-1.5"
              >
                Approve
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); toast.error("Rejected"); }}
                className="flex-1 py-2 bg-black/5 text-black text-[11px] font-black uppercase tracking-widest rounded hover:bg-black/10 transition-all flex items-center justify-center gap-1.5"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedApproval && (
        <div className="bg-[#FF7A45] text-white rounded p-12 animate-in slide-in-from-bottom-2 duration-700 space-y-12">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white text-black rounded">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tight">Summary: {selectedApproval.contract}</h2>
                <p className="text-[16px] text-white/40 font-black uppercase tracking-[0.2em]">Workflow WF-9921-X</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[16px] font-black text-white/30 uppercase tracking-[0.2em]">Risk Analysis</h4>
                  <p className="text-xs text-white/70 font-bold leading-relaxed">
                    AI analysis flags 2 deviations in IP ownership. Finance has verified the $2.4M spend ceiling for APAC FY26.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[16px] font-black text-white/30 uppercase tracking-[0.2em]">Notes</h4>
                  <p className="text-xs text-white/70 font-bold leading-relaxed">
                    "Ensure the termination clause aligns with corporate master policy v4."
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <button className="px-10 py-3 bg-white text-black rounded text-[15px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all">
                  Grant Approval
                </button>
                <button className="px-10 py-3 bg-white/10 text-white border border-white/10 rounded text-[15px] font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all">
                  Modification
                </button>
              </div>
            </div>

            <div className="border border-white/10 rounded p-10 space-y-10">
              <h3 className="text-[15px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <Clock className="w-4 h-4 text-white/40" />
                Audit Trail
              </h3>
              <div className="space-y-10 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                {[
                  { role: "Legal Review", user: "Sarah Miller", status: "Approved", time: "2h ago" },
                  { role: "Finance Head", user: "John Chen", status: "Approved", time: "1h ago" },
                  { role: "You (Executive)", user: "Robert Chen", status: "Pending", time: "Now" },
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 relative z-10">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                      step.status === 'Approved' ? 'bg-white' :
                      step.status === 'Pending' ? 'bg-white/20 border border-white animate-pulse' :
                      'bg-white/5 border border-white/10'
                    }`} />
                    <div>
                      <p className={`text-[16px] font-black uppercase tracking-widest ${step.status === 'Pending' ? 'text-white' : 'text-white/40'}`}>{step.role}</p>
                      <p className="text-[8px] text-white/20 font-black uppercase tracking-widest mt-1">{step.user} • {step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
