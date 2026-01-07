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
    <div className="p-6 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-1000 font-['Nunito_Sans'] text-black bg-white">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Intelligence</h1>
          <p className="text-black/40 font-black uppercase tracking-widest text-[12px]">Strategic Portfolio Performance</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Contract Spend", value: "$42.5M", change: "+8.2%", icon: TrendingUp },
          { label: "Cycle Velocity", value: "25 Days", change: "-12%", icon: Clock },
          { label: "Variance Rate", value: "18%", change: "+2%", icon: AlertCircle },
          { label: "Audit Pass Rate", value: "94.2%", change: "+0.5%", icon: TrendingUp },
        ].map((kpi, i) => (
          <div key={i} className="border border-black/5 p-4 rounded space-y-4">
            <div className="flex justify-between items-center">
              <div className="p-2 rounded bg-[#FF7A45] text-white">
                <kpi.icon className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-black px-1.5 py-0.5 rounded bg-black/5 text-black/40 uppercase tracking-widest">
                {kpi.change}
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.2em]">{kpi.label}</p>
              <p className="text-2xl font-black text-black tabular-nums">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cycle Time */}
        <div className="border border-black/5 p-5 rounded space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest">Cycle Velocity by Phase</h3>
            <p className="text-[12px] font-black text-black/20 uppercase tracking-[0.2em]">Target: 20 Days</p>
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
            <AlertCircle className="w-4 h-4 text-white/40 flex-shrink-0" />
            <p className="text-[12px] font-black uppercase tracking-widest leading-relaxed">
              Negotiation remains the primary bottleneck. Enable AI auto-review for low-tier entities to reduce latency.
            </p>
          </div>
        </div>

        {/* Spend Trend */}
        <div className="border border-black/5 p-5 rounded space-y-5">
          <h3 className="text-xs font-black uppercase tracking-widest">Aggregate Spend Under Contract ($M)</h3>
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

        {/* Radar */}
        <div className="border border-black/5 p-5 rounded space-y-5">
          <h3 className="text-xs font-black uppercase tracking-widest">Variance Profile</h3>
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
          <h3 className="text-xs font-black uppercase tracking-widest">Asset Classification</h3>
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
  );
}
