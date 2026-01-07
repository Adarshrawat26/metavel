import React, { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Users, 
  FileText, 
  Building2, 
  ChevronRight, 
  Lock, 
} from "lucide-react";
import { toast } from "sonner";

type SettingsTab = "profile" | "users" | "templates" | "notifications" | "org";

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("users");

  const tabs = [
    { id: "profile", label: "Profile", icon: Lock },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "org", label: "Organization", icon: Building2 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="space-y-12 animate-in fade-in duration-500 font-['Nunito_Sans']">
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-black uppercase tracking-tight">User Management</h3>
                <p className="text-[15px] text-black/30 font-black uppercase tracking-widest">Team Permissions & Governance</p>
              </div>
              <button className="bg-[#FF7A45] text-white px-6 py-2 rounded text-[15px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all">
                Add User
              </button>
            </div>

            <div className="overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[16px] font-black text-black/20 uppercase tracking-[0.2em] border-b border-black/5">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Login</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {[
                    { name: "Robert Chen", email: "robert@metaval.com", role: "Super Admin", status: "Active", login: "2h ago" },
                    { name: "Sarah Miller", email: "sarah.m@metaval.com", role: "Legal Counsel", status: "Active", login: "5h ago" },
                    { name: "John Chen", email: "john.c@metaval.com", role: "Procurement Lead", status: "Active", login: "Yesterday" },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-black/[0.02] transition-colors">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded bg-black/5 flex items-center justify-center text-black/30 font-black text-[15px] uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[16px] font-black text-black uppercase tracking-widest">{user.name}</p>
                            <p className="text-[16px] text-black/30 font-bold">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-[15px] font-black text-black/40 uppercase tracking-widest">{user.role}</td>
                      <td className="px-6 py-6">
                        <span className="text-[16px] font-black text-black uppercase tracking-[0.2em] bg-black/5 px-2 py-0.5 rounded-sm">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-[16px] text-black/20 font-black uppercase tracking-widest">{user.login}</td>
                      <td className="px-6 py-6 text-right">
                        <button className="text-black/10 hover:text-black transition-colors uppercase text-[16px] font-black">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "templates":
        return (
          <div className="space-y-12 animate-in fade-in duration-500 font-['Nunito_Sans']">
            <div className="flex justify-between items-center border-b border-black/5 pb-8">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-black uppercase tracking-tight">Templates</h3>
                <p className="text-[15px] text-black/30 font-black uppercase tracking-widest">Global Master Library</p>
              </div>
              <button className="bg-[#FF7A45] text-white px-6 py-2 rounded text-[15px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all">
                Upload
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Master Supply Agreement", jurisdiction: "England & Wales", type: "Supply" },
                { name: "Service SLA", jurisdiction: "Multi-jurisdiction", type: "Service" },
                { name: "Standard NDA", jurisdiction: "Global", type: "Legal" },
              ].map((tpl, i) => (
                <div key={i} className="p-8 border border-black/5 rounded hover:border-black/20 transition-all group space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-[16px] font-black text-black uppercase tracking-widest">{tpl.name}</h4>
                    <p className="text-[16px] text-black/30 uppercase font-black tracking-[0.2em]">{tpl.type} • {tpl.jurisdiction}</p>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-black/5">
                    <button className="text-[16px] font-black text-black uppercase tracking-[0.2em] hover:opacity-60 transition-opacity">Configure</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64 text-[15px] font-black text-black/20 uppercase tracking-[0.2em] font-['Nunito_Sans']">
            Module under optimization
          </div>
        );
    }
  };

  return (
    <div className="p-12 max-w-[1200px] mx-auto space-y-16 bg-white min-h-full font-['Nunito_Sans']">
      <div className="flex items-center gap-6">
        <div className="p-3 bg-[#FF7A45] text-white rounded">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter">System</h1>
          <p className="text-[15px] text-black/30 font-black uppercase tracking-widest">Workspace Configuration & Security</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-16">
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all text-[16px] font-black uppercase tracking-widest ${
                activeTab === tab.id 
                  ? "bg-[#FF7A45] text-white" 
                  : "text-black/40 hover:text-black hover:bg-black/5"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
