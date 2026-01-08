import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Clock,
    FileText,
    Mail,
    MoreVertical,
    PenTool,
    Plus,
    Users
} from "lucide-react";
import { useState } from "react";

export function ExecuteModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [view, setView] = useState<"list" | "prepare">("list");

  const SIGNING_FLOWS = [
    { id: "SIG-001", contract: "Global Steel MSA", counterparty: "Global Steel Corp", status: "In Progress", signers: [
      { name: "Robert Chen", role: "Internal", status: "Signed" },
      { name: "James Wilson", role: "External", status: "Pending" }
    ], sentDate: "Jan 7, 2026" },
    { id: "SIG-002", contract: "Maintenance SOW", counterparty: "SiteWorks Services", status: "Draft", signers: [
      { name: "Sarah Miller", role: "Internal", status: "Pending" },
      { name: "Emma Lou", role: "External", status: "Pending" }
    ], sentDate: "Not Sent" },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 max-w-[1200px] mx-auto bg-white text-black font-['Nunito_Sans']">
      {view === "list" ? (
        <>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Execution</h1>
              <p className="text-black/40 font-bold uppercase tracking-widest text-[13px]">Digital Signature Lifecycle</p>
            </div>
            <button 
              onClick={() => setView("prepare")}
              className="bg-[#FF7A45] text-white px-6 py-1.5 rounded text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all"
            >
              Prepare Transaction
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SIGNING_FLOWS.map((flow) => (
              <div key={flow.id} className="border border-black/5 rounded p-5 space-y-5 group">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#FF7A45] text-white rounded flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-[13px] font-black uppercase tracking-widest text-black">{flow.contract}</h3>
                      <p className="text-[12px] text-black/20 font-black uppercase tracking-widest tabular-nums">{flow.id} • {flow.counterparty}</p>
                    </div>
                  </div>
                  <span className="text-[12px] font-black uppercase tracking-[0.15em] bg-black/5 px-2 py-0.5 rounded-sm">
                    {flow.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Signatories</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {flow.signers.map((signer, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 border border-black/5 rounded">
                        <div className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-black ${
                          signer.status === 'Signed' ? 'bg-[#FF7A45] text-white' : 'bg-black/5 text-black/30'
                        }`}>
                          {signer.status === 'Signed' ? <CheckCircle2 className="w-3 h-3" /> : signer.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-black text-black uppercase tracking-widest truncate">{signer.name}</p>
                          <p className="text-[7px] text-black/30 font-black uppercase tracking-widest mt-0.5">{signer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[16px] text-black/20 font-black uppercase tracking-widest tabular-nums">SENT: {flow.sentDate}</span>
                  <div className="flex gap-4">
                    <button className="p-2 text-black/20 hover:text-black transition-colors"><Mail className="w-4 h-4" /></button>
                    <button className="p-2 text-black/20 hover:text-black transition-colors"><MoreVertical className="w-4 h-4" /></button>
                    <button className="text-[16px] font-black uppercase tracking-widest text-black hover:opacity-60 transition-all">Preview</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-2 duration-700">
          <button onClick={() => setView("list")} className="flex items-center gap-2 text-black/40 hover:text-black transition-all text-[16px] font-black uppercase tracking-widest">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <div className="bg-white border border-black/5 rounded overflow-hidden flex h-[700px]">
            {/* Setup */}
            <div className="w-72 border-r border-black/5 flex flex-col">
              <div className="p-8 border-b border-black/5 space-y-2">
                <h2 className="text-xs font-black uppercase tracking-widest">Prepare</h2>
                <p className="text-[16px] text-black/30 font-black uppercase tracking-[0.2em]">Coordinate Flow</p>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-black text-black/30 uppercase tracking-[0.2em]">Participants</h4>
                    <button className="text-black/20 hover:text-black"><Users className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 bg-[#FF7A45] text-white rounded flex items-center gap-4">
                      <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-[16px] font-black tracking-widest">01</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-black uppercase tracking-widest truncate">Robert Chen</p>
                        <p className="text-[8px] text-white/40 font-black uppercase tracking-widest mt-0.5">Internal</p>
                      </div>
                    </div>
                    <div className="p-4 bg-black/5 border border-black/5 rounded flex items-center gap-4">
                      <div className="w-6 h-6 bg-black/10 text-black/20 rounded flex items-center justify-center text-[16px] font-black tracking-widest">02</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-black uppercase tracking-widest text-black/20 truncate">External Party...</p>
                        <p className="text-[8px] text-black/20 font-black uppercase tracking-widest mt-0.5">Vendor</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[16px] font-black text-black/30 uppercase tracking-[0.2em]">Fields</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Signature", icon: PenTool },
                      { label: "Date", icon: Clock },
                    ].map((field, i) => (
                      <div key={i} className="p-6 border border-black/5 rounded flex flex-col items-center gap-3 cursor-grab hover:border-black transition-all active:scale-95 group">
                        <field.icon className="w-4 h-4 text-black/20 group-hover:text-black" />
                        <span className="text-[16px] font-black text-black/40 uppercase tracking-widest">{field.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 border-t border-black/5">
                <button className="w-full py-4 bg-[#FF7A45] text-white rounded text-[15px] font-black uppercase tracking-[0.2em] hover:bg-[#F26636] transition-all">
                  Initiate Flow
                </button>
              </div>
            </div>

            {/* Doc Viewer */}
            <div className="flex-1 bg-black/[0.02] p-12 overflow-y-auto flex flex-col items-center">
              <div className="max-w-[500px] w-full bg-white border border-black/5 p-20 space-y-16 min-h-[800px] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none -rotate-45">
                   <Building2 className="w-64 h-64" />
                </div>

                <div className="border-b border-black/5 pb-12 text-center space-y-4">
                  <h1 className="text-xl font-black text-black uppercase tracking-[0.3em]">Execution Agreement</h1>
                  <p className="text-[16px] text-black/20 font-black uppercase tracking-[0.2em]">FINAL FOR SIGNATURE • PAGE 1 OF 12</p>
                </div>

                <div className="space-y-8 text-xs text-black/60 font-bold leading-relaxed text-justify">
                  <p className="text-black uppercase tracking-widest">Witnesseth:</p>
                  <p>
                    The parties hereto have executed this Agreement as of the date first above written. 
                    The signatories represent that they have the full corporate power and authority to enter into 
                    and perform this Agreement on behalf of their respective organizations.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-16 pt-20">
                  <div className="space-y-6">
                    <p className="text-[16px] font-black text-black/20 uppercase tracking-[0.2em]">Customer</p>
                    <div className="h-20 border-b border-black flex items-center justify-center bg-black/[0.01]">
                      <span className="text-[15px] font-black uppercase tracking-widest text-black/20">Signature Space</span>
                    </div>
                    <p className="text-[15px] font-black text-black uppercase tracking-widest">METAVAL APAC</p>
                  </div>
                  <div className="space-y-6">
                    <p className="text-[16px] font-black text-black/20 uppercase tracking-[0.2em]">Supplier</p>
                    <div className="h-20 border-b border-black/5 flex items-center justify-center bg-black/[0.01] cursor-pointer hover:border-black transition-all group">
                      <Plus className="w-5 h-5 text-black/10 group-hover:text-black transition-colors" />
                    </div>
                    <p className="text-[15px] font-black text-black/20 uppercase tracking-widest">GLOBAL STEEL CORP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
