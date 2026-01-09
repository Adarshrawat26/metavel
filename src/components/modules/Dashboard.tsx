import {
    Calendar,
    ChevronDown,
    CheckCircle2,
    Clock,
    AlertCircle,
    FolderOpen,
    Plus
} from "lucide-react";
import { useMemo, useState } from "react";
import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from "recharts";

const PROJECTS = [
  { id: 1, name: "Global Steel Expansion", team: ["Robert Chen", "Sarah Miller", "John Smith"] },
  { id: 2, name: "APAC Logistics Hub", team: ["Emma Wilson", "Sarah Miller", "David Lee"] },
  { id: 3, name: "Mining Lease Renewal", team: ["Robert Chen", "Emma Wilson", "James Wilson"] },
];

const OVERLOAD_DATA = {
  "Robert Chen": [
    { day: 'Mon', tasks: 8 },
    { day: 'Tue', tasks: 12 },
    { day: 'Wed', tasks: 7 },
    { day: 'Thu', tasks: 15 },
    { day: 'Fri', tasks: 10 },
  ],
  "Sarah Miller": [
    { day: 'Mon', tasks: 5 },
    { day: 'Tue', tasks: 6 },
    { day: 'Wed', tasks: 14 },
    { day: 'Thu', tasks: 8 },
    { day: 'Fri', tasks: 4 },
  ],
  "Emma Wilson": [
    { day: 'Mon', tasks: 12 },
    { day: 'Tue', tasks: 10 },
    { day: 'Wed', tasks: 11 },
    { day: 'Thu', tasks: 9 },
    { day: 'Fri', tasks: 15 },
  ],
  "John Smith": [
    { day: 'Mon', tasks: 4 },
    { day: 'Tue', tasks: 5 },
    { day: 'Wed', tasks: 3 },
    { day: 'Thu', tasks: 6 },
    { day: 'Fri', tasks: 4 },
  ],
  "David Lee": [
    { day: 'Mon', tasks: 7 },
    { day: 'Tue', tasks: 8 },
    { day: 'Wed', tasks: 9 },
    { day: 'Thu', tasks: 7 },
    { day: 'Fri', tasks: 6 },
  ],
  "James Wilson": [
    { day: 'Mon', tasks: 10 },
    { day: 'Tue', tasks: 12 },
    { day: 'Wed', tasks: 14 },
    { day: 'Thu', tasks: 11 },
    { day: 'Fri', tasks: 13 },
  ],
};

export function Dashboard({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState("Robert Chen");

  const activeProject = useMemo(() => 
    PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0]
  , [selectedProjectId]);

  const overloadChartData = useMemo(() => 
    OVERLOAD_DATA[selectedPerson as keyof typeof OVERLOAD_DATA] || OVERLOAD_DATA["Robert Chen"]
  , [selectedPerson]);

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-1000 max-w-[1400px] mx-auto bg-white text-black font-['Nunito_Sans']">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Operations</h1>
          <p className="text-black/40 font-bold uppercase tracking-widest text-sm">Real-time Contractual Performance</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2 bg-black/5 border border-black/5 rounded-lg text-[12px] font-black uppercase tracking-widest hover:bg-black/10 transition-all">
            <Calendar className="w-4 h-4" /> Jan 2026
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-[#FF7A45] text-white rounded-lg text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all shadow-sm hover:shadow-md">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-6 border-y border-black/5 py-8">
        {[
          { label: "Total Projects", value: "42", icon: FolderOpen, color: "text-black" },
          { label: "Due Today", value: "5", icon: Clock, color: "text-[#FF7A45]" },
          { label: "This Week", value: "12", icon: Calendar, color: "text-black/60" },
          { label: "Overdue", value: "3", icon: AlertCircle, color: "text-red-500" },
          { label: "Completed", value: "156", icon: CheckCircle2, color: "text-green-600" },
        ].map((kpi, i) => (
          <div key={i} className="group space-y-3 p-4 rounded-lg border border-black/5 hover:border-black/10 hover:bg-black/[0.02] transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <kpi.icon className={`w-5 h-5 ${kpi.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] leading-tight">{kpi.label}</p>
              <h3 className="text-3xl font-black text-black tabular-nums">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 p-6 border border-black/5 rounded-lg bg-white">
          <div className="flex items-center justify-between border-b border-black/5 pb-5">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-black text-black uppercase tracking-tight">Performance</h2>
              <div className="relative">
                <select 
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                  className="appearance-none bg-black/5 border border-transparent rounded-lg px-4 py-2 pr-8 text-[12px] font-black uppercase tracking-widest text-black outline-none cursor-pointer hover:bg-black/10 transition-all"
                >
                  {PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Active Members Sidebar */}
            <div className="space-y-3">
              <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Team</p>
              <div className="space-y-0.5">
                {activeProject.team.map((person, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedPerson(person)}
                    className={`w-full text-left p-2 rounded transition-all text-[12px] font-black uppercase tracking-widest ${
                      selectedPerson === person ? "bg-[#FF7A45] text-white" : "text-black/40 hover:text-black hover:bg-black/5"
                    }`}
                  >
                    {person}
                  </button>
                ))}
              </div>
            </div>

            {/* Overload Chart Area */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em]">Workload: {selectedPerson}</p>
              <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overloadChartData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#cccccc' }} />
                    <Tooltip 
                      cursor={{ fill: '#f8f8f8' }}
                      contentStyle={{ borderRadius: '4px', border: '1px solid #f0f0f0', boxShadow: 'none', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase' }}
                    />
                    <Bar dataKey="tasks" radius={[0, 0, 0, 0]} barSize={20}>
                      {overloadChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.tasks > 12 ? '#000000' : '#e0e0e0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-6 p-6 border border-black/5 rounded-lg bg-white">
          <h2 className="text-xl font-black text-black uppercase tracking-tight border-b border-black/5 pb-5">Tasks</h2>
          <div className="space-y-4">
            {[
              { task: "Finalize MSA Redlines", project: "Global Steel", status: "In Progress", priority: "High" },
              { task: "Compliance Audit", project: "APAC Hub", status: "Pending", priority: "Medium" },
              { task: "E-Signature Collection", project: "Mining Lease", status: "Blocked", priority: "Critical" },
              { task: "Update Payment Terms", project: "Global Steel", status: "In Progress", priority: "Medium" },
            ].map((task, i) => (
              <div key={i} className="group cursor-pointer p-3 rounded-lg border border-black/5 hover:border-black/10 hover:bg-black/[0.02] transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-black text-black uppercase tracking-widest group-hover:text-[#FF7A45] transition-colors">{task.task}</h4>
                    <p className="text-[12px] text-black/40 font-bold uppercase tracking-[0.15em]">{task.project}</p>
                    <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm mt-1 ${
                      task.status === 'In Progress' ? 'bg-[#FF7A45]/10 text-[#FF7A45]' :
                      task.status === 'Pending' ? 'bg-black/5 text-black/40' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    task.priority === 'Critical' ? 'bg-red-500' :
                    task.priority === 'High' ? 'bg-[#FF7A45]' :
                    'bg-black/20'
                  }`} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 bg-black/5 text-black rounded-lg text-[12px] font-black uppercase tracking-widest hover:bg-black/10 transition-all border border-black/5 mt-4">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
