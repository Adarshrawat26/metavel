import {
    Calendar,
    ShieldAlert,
    Zap,
} from "lucide-react";

export function ComplyModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-['Nunito_Sans'] text-black">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1200px] mx-auto space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Risk Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div className="border border-black/5 rounded p-5 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black uppercase tracking-tight">Risk Index</h2>
                  <div className="p-2 bg-[#FF7A45] text-white rounded">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col items-center py-3">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-black/5" />
                      <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="377" strokeDashoffset="94" className="text-black transition-all duration-1000" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-black tabular-nums">72</span>
                      <span className="text-[11px] font-black text-black/30 uppercase tracking-[0.15em] mt-1">Elevated</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: "Financial Exposure", score: "High" },
                    { label: "Data Privacy", score: "Medium" },
                    { label: "Supply Resilience", score: "Low" },
                  ].map((risk, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded bg-black/[0.02] border border-black/5">
                      <span className="text-[12px] font-black uppercase tracking-widest text-black/40">{risk.label}</span>
                      <span className="text-[11px] font-black px-1.5 py-0.5 rounded uppercase bg-[#FF7A45] text-white">{risk.score}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-[11px] text-black/30 leading-relaxed font-black uppercase tracking-widest pt-4 border-t border-black/5">
                  AI identified non-standard liability and expired insurance certificates.
                </p>
              </div>

              <div className="bg-[#FF7A45] text-white rounded p-5 space-y-5">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-white/40" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Enforcement</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full bg-white/5 hover:bg-white/10 p-3 rounded text-left border border-white/10 transition-all group">
                    <p className="text-[12px] font-black uppercase tracking-widest">Insurance Update</p>
                    <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mt-1">12 Days Overdue</p>
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 p-3 rounded text-left border border-white/10 transition-all group">
                    <p className="text-[12px] font-black uppercase tracking-widest">Trigger Audit</p>
                    <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mt-1">SLA Variance &gt; 15%</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Obligations */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-black/5 rounded">
                <div className="p-5 border-b border-black/5 flex justify-between items-center">
                  <h2 className="text-lg font-black uppercase tracking-tight">Obligations</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-black/5 rounded text-[11px] font-black uppercase tracking-widest">Filters</button>
                    <button className="px-4 py-1.5 bg-[#FF7A45] text-white rounded text-[11px] font-black uppercase tracking-widest">Registry</button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[12px] font-black text-black/20 uppercase tracking-[0.15em] border-b border-black/5">
                        <th className="px-5 py-4">Requirement</th>
                        <th className="px-5 py-4">Due</th>
                        <th className="px-5 py-4">Lead</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {[
                        { name: "Safety Audit", due: "Jan 15, 2026", owner: "Mike R.", status: "Pending" },
                        { name: "Price Review", due: "Feb 01, 2026", owner: "Sarah J.", status: "Scheduled" },
                        { name: "Performance Bond", due: "Dec 30, 2025", owner: "Vendor", status: "Closed" },
                        { name: "Emissions Report", due: "Mar 31, 2026", owner: "ESG Team", status: "Scheduled" },
                        { name: "Site Training", due: "Jan 05, 2026", owner: "John K.", status: "Overdue" },
                      ].map((ob, i) => (
                        <tr key={i} className="hover:bg-black/[0.01] transition-colors group cursor-pointer">
                          <td className="px-10 py-8">
                            <p className="text-[16px] font-black text-black uppercase tracking-widest group-hover:opacity-60 transition-opacity">{ob.name}</p>
                            <p className="text-[16px] text-black/20 font-black mt-2 uppercase tracking-widest">Section 12.4 • Corporate Policy</p>
                          </td>
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-3 text-black/40 text-[15px] font-black uppercase tracking-widest tabular-nums">
                              <Calendar className="w-3.5 h-3.5" />
                              {ob.due}
                            </div>
                          </td>
                          <td className="px-10 py-8 text-[15px] font-black text-black/40 uppercase tracking-widest">
                            {ob.owner}
                          </td>
                          <td className="px-10 py-8">
                            <span className={`text-[16px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm ${
                              ob.status === "Overdue" ? "bg-[#FF7A45] text-white" : "bg-black/5 text-black/30"
                            }`}>
                              {ob.status}
                            </span>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <button 
                              onClick={() => onNavigate("review")}
                              className="text-[16px] font-black text-black hover:opacity-40 uppercase tracking-widest"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
