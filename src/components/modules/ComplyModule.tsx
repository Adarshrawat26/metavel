import React from "react";
import {
    Calendar,
    ShieldAlert,
    Zap,
} from "lucide-react";

export function ComplyModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 max-w-[1200px] mx-auto bg-white text-black font-['Nunito_Sans']">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Compliance</h1>
          <p className="text-black/40 font-bold uppercase tracking-widest text-[13px]">Risk Assessment & Obligations</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-black/5 border border-black/5 rounded text-[12px] font-black uppercase tracking-widest hover:bg-black/10 transition-all">
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#FF7A45] text-white rounded text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all">
            Registry
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-4 border-y border-black/5 py-6">
        {[
          { label: "Risk Index", value: "72" },
          { label: "Active Obligations", value: "8" },
          { label: "Due Today", value: "2" },
          { label: "Overdue", value: "1" },
          { label: "Compliance Rate", value: "94%" },
        ].map((kpi, i) => (
          <div key={i} className="space-y-1">
            <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">{kpi.label}</p>
            <h3 className="text-2xl font-black text-black">{kpi.value}</h3>
          </div>
        ))}
      </div>

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
              <div className="border border-black/5 rounded-lg overflow-hidden bg-white">
                <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white">
                  <h2 className="text-xl font-black uppercase tracking-tight text-black">Obligations</h2>
                  <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-black/5 border border-black/10 rounded-lg text-[12px] font-black uppercase tracking-widest text-black/60 hover:bg-black/10 hover:text-black transition-all">
                      Filters
                    </button>
                    <button className="px-5 py-2.5 bg-[#FF7A45] text-white rounded-lg text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all shadow-sm hover:shadow-md">
                      Registry
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/[0.02] border-b border-black/5">
                      <tr>
                        <th className="px-6 py-4 text-left text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Requirement</th>
                        <th className="px-6 py-4 text-left text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Due</th>
                        <th className="px-6 py-4 text-left text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Lead</th>
                        <th className="px-6 py-4 text-left text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {[
                        { name: "Safety Audit", section: "Section 12.4", policy: "Corporate Policy", due: "Jan 15, 2026", owner: "Mike R.", status: "Pending", statusColor: "bg-black/5 text-black/40" },
                        { name: "Price Review", section: "Section 12.4", policy: "Corporate Policy", due: "Feb 01, 2026", owner: "Sarah J.", status: "Scheduled", statusColor: "bg-black/5 text-black/40" },
                        { name: "Performance Review", section: "Section 8.2", policy: "Vendor Management", due: "Mar 15, 2026", owner: "Emma W.", status: "Scheduled", statusColor: "bg-black/5 text-black/40" },
                        { name: "Emissions Report", section: "Section 15.1", policy: "ESG Compliance", due: "Mar 31, 2026", owner: "ESG Team", status: "Scheduled", statusColor: "bg-black/5 text-black/40" },
                        { name: "Site Training", section: "Section 7.3", policy: "Safety Protocol", due: "Jan 05, 2026", owner: "John K.", status: "Overdue", statusColor: "bg-red-500/10 text-red-600" },
                        { name: "Insurance Update", section: "Section 11.2", policy: "Risk Management", due: "Jan 20, 2026", owner: "Robert C.", status: "Pending", statusColor: "bg-black/5 text-black/40" },
                        { name: "Compliance Audit", section: "Section 9.5", policy: "Regulatory", due: "Feb 10, 2026", owner: "Sarah M.", status: "Scheduled", statusColor: "bg-black/5 text-black/40" },
                      ].map((ob, i) => (
                        <tr key={i} className="hover:bg-black/[0.02] transition-colors group cursor-pointer">
                          <td className="px-6 py-5">
                            <div className="space-y-1.5">
                              <p className="text-[14px] font-black text-black uppercase tracking-widest leading-tight">{ob.name}</p>
                              <div className="flex items-center gap-2 text-[12px] text-black/30 font-bold uppercase tracking-widest">
                                <span>{ob.section}</span>
                                <span>•</span>
                                <span>{ob.policy}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2.5 text-black/50 text-[13px] font-black uppercase tracking-widest tabular-nums">
                              <Calendar className="w-4 h-4 text-black/30" />
                              <span>{ob.due}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-[13px] font-black text-black/50 uppercase tracking-widest">{ob.owner}</p>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center px-3 py-1 rounded-md text-[12px] font-black uppercase tracking-widest ${ob.statusColor}`}>
                              {ob.status}
                            </span>
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
  );
}
