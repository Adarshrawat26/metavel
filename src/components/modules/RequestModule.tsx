import {
    Archive,
    ArrowLeft,
    Brain,
    CheckCircle2,
    ChevronRight,
    ClipboardCheck,
    MessageSquare,
    Send,
    ShieldAlert,
    User,
    Zap
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { StageIndicator } from "../shared";

type RequestStatus = "New" | "In Review" | "Approved" | "Rejected";

interface Request {
  id: string;
  title: string;
  requester: string;
  department: string;
  value: string;
  createdDate: string;
  status: RequestStatus;
  category: string;
  description: string;
}

const MOCK_REQUESTS: Request[] = [
  { id: "REQ-2026-001", title: "Supply of Industrial Valves - Phase 2", requester: "Sarah Miller", department: "Procurement", value: "$450,000", createdDate: "2026-01-05", status: "In Review", category: "Valves", description: "Standard supply agreement for heavy-duty industrial valves for the upcoming mining project." },
  { id: "REQ-2026-002", title: "Maintenance Service Level Agreement", requester: "John Chen", department: "Operations", value: "$120,000", createdDate: "2026-01-06", status: "New", category: "Services", description: "Quarterly maintenance and support for site equipment." },
  { id: "REQ-2026-003", title: "Spare Parts Procurement - Q1", requester: "Emma Wilson", department: "Supply Chain", value: "$85,000", createdDate: "2026-01-07", status: "Approved", category: "Spares", description: "Bulk order for essential spare parts for the processing plant." },
];

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export function RequestModule({ onNavigate, initialView }: { onNavigate: (page: any) => void; initialView?: "list" | "new" | "detail" | "workflow" | "edit-chat" }) {
  const [view, setView] = useState<"list" | "new" | "detail" | "workflow" | "edit-chat">(initialView || "new");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    if (initialView) {
      setView(initialView);
    }
  }, [initialView]);
  const [workflowStage, setWorkflowStage] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);
  const [showDraft, setShowDraft] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "ai", text: "Hello! I'm your AI contract assistant. I can help you review, suggest changes, and optimize your contract. What would you like to improve?", timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [newRequestData, setNewRequestData] = useState({
    title: "",
    category: "",
    value: "",
    counterparty: "",
    description: "",
    contract_name: "",
    contract_type: "",
    supplier_business: "",
    party_b: "",
    buyer_industry: "",
    start_date: "",
    end_date: "",
    min_quantity: "",
    payment_terms: "",
    delivery_method: "",
    inspection_period: "",
    warranty_period: "",
    damages_non_purchase: "",
    damages_non_supply: "",
    currency: "",
    notes: ""
  });

  // Handle input changes for all fields
  const handleInputChange = (field: string, value: string) => {
    setNewRequestData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOpenDetail = (request: Request) => {
    setSelectedRequest(request);
    setView("detail");
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRequestData.contract_name && newRequestData.contract_type) {
      setShowDraft(true);
      toast.success("Draft created!");
    } else {
      toast.error("Please fill in at least Contract Name and Type");
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "I suggest modifying the payment terms to Net 30. This is more favorable for cash flow management.",
        "Consider adding a force majeure clause to protect both parties from unforeseen circumstances.",
        "The inspection period of 5 days seems reasonable. Would you like to extend the warranty to 12 months?",
        "I recommend clarifying the damages clause. The current wording could be more specific about liability caps.",
        "Great suggestion! I've noted that you want to update the delivery method to FOB Shipping Point.",
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: randomResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 800);
  };


  const renderNewForm = () => (
    <div className="flex-1 bg-white overflow-hidden flex h-full gap-0">
      {/* Left Form Section */}
      <div className="flex-1 overflow-y-auto p-6 bg-white text-black font-['Nunito_Sans']">
        <button onClick={() => onNavigate("contracts")} className="flex items-center gap-2 text-black/40 hover:text-black transition-all text-[14px] font-black uppercase tracking-widest mb-6">
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">New Request</h2>
            <p className="text-black/40 font-black uppercase tracking-widest text-[13px]">Define contract parameters</p>
          </div>

          <form onSubmit={handleCreateRequest} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Contract Name</label>
              <input 
                type="text" 
                value={newRequestData.contract_name}
                onChange={(e) => handleInputChange("contract_name", e.target.value)}
                placeholder="e.g., Master Supply Agreement 2026"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Contract Type</label>
              <input 
                type="text" 
                value={newRequestData.contract_type}
                onChange={(e) => handleInputChange("contract_type", e.target.value)}
                placeholder="e.g., MSA, SLA, Lease"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Supplier Business</label>
              <input 
                type="text" 
                value={newRequestData.supplier_business}
                onChange={(e) => handleInputChange("supplier_business", e.target.value)}
                placeholder="e.g., Global Steel Corp"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Party B</label>
              <input 
                type="text" 
                value={newRequestData.party_b}
                onChange={(e) => handleInputChange("party_b", e.target.value)}
                placeholder="e.g., Acme Industries Ltd"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Buyer Industry</label>
              <input 
                type="text" 
                value={newRequestData.buyer_industry}
                onChange={(e) => handleInputChange("buyer_industry", e.target.value)}
                placeholder="e.g., Manufacturing, Mining, Technology"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Start Date</label>
              <input 
                type="date" 
                value={newRequestData.start_date}
                onChange={(e) => handleInputChange("start_date", e.target.value)}
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">End Date</label>
              <input 
                type="date" 
                value={newRequestData.end_date}
                onChange={(e) => handleInputChange("end_date", e.target.value)}
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Min Quantity</label>
              <input 
                type="text" 
                value={newRequestData.min_quantity}
                onChange={(e) => handleInputChange("min_quantity", e.target.value)}
                placeholder="e.g., 500 units, 1000 kg"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Payment Terms</label>
              <select 
                value={newRequestData.payment_terms}
                onChange={(e) => handleInputChange("payment_terms", e.target.value)}
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              >
                <option value="">Select payment terms...</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
                <option value="COD (Cash on Delivery)">COD (Cash on Delivery)</option>
                <option value="Advance Payment">Advance Payment</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Delivery Method</label>
              <select 
                value={newRequestData.delivery_method}
                onChange={(e) => handleInputChange("delivery_method", e.target.value)}
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              >
                <option value="">Select delivery method...</option>
                <option value="FOB (Free on Board)">FOB (Free on Board)</option>
                <option value="CIF (Cost, Insurance, Freight)">CIF (Cost, Insurance, Freight)</option>
                <option value="DAP (Delivered at Place)">DAP (Delivered at Place)</option>
                <option value="DDP (Delivered Duty Paid)">DDP (Delivered Duty Paid)</option>
                <option value="EXW (Ex Works)">EXW (Ex Works)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Inspection (Days)</label>
              <input 
                type="number" 
                value={newRequestData.inspection_period}
                onChange={(e) => handleInputChange("inspection_period", e.target.value)}
                placeholder="e.g., 7, 14, 30"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Warranty (Months)</label>
              <input 
                type="number" 
                value={newRequestData.warranty_period}
                onChange={(e) => handleInputChange("warranty_period", e.target.value)}
                placeholder="e.g., 12, 24, 36"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Damages - Non Purchase</label>
              <input 
                type="text" 
                value={newRequestData.damages_non_purchase}
                onChange={(e) => handleInputChange("damages_non_purchase", e.target.value)}
                placeholder="e.g., $50,000 or 10%"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Damages - Non Supply</label>
              <input 
                type="text" 
                value={newRequestData.damages_non_supply}
                onChange={(e) => handleInputChange("damages_non_supply", e.target.value)}
                placeholder="e.g., $75,000 or 15%"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Currency</label>
              <input 
                type="text" 
                value={newRequestData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                placeholder="e.g., USD, EUR, GBP"
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-[13px] font-black text-black/40 uppercase tracking-[0.15em]">Notes</label>
              <textarea 
                value={newRequestData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Add any special terms, conditions, or requirements..."
                rows={2}
                className="w-full bg-white border-2 border-gray-200 rounded py-2.5 px-3 text-[14px] font-black uppercase tracking-widest outline-none focus:border-[#FF7A45] transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t border-black/5 pt-6">
            <button 
              type="button"
              onClick={() => { setView("new"); setShowDraft(false); }}
              className="text-[13px] font-black text-black/40 uppercase tracking-widest hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-[#FF7A45] text-white px-10 py-2.5 rounded text-[13px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all"
            >
              Submit Request
            </button>
          </div>
        </form>
        </div>
      </div>

      {/* Right Draft Section */}
      {showDraft && (
        <div className="flex-1 flex flex-col overflow-hidden bg-black/[0.02] border-l border-black/5 text-black font-['Nunito_Sans']">
          {/* Header with Actions */}
          <div className="flex items-center justify-between gap-4 p-4 bg-black/[0.02] border-b border-black/5 shrink-0">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-black uppercase tracking-tight">Contract Draft</h2>
              <p className="text-black/40 font-black uppercase tracking-widest text-[11px]">Ready for workflow</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const element = document.getElementById('draft-document');
                  if (element) {
                    const printWindow = window.open('', '', 'width=800,height=600');
                    if (printWindow) {
                      printWindow.document.write(element.innerHTML);
                      printWindow.document.close();
                      printWindow.print();
                    }
                  }
                }}
                className="px-4 py-2 rounded bg-[#FF7A45] text-white text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all"
              >
                ⬇ PDF
              </button>
            </div>
          </div>

          {/* Scrollable Document Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Paper-like Document */}
            <div id="draft-document" className="max-w-2xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden">
              {/* Document Header */}
              <div className="bg-black text-white p-8 text-center border-b-4 border-[#FF7A45]">
                <h1 className="text-3xl font-black uppercase tracking-tight mb-2">CONTRACT DRAFT</h1>
                <p className="text-white/60 font-bold uppercase tracking-widest text-sm">Generated {new Date().toLocaleDateString()}</p>
              </div>

              {/* Document Content */}
              <div className="p-8 space-y-8 print:p-6">
              {/* Section 1: Contract Identification */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Contract Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Contract Name</p>
                    <p className="text-base font-black text-black">{newRequestData.contract_name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Type</p>
                    <p className="text-base font-black text-black">{newRequestData.contract_type || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Parties */}
              <div className="space-y-4 border-t border-black/10 pt-6">
                <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Parties</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Supplier Business</p>
                    <p className="text-base font-black text-black">{newRequestData.supplier_business || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Party B</p>
                    <p className="text-base font-black text-black">{newRequestData.party_b || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Section 3: Duration */}
              <div className="space-y-4 border-t border-black/10 pt-6">
                <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Duration</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Start Date</p>
                    <p className="text-base font-black text-black">{newRequestData.start_date || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">End Date</p>
                    <p className="text-base font-black text-black">{newRequestData.end_date || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Commercial Terms */}
              <div className="space-y-4 border-t border-black/10 pt-6">
                <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Commercial Terms</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Buyer Industry</p>
                    <p className="text-base font-black text-black">{newRequestData.buyer_industry || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Minimum Quantity</p>
                    <p className="text-base font-black text-black">{newRequestData.min_quantity || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Payment Terms</p>
                    <p className="text-base font-black text-black">{newRequestData.payment_terms || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Delivery Method</p>
                    <p className="text-base font-black text-black">{newRequestData.delivery_method || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Section 5: Compliance & Warranty */}
              <div className="space-y-4 border-t border-black/10 pt-6">
                <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Compliance & Warranty</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Inspection Period (Days)</p>
                    <p className="text-base font-black text-black">{newRequestData.inspection_period || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Warranty Period (Months)</p>
                    <p className="text-base font-black text-black">{newRequestData.warranty_period || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Section 6: Liabilities */}
              <div className="space-y-4 border-t border-black/10 pt-6">
                <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Liabilities</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Damages - Non Purchase</p>
                    <p className="text-base font-black text-black">{newRequestData.damages_non_purchase || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Damages - Non Supply</p>
                    <p className="text-base font-black text-black">{newRequestData.damages_non_supply || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Section 7: Additional Info */}
              <div className="space-y-4 border-t border-black/10 pt-6">
                <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Additional Information</h3>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Currency</p>
                  <p className="text-base font-black text-black">{newRequestData.currency || "—"}</p>
                </div>
                {newRequestData.notes && (
                  <div className="mt-6 pt-6 border-t border-black/10">
                    <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Notes</p>
                    <p className="text-sm leading-relaxed text-black/80">{newRequestData.notes}</p>
                  </div>
                )}
              </div>

              {/* Document Footer */}
              <div className="border-t-2 border-black/20 pt-8 text-center text-black/40 text-[10px] font-bold uppercase tracking-widest">
                <p>This is a draft contract. Please review and approve before proceeding.</p>
              </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="max-w-2xl mx-auto mt-6">
              <button 
                onClick={() => setView("edit-chat")}
                className="w-full px-6 py-3 rounded bg-[#FF7A45] text-white text-[13px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all"
              >
                ✎ Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDetail = () => (
    <div className="max-w-[1000px] mx-auto p-12 space-y-12 animate-in fade-in duration-700 bg-white text-black font-['Nunito_Sans']">
      <div className="flex items-center gap-8 border-b border-black/5 pb-12">
        <button onClick={() => setView("new")} className="p-2 hover:bg-black/5 rounded transition-colors text-black/20 hover:text-black">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black text-black uppercase tracking-tight">{selectedRequest?.title}</h1>
            <span className="px-3 py-1 bg-[#FF7A45] text-white rounded text-[16px] font-black uppercase tracking-[0.2em]">
              {selectedRequest?.status}
            </span>
          </div>
          <p className="text-[15px] text-black/30 font-black uppercase tracking-[0.2em]">{selectedRequest?.id} • {selectedRequest?.requester}</p>
        </div>
        <button 
          onClick={() => onNavigate("generate")}
          className="px-6 py-2 bg-[#FF7A45] text-white rounded text-[15px] font-black uppercase tracking-[0.2em] hover:bg-[#F26636] transition-all flex items-center gap-2"
        >
          Generate Contract
        </button>
      </div>

      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-2 space-y-12">
          <div className="grid grid-cols-2 gap-12 border-b border-black/5 pb-12">
            <div className="space-y-2">
              <p className="text-[16px] font-black text-black/30 uppercase tracking-[0.2em]">Category</p>
              <p className="text-xl font-black text-black uppercase tracking-tight">{selectedRequest?.category}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[16px] font-black text-black/30 uppercase tracking-[0.2em]">Value</p>
              <p className="text-xl font-black text-black">{selectedRequest?.value}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xs font-black text-black uppercase tracking-widest">Description</h3>
            <p className="text-xs text-black/60 font-bold leading-relaxed">{selectedRequest?.description}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-black uppercase tracking-widest">Attachments</h3>
            <div className="space-y-1">
              {["Specifications.pdf", "RFQ_Draft.docx"].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-black/[0.02] transition-colors rounded">
                  <span className="text-[16px] font-black text-black uppercase tracking-widest">{doc}</span>
                  <span className="text-[16px] font-black text-black/20 uppercase tracking-[0.2em]">Download</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-[15px] font-black text-black uppercase tracking-[0.2em]">Workflow Status</h3>
            <div className="space-y-8 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-black/5">
              {[
                { label: "Submitted", status: "complete" },
                { label: "Triage", status: "complete" },
                { label: "Legal", status: "current" },
                { label: "Drafting", status: "upcoming" },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 relative z-10">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 ${
                    step.status === 'complete' ? 'bg-black' :
                    step.status === 'current' ? 'bg-white border border-black' :
                    'bg-white border border-black/10'
                  }`} />
                  <div>
                    <p className={`text-[16px] font-black uppercase tracking-widest ${step.status === 'upcoming' ? 'text-black/20' : 'text-black'}`}>{step.label}</p>
                    <p className="text-[8px] font-black text-black/20 uppercase tracking-widest mt-1">Status: {step.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkflow = () => {
    const stageConfig = [
      { number: 1, name: "Request", icon: CheckCircle2, color: "orange" },
      { number: 2, name: "Generate", icon: Brain, color: "orange" },
      { number: 3, name: "Negotiate", icon: MessageSquare, color: "orange" },
      { number: 4, name: "Approval", icon: CheckCircle2, color: "orange" },
      { number: 5, name: "Execute", icon: Zap, color: "orange" },
      { number: 6, name: "Comply", icon: ShieldAlert, color: "orange" },
      { number: 7, name: "Review", icon: ClipboardCheck, color: "orange" },
      { number: 8, name: "Exit", icon: Archive, color: "orange" }
    ];

    return (
      <div className="flex-1 bg-white overflow-hidden flex flex-col h-full">
        <div className="p-6">
          <StageIndicator stages={stageConfig.length} currentStage={workflowStage} />
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {workflowStage === 1 && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">{newRequestData.title || "New Contract Request"}</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Title</p>
                  <p className="text-lg">{newRequestData.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Category</p>
                  <p className="text-lg">{newRequestData.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Value</p>
                  <p className="text-lg">${newRequestData.value}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Counterparty</p>
                  <p className="text-lg">{newRequestData.counterparty}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
                  <p className="text-lg">{newRequestData.description}</p>
                </div>
              </div>
            </div>
          )}

          {workflowStage === 2 && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Generate Contract</h2>
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Brain className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">AI-Powered Generation</h3>
                      <p className="text-sm text-gray-700">Generating contract based on your request details and historical templates...</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Generated Contract Preview</h3>
                  <div className="bg-white border rounded p-4 text-sm space-y-2 h-64 overflow-y-auto">
                    <p><strong>Contract Title:</strong> {newRequestData.title}</p>
                    <p><strong>Between:</strong> [Your Company] and {newRequestData.counterparty}</p>
                    <p><strong>Value:</strong> ${newRequestData.value}</p>
                    <p><strong>Category:</strong> {newRequestData.category}</p>
                    <p className="mt-4"><strong>Terms & Conditions:</strong></p>
                    <p>1. This agreement is effective upon execution by both parties.</p>
                    <p>2. Payment terms are Net 30 from invoice date.</p>
                    <p>3. Either party may terminate with 30 days written notice.</p>
                    <p>[Additional terms generated based on contract type...]</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {workflowStage === 3 && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Negotiate</h2>
              <div className="space-y-4">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Proposed Redlines</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-orange-500 pl-4 py-2">
                      <p className="font-medium text-sm">Payment Terms</p>
                      <p className="text-sm text-gray-600">Original: Net 30</p>
                      <p className="text-sm text-gray-600">Proposed: Net 45</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4 py-2">
                      <p className="font-medium text-sm">Termination Clause</p>
                      <p className="text-sm text-gray-600">Original: 30 days notice</p>
                      <p className="text-sm text-gray-600">Proposed: 60 days notice</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded text-sm font-medium hover:bg-green-100">
                    Accept All
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded text-sm font-medium hover:bg-red-100">
                    Reject All
                  </button>
                </div>
              </div>
            </div>
          )}

          {workflowStage === 4 && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Approval</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Approval Chain</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">✓</div>
                      <div>
                        <p className="font-medium">Finance Manager</p>
                        <p className="text-sm text-gray-600">Approved - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm">⏳</div>
                      <div>
                        <p className="font-medium">Legal Counsel</p>
                        <p className="text-sm text-gray-600">Pending review</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm">○</div>
                      <div>
                        <p className="font-medium">Executive Approval</p>
                        <p className="text-sm text-gray-600">Not yet started</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {workflowStage === 5 && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Execute</h2>
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Signature Collection</h3>
                  <div className="space-y-3">
                    <div className="bg-white border rounded p-4">
                      <p className="font-medium text-sm mb-2">Your Company</p>
                      <div className="h-20 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 text-sm">
                        Sign here
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Status: Pending</p>
                    </div>
                    <div className="bg-white border rounded p-4">
                      <p className="font-medium text-sm mb-2">{newRequestData.counterparty}</p>
                      <div className="h-20 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 text-sm">
                        Awaiting signature
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Status: Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {workflowStage === 6 && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Compliance Check</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <p className="font-medium text-sm">Legal Review</p>
                    </div>
                    <p className="text-xs text-gray-600">Passed</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <p className="font-medium text-sm">Risk Assessment</p>
                    </div>
                    <p className="text-xs text-gray-600">Low Risk</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert className="w-4 h-4 text-yellow-600" />
                      <p className="font-medium text-sm">Compliance</p>
                    </div>
                    <p className="text-xs text-gray-600">Review Required</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <p className="font-medium text-sm">Vendor Check</p>
                    </div>
                    <p className="text-xs text-gray-600">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {workflowStage === 7 && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Review</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Vendor Performance</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium">Quality Score</p>
                        <p className="text-sm font-medium text-orange-600">8.5/10</p>
                      </div>
                      <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium">Delivery</p>
                        <p className="text-sm font-medium text-orange-600">9/10</p>
                      </div>
                      <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium">Communication</p>
                        <p className="text-sm font-medium text-orange-600">8/10</p>
                      </div>
                      <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {workflowStage === 8 && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Contract Completed</h2>
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Workflow Complete!</h3>
                <p className="text-gray-700 mb-6">Your contract "{newRequestData.title}" has been successfully executed and is now active.</p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <strong>Counterparty:</strong> {newRequestData.counterparty}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Value:</strong> ${newRequestData.value}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Effective Date:</strong> Today
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="border-t bg-gray-50 p-6 flex justify-between">
          <button
            onClick={() => {
              if (workflowStage > 1) {
                setWorkflowStage((workflowStage - 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9);
              }
            }}
            disabled={workflowStage === 1}
            className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={() => {
              if (workflowStage < 8) {
                setWorkflowStage((workflowStage + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9);
              } else {
                toast.success("Contract workflow completed!");
                setView("new");
                setWorkflowStage(1);
              }
            }}
            className="px-6 py-2 rounded bg-orange-500 text-white font-medium hover:bg-orange-600"
          >
            {workflowStage === 8 ? "Complete" : "Next"}
          </button>
        </div>
      </div>
    );
  };

  const renderEditChat = () => (
    <div className="flex-1 bg-white overflow-hidden flex h-full gap-0">
      {/* Left: Contract */}
      <div className="flex-1 overflow-y-auto p-6 bg-white border-r border-black/5">
        <button onClick={() => setView("new")} className="flex items-center gap-2 text-black/40 hover:text-black transition-all text-[14px] font-black uppercase tracking-widest mb-6">
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        
        <div id="draft-document" className="max-w-2xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden border border-black/5">
          {/* Document Header */}
          <div className="bg-black text-white p-8 text-center border-b-4 border-[#FF7A45]">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">CONTRACT</h1>
            <p className="text-white/60 font-bold uppercase tracking-widest text-sm">Generated {new Date().toLocaleDateString()}</p>
          </div>

          {/* Document Content */}
          <div className="p-8 space-y-8">
            {/* Section 1: Contract Identification */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Contract Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Contract Name</p>
                  <p className="text-base font-black text-black">{newRequestData.contract_name || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Type</p>
                  <p className="text-base font-black text-black">{newRequestData.contract_type || "—"}</p>
                </div>
              </div>
            </div>

            {/* Section 2: Parties */}
            <div className="space-y-4 border-t border-black/10 pt-6">
              <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Parties</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Supplier Business</p>
                  <p className="text-base font-black text-black">{newRequestData.supplier_business || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Party B</p>
                  <p className="text-base font-black text-black">{newRequestData.party_b || "—"}</p>
                </div>
              </div>
            </div>

            {/* Section 3: Duration */}
            <div className="space-y-4 border-t border-black/10 pt-6">
              <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Duration</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Start Date</p>
                  <p className="text-base font-black text-black">{newRequestData.start_date || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">End Date</p>
                  <p className="text-base font-black text-black">{newRequestData.end_date || "—"}</p>
                </div>
              </div>
            </div>

            {/* Section 4: Commercial Terms */}
            <div className="space-y-4 border-t border-black/10 pt-6">
              <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Commercial Terms</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Buyer Industry</p>
                  <p className="text-base font-black text-black">{newRequestData.buyer_industry || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Minimum Quantity</p>
                  <p className="text-base font-black text-black">{newRequestData.min_quantity || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Payment Terms</p>
                  <p className="text-base font-black text-black">{newRequestData.payment_terms || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Delivery Method</p>
                  <p className="text-base font-black text-black">{newRequestData.delivery_method || "—"}</p>
                </div>
              </div>
            </div>

            {/* Section 5: Compliance & Warranty */}
            <div className="space-y-4 border-t border-black/10 pt-6">
              <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Compliance & Warranty</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Inspection Period (Days)</p>
                  <p className="text-base font-black text-black">{newRequestData.inspection_period || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Warranty Period (Months)</p>
                  <p className="text-base font-black text-black">{newRequestData.warranty_period || "—"}</p>
                </div>
              </div>
            </div>

            {/* Section 6: Liabilities */}
            <div className="space-y-4 border-t border-black/10 pt-6">
              <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Liabilities</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Damages - Non Purchase</p>
                  <p className="text-base font-black text-black">{newRequestData.damages_non_purchase || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Damages - Non Supply</p>
                  <p className="text-base font-black text-black">{newRequestData.damages_non_supply || "—"}</p>
                </div>
              </div>
            </div>

            {/* Section 7: Additional Info */}
            <div className="space-y-4 border-t border-black/10 pt-6">
              <h3 className="text-lg font-black text-black uppercase tracking-tight border-b-2 border-[#FF7A45] pb-3">Additional Information</h3>
              <div>
                <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Currency</p>
                <p className="text-base font-black text-black">{newRequestData.currency || "—"}</p>
              </div>
              {newRequestData.notes && (
                <div className="mt-6 pt-6 border-t border-black/10">
                  <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Notes</p>
                  <p className="text-sm leading-relaxed text-black/80">{newRequestData.notes}</p>
                </div>
              )}
            </div>

            {/* Document Footer */}
            <div className="border-t-2 border-black/20 pt-8 text-center text-black/40 text-[10px] font-bold uppercase tracking-widest">
              <p>This is a draft contract. Please review and approve before proceeding.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Chat Interface */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white border-l border-black/5">
        {/* Chat Header */}
        <div className="bg-white border-b border-black/5 px-6 py-5 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FF7A45] rounded-full flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-black uppercase tracking-tight">AI Contract Advisor</h2>
              <p className="text-black/40 font-bold uppercase tracking-widest text-[10px] mt-0.5">Suggestions & Insights</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "ai" && (
                <div className="w-8 h-8 bg-[#FF7A45] rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-lg px-4 py-3 shadow-sm ${
                msg.sender === "user"
                  ? "bg-[#FF7A45] text-white rounded-tr-none"
                  : "bg-white border border-black/5 text-black rounded-tl-none"
              }`}>
                <p className={`text-sm leading-relaxed ${msg.sender === "user" ? "font-bold" : "font-medium"}`}>{msg.text}</p>
                <p className={`text-[10px] mt-2 ${msg.sender === "user" ? "text-white/60" : "text-black/30"} font-medium`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 bg-[#4A90E2] rounded-full flex items-center justify-center shrink-0 mt-1 text-white text-[10px] font-black uppercase">
                  U
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-black/5 px-6 py-4 space-y-3 shrink-0">
          <div className="relative">
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage(chatInput)}
              placeholder="e.g., Review payment terms, suggest liability cap, optimize delivery clauses..."
              rows={3}
              className="w-full bg-black/5 border border-black/10 rounded-lg py-3 px-4 text-sm font-medium outline-none focus:border-[#FF7A45] focus:ring-1 focus:ring-[#FF7A45]/20 transition-all resize-none placeholder:text-black/30"
            />
            <button
              onClick={() => handleSendMessage(chatInput)}
              disabled={!chatInput.trim()}
              className="absolute bottom-6 right-4 w-8 h-8 bg-[#FF7A45] text-white rounded-full flex items-center justify-center hover:bg-[#F26636] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => { setView("workflow"); setWorkflowStage(1); }}
            className="w-full bg-white border-2 border-black/10 text-black py-3 rounded-lg text-sm font-black uppercase tracking-widest hover:bg-black/5 hover:border-black/20 transition-all flex items-center justify-center gap-2"
          >
            <ChevronRight className="w-4 h-4" />
            Continue to Workflow
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-white overflow-hidden flex flex-col h-full">
      {view === "new" ? renderNewForm() : view === "edit-chat" ? renderEditChat() : view === "workflow" ? renderWorkflow() : renderDetail()}
    </div>
  );
}

