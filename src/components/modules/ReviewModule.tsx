import React, { useState } from "react";
import {
    AlertCircle,
    Brain,
    ChevronLeft,
    MessageSquare,
    Star,
    TrendingUp,
    Zap
} from "lucide-react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const performanceData = [
  { month: "Jul", reliability: 92, delivery: 88 },
  { month: "Aug", reliability: 94, delivery: 91 },
  { month: "Sep", reliability: 89, delivery: 95 },
  { month: "Oct", reliability: 91, delivery: 92 },
  { month: "Nov", reliability: 96, delivery: 94 },
  { month: "Dec", reliability: 95, delivery: 96 },
];

export function ReviewModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [showRenewalAI, setShowRenewalAI] = useState(false);

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 max-w-[1200px] mx-auto bg-white text-black font-['Nunito_Sans']">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Review</h1>
          <p className="text-black/40 font-bold uppercase tracking-widest text-[13px]">Evaluating SteelCraft Ltd • CON-829</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowRenewalAI(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#FF7A45] text-white rounded text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all"
          >
            <Brain className="w-3 h-3" />
            Renewal Assessment
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 border-y border-black/5 py-6">
        {[
          { label: "Performance Score", value: "4.8" },
          { label: "Reliability", value: "98%" },
          { label: "Quality", value: "92%" },
          { label: "Response", value: "75%" },
        ].map((kpi, i) => (
          <div key={i} className="space-y-1">
            <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">{kpi.label}</p>
            <h3 className="text-2xl font-black text-black">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Scorecard */}
            <div className="border border-black/5 rounded p-5 space-y-6">
              <div className="space-y-4">
                <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-black/30">Vendor Scorecard</h3>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black text-black tabular-nums">4.8</span>
                  <div className="space-y-1">
                    <div className="flex text-black gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-widest">Performance Index</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { l: "Reliability", s: 98 },
                    { l: "Quality", s: 92 },
                    { l: "Response", s: 75 },
                    { l: "Cost", s: 88 },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                        <span className="text-black/40">{stat.l}</span>
                        <span className="text-black">{stat.s}%</span>
                      </div>
                      <div className="w-full bg-black/5 h-px">
                        <div className="h-full bg-black transition-all duration-1000" style={{ width: `${stat.s}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center gap-2.5">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-black/5 flex items-center justify-center text-[11px] font-black text-black">
                      {["JD", "MR", "SJ"][i - 1]}
                    </div>
                  ))}
                </div>
                <p className="text-[12px] text-black/40 font-bold uppercase tracking-widest">3 Stakeholders</p>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="lg:col-span-2 border border-black/5 rounded p-10 flex flex-col space-y-12">
              <div className="flex justify-between items-center">
                <h3 className="text-[16px] font-black uppercase tracking-[0.2em] text-black/30">Trend Analysis</h3>
                <div className="flex gap-8">
                  <div className="flex items-center gap-2 text-[16px] font-black text-black uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-black" /> Reliability
                  </div>
                  <div className="flex items-center gap-2 text-[16px] font-black text-black/30 uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-black/10" /> Delivery
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fontWeight: 900, fill: '#cccccc' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fontWeight: 900, fill: '#cccccc' }} 
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '4px', border: '1px solid #f0f0f0', boxShadow: 'none', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase' }} 
                    />
                    <Line type="monotone" dataKey="reliability" stroke="#000000" strokeWidth={2} dot={{ r: 3, fill: '#000000' }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="delivery" stroke="#cccccc" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3, fill: '#cccccc' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

      {/* Events Timeline */}
      <div className="border border-black/5 rounded p-10">
        <h3 className="text-[16px] font-black uppercase tracking-[0.2em] text-black/30 mb-12">Milestones</h3>
        <div className="space-y-12 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1px] before:bg-black/5">
          {[
            { type: "Renewal", title: "Amendment #2 Signed", date: "Nov 12, 2025", desc: "Volume discount tiered applied to pumps above 500 units.", icon: Zap },
            { type: "Dispute", title: "Quality Incident", date: "Sep 22, 2025", desc: "Batch #829 returned due to seal failure. Resolved in 48h.", icon: AlertCircle, color: "text-amber-500" },
            { type: "Review", title: "Strategy Meeting", date: "Jun 15, 2025", desc: "Aligned on 2026 expansion plans for the Brazil facility.", icon: MessageSquare },
          ].map((ev, i) => (
            <div key={i} className="flex gap-8 relative">
              <div className={`w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 z-10 border border-black/5 ${ev.type === "Dispute" ? "text-amber-500" : "text-black"}`}>
                <ev.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-[16px] font-black text-black uppercase tracking-widest">{ev.title}</h4>
                  <span className="text-[16px] text-black/20 font-black uppercase tracking-widest">{ev.date}</span>
                </div>
                <p className="text-[16px] text-black/40 font-bold leading-relaxed">{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Renewal Assessment Overlay */}
      {showRenewalAI && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center p-12 z-50 animate-in fade-in duration-300">
            <div className="bg-white border border-black/10 shadow-2xl max-w-xl w-full p-12 space-y-12 relative">
              <button 
                onClick={() => setShowRenewalAI(false)}
                className="absolute top-8 right-8 p-2 text-black/20 hover:text-black transition-all"
              >
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </button>
              
              <div className="flex items-center gap-6">
                <div className="p-4 bg-[#FF7A45] text-white rounded">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-black uppercase tracking-tight">Assessment</h2>
                  <p className="text-[16px] text-black/30 font-black tracking-widest uppercase">SteelCraft Ltd • CON-829</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-black/5 p-8 rounded space-y-4">
                  <div className="flex items-center gap-2 text-black font-black text-[15px] uppercase tracking-widest">
                    <TrendingUp className="w-4 h-4" />
                    Verdict: Renew & Optimize
                  </div>
                  <p className="text-xs text-black/60 font-bold leading-relaxed">
                    Vendor is a high-performer. Market benchmarks suggest a 4.5% price reduction is achievable during renewal due to raw material price drops.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Market Benchmarking",
                    "Price Escalation Clause",
                    "48-Month Extension",
                    "Indemnity Cap Update"
                  ].map((s, i) => (
                    <div key={i} className="flex gap-3 text-[16px] bg-black/[0.02] p-4 border border-black/5 font-black uppercase tracking-widest text-black">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-1 shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => onNavigate("requests")}
                  className="flex-1 bg-[#FF7A45] text-white py-4 rounded text-[15px] font-black uppercase tracking-[0.2em] hover:bg-[#F26636] transition-all"
                >
                  Start Renewal
                </button>
                <button 
                  onClick={() => onNavigate("exit")}
                  className="px-8 border border-black/10 text-black/30 py-4 rounded text-[15px] font-black uppercase tracking-[0.2em] hover:text-black hover:bg-black/5 transition-all"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
