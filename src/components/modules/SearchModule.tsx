import React, { useState } from "react";
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Download,
    ExternalLink,
    FilePlus,
    FileText,
    Filter,
    Hash,
    History,
    Layers,
    ListChecks,
    MoreVertical,
    Search as SearchIcon,
    Share2,
    Shield,
    Brain,
    TrendingUp,
    User,
    UserCheck
} from "lucide-react";
// Progress bar removed from contracts page per request

const STAGES = [
  "Request", "Generate", "Negotiate", "Approve", "Execute", "Search", "Comply", "Review", "Exit"
];

const SAVED_VIEWS = [
  { id: "all", label: "All Contracts", icon: FileText, count: 128 },
  { id: "my", label: "My Contracts", icon: User, count: 14 },
  { id: "expiring", label: "Expiring Soon", icon: Calendar, count: 8, badge: "8" },
  { id: "high-risk", label: "High Risk", icon: Shield, count: 5, badge: "!" },
  { id: "nda", label: "All NDAs", icon: Hash, count: 42 },
];

const CLAUSES = [
  { id: "CL-1", type: "Liability", snippet: "...liability of the Supplier shall not exceed 100% of the total Fees...", risk: "Medium", contract: "Global Steel MSA" },
  { id: "CL-2", type: "IP Rights", snippet: "...Customer shall own all Intellectual Property Rights in the Deliverables...", risk: "Low", contract: "TechCorp SOW" },
  { id: "CL-3", type: "Termination", snippet: "...either party may terminate for convenience with 30 days notice...", risk: "Low", contract: "Mining Lease X1" },
  { id: "CL-4", type: "Payment Terms", snippet: "...payment shall be made within 30 days of invoice date, subject to delivery confirmation...", risk: "Low", contract: "Valve Supply Agreement" },
  { id: "CL-5", type: "Force Majeure", snippet: "...neither party shall be liable for delays due to circumstances beyond reasonable control...", risk: "Medium", contract: "Mining Equipment Lease" },
  { id: "CL-6", type: "Confidentiality", snippet: "...all proprietary information disclosed shall remain confidential for a period of 5 years...", risk: "Low", contract: "Cloud Infrastructure SLA" },
  { id: "CL-7", type: "Warranty", snippet: "...Supplier warrants that all goods shall conform to specifications for 12 months from delivery...", risk: "Low", contract: "Raw Material Procurement" },
  { id: "CL-8", type: "Indemnification", snippet: "...Supplier shall indemnify Customer against all claims arising from Supplier's breach...", risk: "High", contract: "Security Services Contract" },
  { id: "CL-9", type: "Dispute Resolution", snippet: "...disputes shall be resolved through binding arbitration in accordance with ICC rules...", risk: "Medium", contract: "Warehouse Lease Agreement" },
  { id: "CL-10", type: "Price Adjustment", snippet: "...prices may be adjusted annually based on CPI index with 5% maximum cap...", risk: "Medium", contract: "IT Support Services" },
];

const MOCK_CONTRACTS = [
  { id: "CON-9921", name: "Global Steel MSA", type: "Master Services Agreement", counterparty: "Global Steel Corp", value: "$2,400,000", start: "2026-02-01", end: "2029-01-31", stage: "Negotiate", risk: "Medium", owner: "Robert Chen" },
  { id: "CON-9922", name: "Valve Supply Agreement", type: "Supply Agreement", counterparty: "Apex Valves Ltd", value: "$850,000", start: "2026-01-15", end: "2027-01-14", stage: "Approve", risk: "Low", owner: "Sarah Miller" },
  { id: "CON-9923", name: "Mining Equipment Lease", type: "Lease", counterparty: "Heavy Machinery Inc", value: "$5,200,000", start: "2025-11-01", end: "2030-10-31", stage: "Execute", risk: "High", owner: "Emma Wilson" },
  { id: "CON-9924", name: "On-site Maintenance SOW", type: "Statement of Work", counterparty: "SiteWorks Services", value: "$120,000", start: "2026-03-01", end: "2026-08-31", stage: "Draft", risk: "Low", owner: "John Chen" },
  { id: "CON-9925", name: "Cloud Infrastructure SLA", type: "Service Level Agreement", counterparty: "TechCloud Solutions", value: "$1,800,000", start: "2026-04-01", end: "2027-03-31", stage: "Review", risk: "Medium", owner: "Michael Brown" },
  { id: "CON-9926", name: "Raw Material Procurement", type: "Purchase Agreement", counterparty: "Metals International", value: "$3,500,000", start: "2026-01-01", end: "2026-12-31", stage: "Comply", risk: "Low", owner: "Robert Chen" },
  { id: "CON-9927", name: "Security Services Contract", type: "Service Agreement", counterparty: "SecureGuard Ltd", value: "$450,000", start: "2026-02-15", end: "2027-02-14", stage: "Request", risk: "Low", owner: "Sarah Miller" },
  { id: "CON-9928", name: "Warehouse Lease Agreement", type: "Lease", counterparty: "Storage Solutions Inc", value: "$980,000", start: "2026-05-01", end: "2028-04-30", stage: "Generate", risk: "Medium", owner: "Emma Wilson" },
  { id: "CON-9929", name: "IT Support Services", type: "Managed Services", counterparty: "Digital Services Co", value: "$650,000", start: "2026-03-15", end: "2027-03-14", stage: "Negotiate", risk: "Low", owner: "John Chen" },
  { id: "CON-9930", name: "Transportation & Logistics", type: "Logistics Agreement", counterparty: "FastFreight Global", value: "$1,200,000", start: "2026-01-20", end: "2026-12-19", stage: "Approve", risk: "Medium", owner: "Michael Brown" },
  { id: "CON-9931", name: "Consulting Services MSA", type: "Master Services Agreement", counterparty: "Strategic Advisors", value: "$750,000", start: "2026-06-01", end: "2027-05-31", stage: "Execute", risk: "Low", owner: "Sarah Miller" },
  { id: "CON-9932", name: "Energy Supply Contract", type: "Utility Agreement", counterparty: "PowerGrid Energy", value: "$2,100,000", start: "2026-02-01", end: "2027-01-31", stage: "Search", risk: "High", owner: "Robert Chen" },
  { id: "CON-9933", name: "Facility Management SOW", type: "Statement of Work", counterparty: "FacilityPro Services", value: "$320,000", start: "2026-04-15", end: "2026-10-14", stage: "Draft", risk: "Low", owner: "Emma Wilson" },
  { id: "CON-9934", name: "Software Licensing Agreement", type: "License Agreement", counterparty: "Enterprise Software Inc", value: "$1,450,000", start: "2026-03-01", end: "2027-02-28", stage: "Review", risk: "Medium", owner: "John Chen" },
  { id: "CON-9935", name: "Construction Services", type: "Construction Agreement", counterparty: "BuildRight Construction", value: "$8,500,000", start: "2026-05-01", end: "2027-04-30", stage: "Request", risk: "High", owner: "Michael Brown" },
  { id: "CON-9936", name: "Marketing Services Agreement", type: "Service Agreement", counterparty: "Creative Marketing Agency", value: "$580,000", start: "2026-02-01", end: "2026-11-30", stage: "Generate", risk: "Low", owner: "Sarah Miller" },
  { id: "CON-9937", name: "Equipment Maintenance SLA", type: "Service Level Agreement", counterparty: "Maintenance Experts", value: "$420,000", start: "2026-01-15", end: "2026-12-14", stage: "Comply", risk: "Low", owner: "Robert Chen" },
  { id: "CON-9938", name: "Legal Services Retainer", type: "Retainer Agreement", counterparty: "Legal Partners LLP", value: "$950,000", start: "2026-03-01", end: "2027-02-28", stage: "Negotiate", risk: "Medium", owner: "Emma Wilson" },
  { id: "CON-9939", name: "Telecommunications Contract", type: "Telecom Agreement", counterparty: "ConnectTel Communications", value: "$680,000", start: "2026-04-01", end: "2027-03-31", stage: "Approve", risk: "Low", owner: "John Chen" },
  { id: "CON-9940", name: "Research & Development SOW", type: "Statement of Work", counterparty: "Innovation Labs", value: "$1,750,000", start: "2026-06-01", end: "2027-05-31", stage: "Execute", risk: "Medium", owner: "Michael Brown" },
  { id: "CON-9941", name: "Non-Disclosure Agreement - TechCorp", type: "NDA", counterparty: "TechCorp Industries", value: "$0", start: "2026-01-01", end: "2027-12-31", stage: "Execute", risk: "Low", owner: "Robert Chen" },
  { id: "CON-9942", name: "Mutual NDA - Innovation Labs", type: "Mutual NDA", counterparty: "Innovation Labs", value: "$0", start: "2025-12-01", end: "2026-12-31", stage: "Execute", risk: "Low", owner: "Sarah Miller" },
  { id: "CON-9943", name: "Confidentiality Agreement - Strategic", type: "NDA", counterparty: "Strategic Partners", value: "$0", start: "2026-02-01", end: "2027-01-31", stage: "Execute", risk: "Low", owner: "Emma Wilson" },
  { id: "CON-9944", name: "Non-Disclosure - Vendor ABC", type: "NDA", counterparty: "Vendor ABC Corp", value: "$0", start: "2026-03-01", end: "2027-02-28", stage: "Execute", risk: "Low", owner: "John Chen" },
  { id: "CON-9945", name: "Q1 Maintenance Contract", type: "Service Agreement", counterparty: "Maintenance Pro", value: "$250,000", start: "2025-10-01", end: "2026-02-05", stage: "Execute", risk: "Low", owner: "Robert Chen" },
  { id: "CON-9946", name: "Temporary Storage Lease", type: "Lease", counterparty: "QuickStorage Inc", value: "$180,000", start: "2025-11-15", end: "2026-02-10", stage: "Execute", risk: "Medium", owner: "Sarah Miller" },
  { id: "CON-9947", name: "Short-term Consulting", type: "Consulting Agreement", counterparty: "Expert Advisors", value: "$95,000", start: "2025-12-20", end: "2026-02-15", stage: "Execute", risk: "Low", owner: "Emma Wilson" },
  { id: "CON-9948", name: "Emergency Equipment Rental", type: "Rental Agreement", counterparty: "Equipment Rentals Co", value: "$320,000", start: "2025-12-01", end: "2026-02-20", stage: "Execute", risk: "Medium", owner: "John Chen" },
  { id: "CON-9949", name: "Winter Support Services", type: "Service Agreement", counterparty: "Support Services Ltd", value: "$145,000", start: "2025-11-01", end: "2026-02-25", stage: "Execute", risk: "Low", owner: "Michael Brown" },
  { id: "CON-9950", name: "Quarterly Audit Contract", type: "Audit Agreement", counterparty: "Audit Partners", value: "$75,000", start: "2025-12-10", end: "2026-02-28", stage: "Execute", risk: "Low", owner: "Robert Chen" },
];

const MOCK_DOCS = [
  { name: "MSA_GlobalSteel_v3_FINAL.pdf", type: "PDF", size: "2.4 MB", date: "2026-01-05", status: "SIGNED" },
  { name: "Price_Adjustment_Appendix_A.docx", type: "DOCX", size: "1.1 MB", date: "2025-12-28", status: "DRAFT" },
  { name: "Compliance_Certificate_Steel_2026.pdf", type: "PDF", size: "850 KB", date: "2026-01-02", status: "VERIFIED" },
  { name: "Amendment_No_2_Signed.pdf", type: "PDF", size: "1.8 MB", date: "2026-01-10", status: "SIGNED" },
  { name: "Insurance_Certificate_2026.pdf", type: "PDF", size: "650 KB", date: "2026-01-08", status: "VERIFIED" },
  { name: "Performance_Report_Q4_2025.xlsx", type: "XLSX", size: "2.1 MB", date: "2025-12-30", status: "DRAFT" },
  { name: "Renewal_Notice_2026.pdf", type: "PDF", size: "420 KB", date: "2026-01-12", status: "SIGNED" },
  { name: "Quality_Assurance_Report.pdf", type: "PDF", size: "1.2 MB", date: "2026-01-07", status: "VERIFIED" },
];

const MOCK_AUDIT = [
  { action: "STATUS_CHANGE", user: "Robert Chen", detail: "Stage changed from GENERATE to NEGOTIATE", time: "2h ago" },
  { action: "DOC_UPLOAD", user: "Sarah Miller", detail: "Uploaded MSA_GlobalSteel_v3_FINAL.pdf", time: "5h ago" },
  { action: "CLAUSE_EDIT", user: "Robert Chen", detail: "Modified CL-509 IP Rights - Section 2.1", time: "Yesterday" },
  { action: "REVIEW_REQ", user: "John Doe", detail: "Requested legal review from Emma Wilson", time: "2 days ago" },
  { action: "STATUS_CHANGE", user: "Emma Wilson", detail: "Stage changed from NEGOTIATE to APPROVE", time: "3 days ago" },
  { action: "DOC_UPLOAD", user: "Michael Brown", detail: "Uploaded Amendment_No_2_Signed.pdf", time: "4 days ago" },
  { action: "CLAUSE_EDIT", user: "Sarah Miller", detail: "Updated CL-312 Payment Terms - Section 5.3", time: "5 days ago" },
  { action: "REVIEW_REQ", user: "Robert Chen", detail: "Approved by Legal Team", time: "6 days ago" },
  { action: "STATUS_CHANGE", user: "John Chen", detail: "Stage changed from APPROVE to EXECUTE", time: "1 week ago" },
  { action: "DOC_UPLOAD", user: "Emma Wilson", detail: "Uploaded Insurance_Certificate_2026.pdf", time: "1 week ago" },
  { action: "CLAUSE_EDIT", user: "Michael Brown", detail: "Modified CL-201 Liability Cap - Section 8.2", time: "2 weeks ago" },
  { action: "REVIEW_REQ", user: "Sarah Miller", detail: "Requested compliance verification", time: "2 weeks ago" },
];

export function SearchModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [view, setView] = useState<"list" | "detail">("list");
  const [activeSubView, setActiveSubView] = useState<"contracts" | "clauses">("contracts");
  const [activeSavedView, setActiveSavedView] = useState("all");
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenDetail = (contract: any) => {
    setSelectedContract(contract);
    setView("detail");
  };

  const getStageIndex = (stage: string) => STAGES.indexOf(stage);

  // Filter contracts based on active view
  const getFilteredContracts = () => {
    let filtered = [...MOCK_CONTRACTS];

    // Apply view filter
    switch (activeSavedView) {
      case "my":
        // Show contracts owned by current user (Robert Chen)
        filtered = filtered.filter(con => con.owner === "Robert Chen");
        break;
      case "expiring":
        // Show contracts expiring within 30 days
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        thirtyDaysFromNow.setHours(23, 59, 59, 999);
        filtered = filtered.filter(con => {
          const endDate = new Date(con.end);
          endDate.setHours(0, 0, 0, 0);
          return endDate >= today && endDate <= thirtyDaysFromNow;
        });
        break;
      case "high-risk":
        // Show high risk contracts
        filtered = filtered.filter(con => con.risk === "High");
        break;
      case "nda":
        // Show NDAs (contracts with type containing NDA or Non-Disclosure)
        filtered = filtered.filter(con => 
          con.type.toLowerCase().includes("nda") || 
          con.name.toLowerCase().includes("nda") ||
          con.type.toLowerCase().includes("non-disclosure")
        );
        break;
      case "all":
      default:
        // Show all contracts
        break;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(con =>
        con.name.toLowerCase().includes(query) ||
        con.id.toLowerCase().includes(query) ||
        con.counterparty.toLowerCase().includes(query) ||
        con.owner.toLowerCase().includes(query) ||
        con.type.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Filter clauses based on search
  const getFilteredClauses = () => {
    let filtered = [...CLAUSES];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(clause =>
        clause.id.toLowerCase().includes(query) ||
        clause.type.toLowerCase().includes(query) ||
        clause.snippet.toLowerCase().includes(query) ||
        clause.contract.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const renderList = () => (
    <>
      <div className="flex h-full gap-4 animate-in fade-in duration-1000 overflow-hidden p-6 max-w-[1200px] mx-auto bg-white text-black font-['Nunito_Sans']">
      {/* Sidebar: Views & Repository */}
      <div className="w-40 flex flex-col gap-4 shrink-0">
        <div className="space-y-2.5">
          <h3 className="px-2 text-[11px] font-black text-black/30 uppercase tracking-[0.2em]">Views</h3>
          <div className="space-y-0.5">
            {SAVED_VIEWS.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveSavedView(v.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-all text-[11px] font-black ${
                  activeSavedView === v.id 
                    ? "bg-[#FF7A45] text-white" 
                    : "text-black/40 hover:text-black hover:bg-black/5"
                }`}
              >
                <v.icon className={`w-3 h-3 ${activeSavedView === v.id ? "text-white" : "text-black/20"}`} />
                <span className="flex-1 text-left tracking-tight text-[11px]">{v.label}</span>
                {v.badge && (
                  <span className={`text-[10px] font-black tracking-widest ${
                    activeSavedView === v.id ? "text-white/40" : "text-black/20"
                  }`}>
                    {v.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <h3 className="px-2 text-[11px] font-black text-black/30 uppercase tracking-[0.2em]">Repository</h3>
          <div className="space-y-0.5">
            <button 
              onClick={() => setActiveSubView("contracts")}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-all text-[11px] font-black ${
                activeSubView === 'contracts' 
                  ? "bg-black text-white" 
                  : "text-black/40 hover:text-black hover:bg-black/5"
              }`}
            >
              <FileText className={`w-3 h-3 ${activeSubView === 'contracts' ? 'text-white' : 'text-black/20'}`} />
              <span className="flex-1 text-left tracking-tight text-[11px]">Contracts</span>
            </button>
            <button 
              onClick={() => setActiveSubView("clauses")}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-all text-[11px] font-black ${
                activeSubView === 'clauses' 
                  ? "bg-black text-white" 
                  : "text-black/40 hover:text-black hover:bg-black/5"
              }`}
            >
              <Hash className={`w-3 h-3 ${activeSubView === 'clauses' ? 'text-white' : 'text-black/20'}`} />
              <span className="flex-1 text-left tracking-tight text-[11px]">Clauses</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="relative flex-1 max-w-2xl min-w-[250px]">
              <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-black/20" />
              <input 
                type="text" 
                placeholder="Search contracts, clauses, or documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/5 border-none rounded py-1.5 pl-7 pr-3 text-[12px] font-medium text-black placeholder:text-black/30 focus:ring-1 focus:ring-black focus:bg-white outline-none transition-all"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-black text-black/40 hover:text-black transition-all uppercase tracking-[0.15em] whitespace-nowrap">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
          <button 
            onClick={() => onNavigate({ page: "requests", initialView: "new" })}
            className="bg-[#FF7A45] text-white px-5 py-1.5 rounded text-[12px] font-black uppercase tracking-[0.15em] hover:bg-[#F26636] transition-all whitespace-nowrap shrink-0"
          >
            Create Contract
          </button>
        </div>

        <div className="flex-1 bg-white border border-black/5 rounded overflow-hidden flex flex-col min-w-0">
          {activeSubView === 'contracts' ? (
            <div className="overflow-x-auto overflow-y-auto custom-scrollbar min-w-0">
              <table className="mv-table min-w-[800px]">
                <thead>
                  <tr>
                    <th>Contract</th>
                    <th>Counterparty</th>
                    <th>Stage</th>
                    <th>Value</th>
                    <th>Owner</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredContracts().length > 0 ? (
                    getFilteredContracts().map((con) => (
                      <tr 
                        key={con.id} 
                        className="cursor-pointer group"
                        onClick={() => handleOpenDetail(con)}
                      >
                        <td>
                          <div className="space-y-1">
                            <p className="text-[13px] font-black text-black tracking-tight leading-none">{con.name}</p>
                            <p className="text-[12px] text-black/30 font-black uppercase tracking-[0.15em]">{con.id}</p>
                          </div>
                        </td>
                        <td>
                          <p className="text-[13px] font-bold text-black/60 tracking-tight">{con.counterparty}</p>
                        </td>
                        <td>
                          <span className="text-[12px] font-black text-black/40 uppercase tracking-[0.15em] bg-black/[0.02] px-2.5 py-1.5 rounded border border-black/10 whitespace-nowrap">
                            {con.stage}
                          </span>
                        </td>
                        <td>
                          <p className="text-[13px] font-black text-black tabular-nums tracking-tight whitespace-nowrap">{con.value}</p>
                        </td>
                        <td>
                          <div className="space-y-0.5">
                            {con.owner.split(' ').map((part, i) => (
                              <p key={i} className="text-[12px] font-black text-black/30 uppercase tracking-[0.15em] leading-tight">
                                {part}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="text-right">
                          <ChevronRight className="w-4 h-4 text-black/10 group-hover:text-black transition-all group-hover:translate-x-1 duration-500" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-10 py-16 text-center">
                        <p className="text-[14px] font-black text-black/40 uppercase tracking-widest">No contracts found</p>
                        <p className="text-[12px] text-black/30 font-bold mt-2">Try adjusting your filters or search query</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 p-4">
              {getFilteredClauses().length > 0 ? (
                getFilteredClauses().map((cl) => (
                  <div key={cl.id} className="p-4 border border-black/5 rounded hover:border-black/20 transition-all group cursor-pointer space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <h4 className="text-[13px] font-black text-black uppercase tracking-wide">{cl.type} Clause</h4>
                        <p className="text-[12px] text-black/30 uppercase font-black tracking-[0.15em]">{cl.contract}</p>
                      </div>
                      <span className="text-[12px] font-black uppercase tracking-wide text-black/20 group-hover:text-black transition-colors whitespace-nowrap">{cl.risk} Risk</span>
                    </div>
                    <p className="text-xs text-black/60 leading-relaxed font-bold italic">
                      "...{cl.snippet}..."
                    </p>
                    <div className="flex justify-end gap-3 pt-2 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[12px] font-black text-black uppercase tracking-[0.15em] hover:opacity-60">View Contract</button>
                      <button className="text-[12px] font-black text-black uppercase tracking-[0.15em] hover:opacity-60">Save Library</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-16 text-center">
                  <p className="text-[14px] font-black text-black/40 uppercase tracking-widest">No clauses found</p>
                  <p className="text-[12px] text-black/30 font-bold mt-2">Try adjusting your search query</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );

  const renderDetail = () => (
    <div className="flex flex-col h-full bg-white text-black font-['Nunito_Sans'] animate-in fade-in duration-500 overflow-hidden w-full">
      {/* Detail Header */}
      <header className="px-6 py-5 border-b border-black/5 shrink-0">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView("list")}
              className="p-1.5 hover:bg-black/5 rounded text-black/20 hover:text-black transition-all border border-transparent hover:border-black/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black uppercase tracking-tight text-black">{selectedContract?.name}</h1>
                <span className="bg-[#FF7A45] text-white text-[13px] font-black px-2.5 py-1 rounded tracking-[0.15em] uppercase">
                  {selectedContract?.stage}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-black text-black/30 uppercase tracking-[0.15em]">
                <span>{selectedContract?.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
                <span>{selectedContract?.counterparty}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="p-2 bg-white border border-black/10 rounded text-black/30 hover:text-black hover:bg-black/5 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-[#FF7A45] hover:bg-[#F26636] text-white px-6 py-2.5 rounded-lg text-[13px] font-black uppercase tracking-[0.15em] transition-all shadow-lg shadow-orange-500/10">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Editor</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content Scroller */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Lifecycle Stepper Strip */}
        <div className="bg-black/[0.02] border-b border-black/5 py-10 px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-white rounded border border-black/10 shadow-sm px-12 py-10">
              <div className="flex items-center justify-between relative">
                {/* Connector Line */}
                <div className="absolute top-[14px] left-0 w-full h-[2px] bg-black/5 z-0" />
                
                {STAGES.map((stage, idx) => {
                  const currentIndex = STAGES.findIndex(s => s.toLowerCase() === selectedContract?.stage.toLowerCase());
                  const isCompleted = idx < currentIndex;
                  const isActive = idx === currentIndex;
                  
                  return (
                    <div key={stage} className="relative z-10 flex flex-col items-center gap-4 group">
                      <div className="relative">
                        {isCompleted && (
                          <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-all duration-500">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        {isActive && (
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center border-2 border-black shadow-sm ring-4 ring-black/5 transition-all duration-500 scale-110">
                            <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                          </div>
                        )}
                        {!isCompleted && !isActive && (
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center border-2 border-black/10 shadow-sm transition-all group-hover:border-black/30">
                            <div className="w-1.5 h-1.5 bg-black/5 group-hover:bg-black/20 rounded-full" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[16px] font-black uppercase tracking-[0.25em] transition-colors ${
                        isActive ? 'text-black' : isCompleted ? 'text-black/40' : 'text-black/20'
                      }`}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto p-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Workspace Area */}
          <div className="lg:col-span-3 space-y-12">
            {/* Contextual Tabs */}
            <div className="flex items-center gap-12 border-b border-black/10">
              {[
                { id: "overview", label: "OVERVIEW", icon: Layers },
                { id: "documents", label: "DOCUMENTS", icon: FileText },
                { id: "clauses", label: "CLAUSES", icon: Shield },
                { id: "versions", label: "VERSIONS", icon: History },
                { id: "audit", label: "AUDIT LOG", icon: ListChecks },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-[16px] font-black uppercase tracking-[0.25em] transition-all relative flex items-center gap-2.5 ${
                    activeTab === tab.id 
                      ? "text-black" 
                      : "text-black/30 hover:text-black"
                  }`}
                >
                  <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-black' : 'text-black/10'}`} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Workspace Content */}
            <div className="min-h-[600px]">
              {activeTab === "overview" && (
                <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="space-y-4">
                      <p className="text-[16px] font-black text-black/30 uppercase tracking-[0.25em]">Contract Value</p>
                      <p className="text-4xl font-black text-black tracking-tight">{selectedContract?.value}</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[16px] font-black text-black/30 uppercase tracking-[0.25em]">Periodicity</p>
                      <div className="flex items-center gap-3">
                        <p className="text-[16px] font-bold text-black">{selectedContract?.start}</p>
                        <ArrowRight className="w-4 h-4 text-black/10" />
                        <p className="text-[16px] font-bold text-black">{selectedContract?.end}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[16px] font-black text-black/30 uppercase tracking-[0.25em]">Jurisdiction</p>
                      <p className="text-[16px] font-bold text-black uppercase tracking-tight">Western Australia</p>
                    </div>
                  </div>

                  {/* High Density Information Panels */}
                  <div className="space-y-8">
                    <h3 className="text-[16px] font-black text-black/30 uppercase tracking-[0.25em]">Strategic Assessment</h3>
                    <div className="bg-black/[0.02] rounded p-10 border border-black/10">
                      <div className="max-w-4xl space-y-6">
                        <p className="text-[16px] text-black/60 font-medium leading-relaxed">
                          The <span className="text-black font-bold">{selectedContract?.name}</span> represents a critical strategic supply line for structural steel within the APAC region. 
                          Preliminary AI analysis indicates a strong alignment with regional compliance thresholds, though Section 4.2 requires 
                          monitoring for raw material price volatility.
                        </p>
                        <div className="flex items-center gap-8 pt-4">
                          <div className="flex items-center gap-2.5 text-[#FF7A45]">
                            <TrendingUp className="w-4.5 h-4.5" />
                            <span className="text-[16px] font-black uppercase tracking-widest">12% Price Adjustment Trigger</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-black/40">
                            <Brain className="w-4.5 h-4.5" />
                            <span className="text-[16px] font-black uppercase tracking-widest">AI Confidence: 94%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance & Risk Grids */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl border border-grey-100 p-8 space-y-8 shadow-sm">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[16px] font-black text-black uppercase tracking-[0.25em]">Risk Matrix</h4>
                        <span className={`px-3 py-1 rounded text-[16px] font-black uppercase tracking-widest ${
                          selectedContract?.risk === 'High' ? 'bg-[#F97066]/10 text-[#F97066]' : 'bg-grey-50 text-grey-400'
                        }`}>
                          {selectedContract?.risk} Risk Profile
                        </span>
                      </div>
                      <div className="space-y-6">
                        {[
                          { label: "Liability Exposure", score: 24 },
                          { label: "IP Conflict Delta", score: 12 },
                          { label: "Regulatory Delta", score: 45 },
                        ].map((item, i) => (
                          <div key={i} className="space-y-2.5">
                            <div className="flex justify-between text-[15px] font-black uppercase tracking-[0.2em] text-grey-400">
                              <span>{item.label}</span>
                              <span>{item.score}%</span>
                            </div>
                            <div className="h-1 bg-grey-50 rounded-full overflow-hidden">
                              <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${item.score}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-grey-100 p-8 space-y-8 shadow-sm">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[16px] font-black text-black uppercase tracking-[0.25em]">Critical Milestones</h4>
                        <Calendar className="w-4 h-4 text-grey-200" />
                      </div>
                      <div className="space-y-8">
                        {[
                          { date: "JAN 15, 2026", label: "Final Review Gate", status: "PENDING" },
                          { date: "FEB 01, 2026", label: "Effective Date", status: "SCHEDULED" },
                          { date: "MAR 10, 2026", label: "Quarterly Audit 01", status: "PLANNED" },
                        ].map((m, i) => (
                          <div key={i} className="flex items-start gap-5">
                            <div className="mt-1 w-2 h-2 rounded-full bg-[#FF7A45] ring-4 ring-[#FF7A45]/10" />
                            <div>
                              <p className="text-[15px] font-bold text-grey-900 leading-none">{m.label}</p>
                              <p className="text-[15px] text-grey-300 font-bold uppercase tracking-widest mt-2">{m.date} • {m.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[16px] font-black text-grey-200 uppercase tracking-[0.25em]">Digital Repository</h3>
                    <button className="flex items-center gap-2.5 text-[16px] font-black text-black uppercase tracking-widest hover:opacity-60 transition-all border border-grey-100 px-4 py-2 rounded-lg">
                      <FilePlus className="w-4 h-4" /> Add Document
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-grey-100 shadow-sm overflow-hidden">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-grey-50 bg-grey-50/20">
                          <th className="px-8 py-5 text-left text-[15px] font-black uppercase tracking-[0.2em] text-grey-300">Artifact Name</th>
                          <th className="px-8 py-5 text-left text-[15px] font-black uppercase tracking-[0.2em] text-grey-300">Attribute</th>
                          <th className="px-8 py-5 text-left text-[15px] font-black uppercase tracking-[0.2em] text-grey-300">Timestamp</th>
                          <th className="px-8 py-5 text-left text-[15px] font-black uppercase tracking-[0.2em] text-grey-300">Status</th>
                          <th className="px-8 py-5 w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-grey-50">
                        {MOCK_DOCS.map((doc, i) => (
                          <tr key={i} className="group hover:bg-grey-50/40 transition-colors">
                            <td className="px-8 py-7">
                              <div className="flex items-center gap-4">
                                <FileText className="w-5 h-5 text-grey-200 group-hover:text-black transition-colors" />
                                <span className="text-[15px] font-bold text-grey-900 tracking-tight">{doc.name}</span>
                              </div>
                            </td>
                            <td className="px-8 py-7">
                              <span className="text-[15px] font-black text-grey-400 uppercase tracking-widest">{doc.type} • {doc.size}</span>
                            </td>
                            <td className="px-8 py-7 text-[16px] font-bold text-grey-600 tabular-nums">{doc.date}</td>
                            <td className="px-8 py-7">
                              <span className={`inline-flex px-3 py-1.5 rounded-lg text-[16px] font-black uppercase tracking-widest border ${
                                doc.status === 'SIGNED' ? 'bg-[#FF7A45] text-white border-[#FF7A45] shadow-sm' : 'bg-white text-grey-400 border-grey-100'
                              }`}>
                                {doc.status}
                              </span>
                            </td>
                            <td className="px-8 py-7 text-right">
                              <button className="p-2 text-grey-200 hover:text-black hover:bg-white rounded-lg transition-all">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "audit" && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[16px] font-black text-grey-200 uppercase tracking-[0.25em]">Audit Protocol</h3>
                    <button className="text-[16px] font-black text-black uppercase tracking-widest hover:opacity-60 transition-all border border-grey-100 px-4 py-2 rounded-lg">
                      Export Archive
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-grey-100 overflow-hidden shadow-sm">
                    {MOCK_AUDIT.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-7 border-b border-grey-50 last:border-0 hover:bg-grey-50/30 transition-colors">
                        <div className="flex items-center gap-6">
                          <div className={`w-3 h-3 rounded-full ${
                            item.action === 'STATUS_CHANGE' ? 'bg-black' : 
                            item.action === 'CLAUSE_EDIT' ? 'bg-[#FF7A45]' : 'bg-grey-100'
                          } ring-4 ${
                            item.action === 'STATUS_CHANGE' ? 'ring-black/5' : 
                            item.action === 'CLAUSE_EDIT' ? 'ring-[#FF7A45]/5' : 'ring-grey-50'
                          }`} />
                          <div>
                            <p className="text-[15px] font-bold text-grey-900 tracking-tight">{item.detail}</p>
                            <p className="text-[15px] text-grey-300 font-bold uppercase tracking-widest mt-1.5">{item.user} • {item.action}</p>
                          </div>
                        </div>
                        <span className="text-[16px] font-bold text-grey-400 tabular-nums">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Side Context Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-grey-100 shadow-sm p-8 space-y-10 sticky top-8 border-t-4 border-t-black">
              <h3 className="text-[16px] font-black text-grey-300 uppercase tracking-[0.25em]">Primary Triggers</h3>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-3.5 bg-[#FF7A45] hover:bg-[#F26636] text-white px-8 py-5 rounded-2xl text-[16px] font-black uppercase tracking-[0.25em] transition-all shadow-xl shadow-orange-500/10 group">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  <span>Execute Signature</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3.5 bg-grey-50 border border-grey-100 text-grey-900 hover:bg-grey-100 px-8 py-5 rounded-2xl text-[16px] font-black uppercase tracking-[0.25em] transition-all">
                  <UserCheck className="w-4.5 h-4.5 text-grey-300" />
                  <span>Request Review</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3.5 bg-white border border-grey-100 text-grey-900 hover:bg-grey-50 px-8 py-5 rounded-2xl text-[16px] font-black uppercase tracking-[0.25em] transition-all">
                  <Download className="w-4.5 h-4.5 text-grey-300" />
                  <span>Download Package</span>
                </button>
              </div>

              <div className="pt-10 border-t border-grey-50 space-y-10">
                <div className="space-y-5">
                  <h3 className="text-[16px] font-black text-grey-300 uppercase tracking-[0.25em]">Authorized Owner</h3>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-grey-50 bg-grey-50/30">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-xs shadow-sm" style={{ backgroundColor: '#FF7A45' }}>
                      {selectedContract?.owner?.split(' ').map(n => n[0]).join('').toUpperCase() || 'RC'}
                    </div>
                    <div>
                      <p className="text-[16px] font-black text-grey-900 uppercase tracking-tight">{selectedContract?.owner}</p>
                      <p className="text-[15px] text-grey-300 font-bold uppercase tracking-widest mt-1">Senior Counsel</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-[16px] font-black text-grey-300 uppercase tracking-[0.25em]">Security Protocol</h3>
                  <div className="flex items-center gap-3.5 text-[#F97066] bg-[#F97066]/5 p-4 rounded-xl border border-[#F97066]/10">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
                    <span className="text-[15px] font-black uppercase tracking-widest leading-tight">Restricted Access: Internal Use Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-white overflow-hidden flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto">
        {view === "list" ? renderList() : renderDetail()}
      </div>
    </div>
  );
}