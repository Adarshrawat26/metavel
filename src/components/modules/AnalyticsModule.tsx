import React from "react";
import {
    AlertCircle,
    ChevronDown,
    Clock,
    TrendingUp,
} from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const cycleTimeData = [
  { stage: "Request", avg: 2 },
  { stage: "Generate", avg: 1 },
  { stage: "Negotiate", avg: 14 },
  { stage: "Approval", avg: 5 },
  { stage: "Execute", avg: 3 },
];

const spendTrendData = [
  { month: "Jan", spend: 3.2 },
  { month: "Feb", spend: 3.8 },
  { month: "Mar", spend: 4.1 },
  { month: "Apr", spend: 3.9 },
  { month: "May", spend: 4.5 },
  { month: "Jun", spend: 5.2 },
];

const radarData = [
  { subject: 'Liability', A: 120 },
  { subject: 'IP Rights', A: 98 },
  { subject: 'Data Privacy', A: 86 },
  { subject: 'SLA Terms', A: 99 },
  { subject: 'Termination', A: 85 },
];

export function AnalyticsModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 max-w-[1200px] mx-auto bg-white text-black font-['Nunito_Sans']">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Intelligence</h1>
          <p className="text-black/40 font-bold uppercase tracking-widest text-[13px]">Strategic Portfolio Performance</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 border border-black/10 px-4 py-1.5 rounded text-[12px] font-black uppercase tracking-widest hover:bg-black/5 transition-all">
            Last 12 Months
            <ChevronDown className="w-3 h-3 opacity-40" />
          </button>
          <button className="bg-[#FF7A45] text-white px-6 py-1.5 rounded text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 border-y border-black/5 py-6">
        {[
          { label: "Contract Spend", value: "$42.5M" },
          { label: "Cycle Velocity", value: "25 Days" },
          { label: "Variance Rate", value: "18%" },
          { label: "Audit Pass Rate", value: "94.2%" },
        ].map((kpi, i) => (
          <div key={i} className="space-y-1">
            <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">{kpi.label}</p>
            <h3 className="text-2xl font-black text-black">{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <h2 className="text-lg font-black text-black uppercase tracking-tight">Performance</h2>
          </div>

          {/* Cycle Time */}
          <div className="border border-black/5 p-5 rounded space-y-5">
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Cycle Velocity by Phase</p>
              <p className="text-[12px] font-black text-black/20 uppercase tracking-[0.15em]">Target: 20 Days</p>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cycleTimeData} layout="vertical">
                  <CartesianGrid strokeDasharray="0" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#cccccc' }} width={80} />
                  <Tooltip cursor={{ fill: '#f8f8f8' }} contentStyle={{ borderRadius: '4px', border: '1px solid #f0f0f0', boxShadow: 'none', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase' }} />
                  <Bar dataKey="avg" fill="#000000" radius={[0, 0, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#FF7A45] text-white p-3 rounded flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <p className="text-[12px] font-black uppercase tracking-widest leading-relaxed">
                Negotiation remains the primary bottleneck. Enable AI auto-review for low-tier entities to reduce latency.
              </p>
            </div>
          </div>

          {/* Spend Trend */}
          <div className="border border-black/5 p-5 rounded space-y-5">
            <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Aggregate Spend Under Contract ($M)</p>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendTrendData}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#cccccc' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#cccccc' }} />
                  <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #f0f0f0', boxShadow: 'none', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase' }} />
                  <Area type="monotone" dataKey="spend" stroke="#000000" strokeWidth={2} fillOpacity={0.05} fill="#000000" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-6">
          <h2 className="text-lg font-black text-black uppercase tracking-tight border-b border-black/5 pb-4">Analysis</h2>
          
          {/* Radar */}
          <div className="border border-black/5 p-5 rounded space-y-5">
            <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Variance Profile</p>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#f0f0f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cccccc', fontSize: 9, fontWeight: 900 }} />
                  <Radar name="Portfolio" dataKey="A" stroke="#000000" fill="#000000" fillOpacity={0.1} />
                  <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #f0f0f0', boxShadow: 'none', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Distribution */}
          <div className="border border-black/5 p-5 rounded space-y-5">
            <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Asset Classification</p>
            <div className="space-y-2">
              {[
                { category: "Raw Materials", value: "$18.4M", count: 42 },
                { category: "Ops Services", value: "$12.1M", count: 85 },
                { category: "Logistics", value: "$8.2M", count: 12 },
                { category: "IT Infrastructure", value: "$3.8M", count: 124 },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-2 border border-black/5 rounded group cursor-pointer hover:bg-black/[0.01]">
                  <div className="space-y-0.5">
                    <p className="text-[12px] font-black text-black uppercase tracking-widest">{cat.category}</p>
                    <p className="text-[12px] text-black/20 font-black uppercase tracking-widest tabular-nums">{cat.count} Units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-black tabular-nums">{cat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
