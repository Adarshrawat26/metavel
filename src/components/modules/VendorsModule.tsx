import {
    AlertTriangle,
    BarChart3,
    ChevronRight,
    FileText,
    Mail,
    MapPin,
    Phone,
    Search,
    ShieldCheck,
    Star,
    Users
} from "lucide-react";
import { useState } from "react";

export function VendorsModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [activeVendor, setActiveVendor] = useState<any>(null);

  const vendors = [
    { name: "SteelCraft Ltd", category: "Raw Materials", rating: 4.8, status: "Preferred", location: "Sheffield, UK" },
    { name: "Global Pumps SA", category: "Equipment", rating: 4.5, status: "Preferred", location: "Stuttgart, DE" },
    { name: "LocalWorks Inc", category: "Facility", rating: 4.2, status: "Standard", location: "Houston, US" },
    { name: "TechSolutions", category: "IT Services", rating: 4.0, status: "Standard", location: "Bangalore, IN" },
    { name: "FastFreight", category: "Logistics", rating: 3.8, status: "On Watch", location: "Rotterdam, NL" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-1000 font-['Nunito_Sans'] text-black bg-white">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Directory</h1>
          <p className="text-black/40 font-black uppercase tracking-widest text-[12px]">Strategic Vendor ecosystem</p>
        </div>
        <button className="bg-[#FF7A45] text-white px-6 py-1.5 rounded text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all">
          Onboard Vendor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-5">
          <div className="relative">
            <Search className="w-3 h-3 text-black/20 absolute left-2 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="SEARCH..." 
              className="w-full bg-black/5 border-none rounded py-1.5 pl-7 pr-3 text-[12px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>
          
          <div className="space-y-0.5">
            {vendors.map((v, i) => (
              <button
                key={i}
                onClick={() => setActiveVendor(v)}
                className={`w-full p-2.5 text-left rounded transition-all flex flex-col gap-1.5 ${activeVendor?.name === v.name ? "bg-[#FF7A45] text-white" : "text-black/40 hover:bg-black/5"}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-black uppercase tracking-widest">{v.name}</span>
                  <span className={`text-[7px] font-black px-1 rounded-sm uppercase ${activeVendor?.name === v.name ? "text-white/40" : "text-black/20"}`}>
                    {v.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-black uppercase tracking-widest opacity-60">{v.category}</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span className="text-[12px] font-black">{v.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-3">
          {activeVendor ? (
            <div className="animate-in fade-in duration-500 space-y-8">
              <div className="flex justify-between items-start">
                <div className="flex gap-5 items-center">
                  <div className="w-16 h-16 bg-[#FF7A45] text-white rounded-sm flex items-center justify-center text-2xl font-black">
                    {activeVendor.name.charAt(0)}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-black tracking-tighter uppercase">{activeVendor.name}</h2>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-[12px] font-black text-black/30 uppercase tracking-widest">
                        <MapPin className="w-3 h-3" />
                        {activeVendor.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-black text-black/30 uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" />
                        Compliance Verified
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-black/10 rounded text-black/20 hover:text-black transition-all"><Mail className="w-4 h-4" /></button>
                  <button className="p-2 border border-black/10 rounded text-black/20 hover:text-black transition-all"><Phone className="w-4 h-4" /></button>
                  <button className="p-2 border border-black/10 rounded text-black/20 hover:text-black transition-all"><FileText className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Active Contracts", value: "4", icon: FileText },
                  { label: "Performance", value: "96%", icon: Star },
                  { label: "Total Spend", value: "$4.2M", icon: BarChart3 },
                ].map((stat, i) => (
                  <div key={i} className="p-4 border border-black/5 rounded space-y-3">
                    <div className="w-8 h-8 bg-black/5 rounded flex items-center justify-center text-black/20">
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[12px] font-black text-black/30 uppercase tracking-[0.2em]">{stat.label}</p>
                      <p className="text-2xl font-black text-black tabular-nums">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 border border-black/5 rounded p-5">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black/30">Active Agreements</h3>
                  <div className="space-y-0.5">
                    {[
                      { id: "CON-829", title: "Master Supply Agreement" },
                      { id: "CON-112", title: "Maintenance Service SLA" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-2 hover:bg-black/[0.02] transition-all cursor-pointer group rounded" onClick={() => onNavigate("search")}>
                        <div className="space-y-0.5">
                          <p className="text-[12px] font-black text-black uppercase tracking-widest">{c.title}</p>
                          <p className="text-[8px] font-black text-black/20 uppercase tracking-widest tabular-nums">{c.id}</p>
                        </div>
                        <ChevronRight className="w-3 h-3 text-black/10 group-hover:text-black" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border border-black/5 rounded p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black/30">Compliance</h3>
                    <AlertTriangle className="w-3 h-3 text-black/10" />
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-black/[0.02] border border-black/5 rounded space-y-1">
                      <p className="text-[12px] font-black text-black/40 uppercase tracking-widest">Audit Lifecycle</p>
                      <p className="text-[12px] font-black uppercase tracking-widest text-black">Verified • Cycle 2026</p>
                    </div>
                    <div className="p-6 bg-black/[0.02] border border-black/5 rounded space-y-2">
                      <p className="text-[16px] font-black text-black/40 uppercase tracking-widest">Documentation</p>
                      <p className="text-[16px] font-black uppercase tracking-widest text-black underline">Insurance_Cert_25.pdf</p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button className="flex-1 bg-[#FF7A45] text-white py-3 rounded text-[16px] font-black uppercase tracking-widest hover:bg-[#F26636]">Update</button>
                      <button className="flex-1 border border-black/10 text-black/40 py-3 rounded text-[16px] font-black uppercase tracking-widest hover:text-black">Audit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center text-center p-20 bg-white border border-black/5 rounded">
              <div className="p-8 bg-black/5 text-black/10 rounded-full mb-8">
                <Users className="w-16 h-16" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black text-black uppercase tracking-widest">Select Entity</h2>
                <p className="text-[16px] text-black/30 font-black uppercase tracking-[0.2em] max-w-xs leading-relaxed">Choose a vendor from the sidebar to visualize operational performance and risk data.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
