import {
    ChevronLeft,
    ChevronRight,
    FileText,
    Layout,
    RefreshCw,
    Save,
    Sparkles
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StageIndicator } from "../shared/StageIndicator";

export function GenerateModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDrafted, setIsDrafted] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsDrafted(true);
      toast.success("Contract drafted successfully!");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden font-['Nunito_Sans'] text-black">
      <StageIndicator currentStage={2} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Form */}
        <div className="w-[350px] bg-white border-r border-black/5 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF7A45] text-white rounded">
                <Layout className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black uppercase tracking-tight">Key Terms</h2>
            </div>

            <div className="space-y-4">
              {[
                { label: "Contracting Parties", value: "Metaval Industrial SA & SteelCraft Ltd" },
                { label: "Contract Period", value: "24 Months starting Jan 2026" },
                { label: "Payment Terms", value: "Net 45 Days" },
                { label: "Governing Law", value: "England and Wales" },
                { label: "Liability Cap", value: "100% of Contract Value" },
              ].map((term, i) => (
                <div key={i} className="space-y-1">
                  <label className="text-[12px] font-black uppercase tracking-[0.15em] text-black/30">{term.label}</label>
                  <input 
                    type="text" 
                    defaultValue={term.value}
                    className="w-full bg-black/5 border-none rounded px-3 py-2 text-[12px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label className="text-[12px] font-black uppercase tracking-[0.15em] text-black/30">Template</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {["Standard Purchase", "Supply Agreement", "Service MSA"].map((t) => (
                    <button 
                      key={t}
                      className={`text-left text-[11px] px-3 py-2 rounded border transition-all font-black uppercase tracking-widest ${
                        t === "Standard Purchase" 
                        ? "bg-[#FF7A45] text-white border-[#FF7A45]" 
                        : "bg-white border-black/5 text-black/40 hover:border-black/20"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/5">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-[#FF7A45] text-white p-3 rounded text-[12px] font-black uppercase tracking-[0.15em] hover:bg-[#F26636] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {isGenerating ? "Generating..." : "Generate Draft"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 bg-black/[0.02] p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto bg-white border border-black/5 min-h-[800px] p-10 relative">
            {!isDrafted && !isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-black/20 text-center p-10 space-y-2">
                <FileText className="w-8 h-8 mb-2 opacity-10" />
                <p className="text-[13px] font-black uppercase tracking-widest">Awaiting Parameterization</p>
                <p className="text-[12px] font-black uppercase tracking-[0.15em] max-w-xs leading-relaxed">Adjust key terms on the left and click generate to see the drafted clauses.</p>
              </div>
            ) : isGenerating ? (
              <div className="space-y-16 animate-pulse p-10">
                <div className="h-6 bg-black/5 rounded w-1/2 mx-auto" />
                <div className="space-y-4">
                  <div className="h-2 bg-black/5 rounded w-full" />
                  <div className="h-2 bg-black/5 rounded w-full" />
                  <div className="h-2 bg-black/5 rounded w-3/4" />
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-black/5 rounded w-1/4" />
                  <div className="h-2 bg-black/5 rounded w-full" />
                  <div className="h-2 bg-black/5 rounded w-full" />
                </div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none animate-in fade-in duration-1000 space-y-12">
                <h1 className="text-center text-2xl font-black text-black tracking-tighter uppercase mb-20 underline">Master Purchase Agreement</h1>
                
                <section className="space-y-4">
                  <h3 className="text-[16px] font-black uppercase tracking-widest text-black">1. Definitions</h3>
                  <p className="text-xs text-black/60 font-bold leading-relaxed text-justify">
                    "Agreement" means this Master Purchase Agreement, including all Schedules and Purchase Orders issued hereunder. 
                    "Effective Date" means January 07, 2026.
                  </p>
                </section>

                <section className="space-y-4 relative">
                  <div className="absolute -left-16 top-0 text-[8px] font-black uppercase tracking-widest text-black/20 vertical-text origin-top-left rotate-90">
                    AI OPTIMIZED
                  </div>
                  <h3 className="text-[16px] font-black uppercase tracking-widest text-black">2. Scope of Supply</h3>
                  <p className="text-xs text-black/60 font-bold leading-relaxed text-justify p-6 bg-black/[0.02] border-l border-black">
                    The Supplier agrees to provide High-Pressure Hydraulic Pumps as specified in the technical annexes attached. Metaval shall issue Purchase Orders for individual batches, which shall be subject to the terms of this Agreement.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-[16px] font-black uppercase tracking-widest text-black">3. Price and Payment</h3>
                  <p className="text-xs text-black/60 font-bold leading-relaxed text-justify">
                    The prices for the Goods shall be as set out in Schedule A. Payment shall be made by Metaval within 45 days of receipt of a valid invoice.
                  </p>
                </section>

                <section className="space-y-4 relative">
                  <div className="absolute -left-16 top-0 text-[8px] font-black uppercase tracking-widest text-black/20 vertical-text origin-top-left rotate-90">
                    AI OPTIMIZED
                  </div>
                  <h3 className="text-[16px] font-black uppercase tracking-widest text-black">4. Liability</h3>
                  <p className="text-xs text-black/60 font-bold leading-relaxed text-justify p-6 bg-black/[0.02] border-l border-black">
                    The Supplier's total aggregate liability under this Agreement shall be limited to 100% of the total Contract Value. This limit shall not apply to liability for death or personal injury caused by negligence or fraud.
                  </p>
                </section>

                <div className="pt-20 border-t border-black/5 text-center">
                  <p className="text-[16px] text-black/20 font-black uppercase tracking-[0.2em]">End of Draft Preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="h-20 bg-white border-t border-black/5 px-12 flex items-center justify-between shrink-0">
        <button 
          onClick={() => onNavigate("requests")}
          className="flex items-center gap-3 text-black/40 font-black text-[15px] uppercase tracking-widest hover:text-black transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Cancel Request
        </button>
        <div className="flex gap-6">
          <button className="flex items-center gap-3 border border-black/10 px-8 py-2.5 rounded text-[15px] font-black uppercase tracking-widest hover:bg-black/5 transition-all">
            <Save className="w-4 h-4" />
            Save Progress
          </button>
          <button 
            onClick={() => onNavigate("negotiate")}
            disabled={!isDrafted}
            className="flex items-center gap-3 bg-[#FF7A45] text-white px-10 py-2.5 rounded text-[15px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all disabled:opacity-30"
          >
            Review & Negotiate
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
