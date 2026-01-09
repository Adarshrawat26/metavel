import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  RefreshCw,
  Brain,
  Upload,
  X
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  status: "processing" | "completed" | "error" | "ready";
  insights?: string[];
  isGenerating?: boolean;
}

export function TenderAIModule({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [view, setView] = useState<"upload" | "generating">("upload");
  const [generatingStatus, setGeneratingStatus] = useState<"thinking" | "generating" | "complete">("thinking");
  const [currentFile, setCurrentFile] = useState<UploadedFile | null>(null);
  const [tenderDocument, setTenderDocument] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are supported");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size exceeds 50MB limit");
      return;
    }

    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
      status: "ready",
      insights: [],
    };

    setUploadedFiles(prev => [newFile, ...prev]);
    toast.success("PDF uploaded successfully!");
  };

  const generateTender = (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    // Mark file as generating
    setUploadedFiles(prev =>
      prev.map(f =>
        f.id === fileId
          ? { ...f, status: "processing", isGenerating: true }
          : f
      )
    );

    const allInsights = [
      "Vendor prequalification requirements identified",
      "Payment terms: Net 30 days detected",
      "Warranty period: 24 months",
      "Compliance requirements: ISO 9001, SOC 2",
      "Performance metrics: 99.5% uptime SLA",
    ];

    // Add insights one by one with 5-second intervals
    allInsights.forEach((insight, index) => {
      setTimeout(() => {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === fileId
              ? {
                  ...f,
                  insights: [...(f.insights || []), insight],
                  status: index === allInsights.length - 1 ? "completed" : "processing",
                }
              : f
          )
        );

        // After all insights loaded, navigate to generating view
        if (index === allInsights.length - 1) {
          setTimeout(() => {
            setCurrentFile(file);
            setView("generating");
            setGeneratingStatus("thinking");
            
            // Simulate API calls
            // Phase 1: Thinking (5 seconds)
            setTimeout(() => {
              setGeneratingStatus("generating");
              
              // Phase 2: Generating (10 seconds)
              setTimeout(() => {
                // Simulate API response
                const mockTenderDoc = `TENDER DOCUMENT

CONTRACT AGREEMENT

This Tender Agreement ("Agreement") is entered into as of ${new Date().toLocaleDateString()} between the parties identified below:

PARTY A (Buyer)
Industry: Manufacturing
Requirements: ${file.name}

PARTY B (Supplier)
Business Name: [Supplier Name]
Certification: ISO 9001, SOC 2

TERMS AND CONDITIONS

1. SCOPE OF WORK
   The Supplier shall provide goods/services as outlined in the attached specifications and requirements documentation.

2. PAYMENT TERMS
   Payment shall be made within Net 30 days from the date of invoice.

3. WARRANTY
   The Supplier warrants all deliverables for a period of 24 months from the date of delivery.

4. PERFORMANCE METRICS
   The Supplier shall maintain a minimum uptime SLA of 99.5% for all services provided.

5. COMPLIANCE REQUIREMENTS
   All work shall be performed in accordance with ISO 9001 and SOC 2 standards.

6. VENDOR PREQUALIFICATION
   The Supplier has met all prequalification requirements as specified in the tender documentation.

7. DELIVERY AND ACCEPTANCE
   Goods/services shall be delivered as per the agreed schedule. Acceptance criteria are defined in Appendix A.

8. TERMINATION
   Either party may terminate this agreement with 30 days written notice.

9. GOVERNING LAW
   This agreement shall be governed by the laws of the applicable jurisdiction.

SIGNATURES

_______________________          _______________________
Party A Representative           Party B Representative
Date: _______________           Date: _______________


Document Generated: ${new Date().toLocaleString()}
Reference: ${file.id}`;

                setTenderDocument(mockTenderDoc);
                setGeneratingStatus("complete");
                toast.success("Tender document generated!");
              }, 10000);
            }, 5000);
          }, 1000);
        }
      }, (index + 1) * 5000);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
    toast.info("File removed");
  };

  const downloadInsights = (file: UploadedFile) => {
    const content = `Tender AI Analysis - ${file.name}\n\nInsights:\n${file.insights?.join("\n")}\n\nExtracted from: ${file.uploadedAt.toLocaleString()}`;
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", `${file.name.replace(".pdf", "")}-tender.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Tender generated and downloaded!");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 max-w-[1200px] mx-auto bg-white text-black font-['Nunito_Sans']">
      {view === "upload" ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Tender AI</h1>
              <p className="text-black/40 font-bold uppercase tracking-widest text-[13px]">Intelligent Document Analysis</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-black/5 border border-black/5 rounded text-[12px] font-black uppercase tracking-widest hover:bg-black/10 transition-all">
                Filters
              </button>
            </div>
          </div>
          
          <div className="space-y-8">

          {/* Upload Section */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              isDragging
                ? "border-[#FF7A45] bg-[#FF7A45]/5"
                : "border-black/10 bg-black/2 hover:border-black/20"
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-[#FF7A45]/10 rounded-lg">
                  <Upload className="w-8 h-8 text-[#FF7A45]" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-black uppercase tracking-tight">
                  {isDragging ? "Drop your PDF here" : "Drag & Drop Your PDF"}
                </h2>
                <p className="text-black/40 font-black uppercase tracking-widest text-[12px]">
                  or click below to select
                </p>
              </div>
              <label className="inline-block">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  disabled={isProcessing}
                />
                <button
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    input?.click();
                  }}
                  disabled={isProcessing}
                  className="bg-[#FF7A45] text-white px-6 py-2 rounded text-[12px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Browse Files"
                  )}
                </button>
              </label>
              <p className="text-black/20 font-black uppercase tracking-widest text-[11px]">
                PDF files up to 50MB
              </p>
            </div>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-black/40">
                Processed Documents ({uploadedFiles.length})
              </h3>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="border border-black/5 rounded p-5 space-y-4 hover:border-black/10 transition-all"
                  >
                    {/* File Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-black/5 rounded mt-0.5">
                          <FileText className="w-4 h-4 text-black/40" />
                        </div>
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="text-[12px] font-black text-black uppercase tracking-widest truncate">
                            {file.name}
                          </h4>
                          <p className="text-[11px] font-black text-black/30 uppercase tracking-[0.15em]">
                            {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === "ready" && (
                          <div className="flex items-center gap-2 text-[12px] font-black text-[#00A86B] uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4" />
                            Ready
                          </div>
                        )}
                        {file.status === "processing" && (
                          <div className="flex items-center gap-2 text-[12px] font-black text-[#FF7A45] uppercase tracking-widest">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            Analyzing...
                          </div>
                        )}
                        {file.status === "completed" && (
                          <div className="flex items-center gap-2 text-[12px] font-black text-[#00A86B] uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4" />
                            Complete
                          </div>
                        )}
                        {file.status === "error" && (
                          <div className="flex items-center gap-2 text-[12px] font-black text-red-500 uppercase tracking-widest">
                            <AlertCircle className="w-4 h-4" />
                            Error
                          </div>
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1.5 hover:bg-red-500/10 text-red-500 rounded transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Show Generate Tender button for ready files */}
                    {file.status === "ready" && (
                      <div className="bg-black/2 p-4 rounded border border-black/5">
                        <button
                          onClick={() => generateTender(file.id)}
                          className="w-full flex items-center justify-center gap-2 bg-[#FF7A45] text-white px-4 py-2.5 rounded text-[11px] font-black uppercase tracking-widest hover:bg-[#F26636] transition-all"
                        >
                          <Brain className="w-3 h-3" />
                          Generate Tender
                        </button>
                      </div>
                    )}

                    {/* Insights or Skeleton Loading */}
                    {(file.status === "processing" || file.status === "completed") && (
                      <div className="space-y-3 bg-black/2 p-4 rounded border border-black/5">
                        <div className="flex items-center gap-2 mb-3">
                          {file.status === "processing" ? (
                            <>
                              <RefreshCw className="w-4 h-4 text-[#FF7A45] animate-spin" />
                              <h5 className="text-[12px] font-black text-black uppercase tracking-widest">
                                Generating Key Insights...
                              </h5>
                            </>
                          ) : (
                            <>
                              <Brain className="w-4 h-4 text-[#FF7A45]" />
                              <h5 className="text-[12px] font-black text-black uppercase tracking-widest">
                                Key Insights
                              </h5>
                            </>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {/* Show loaded insights */}
                          {file.insights && file.insights.map((insight, idx) => (
                            <li
                              key={idx}
                              className="text-[12px] font-bold text-black/60 uppercase tracking-[0.1em] flex items-start gap-2 animate-in fade-in duration-500"
                            >
                              <span className="text-[#FF7A45] mt-0.5">▸</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                          
                          {/* Show skeleton loaders for remaining insights */}
                          {file.status === "processing" && (
                            Array.from({ length: 5 - (file.insights?.length || 0) }).map((_, idx) => (
                              <div
                                key={`skeleton-${idx}`}
                                className="h-4 bg-black/10 rounded animate-pulse"
                              />
                            ))
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {uploadedFiles.length === 0 && (
            <div className="text-center py-8 text-black/20">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-black uppercase tracking-widest text-[12px]">
                No documents uploaded yet
              </p>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] max-w-xs mx-auto mt-1 leading-relaxed">
                Upload your first tender or RFQ document to get started with AI analysis
              </p>
            </div>
          )}
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Back Button */}
            <button
              onClick={() => setView("upload")}
              className="flex items-center gap-2 text-black/60 hover:text-black transition-colors font-black uppercase tracking-widest text-[12px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Upload
            </button>

            {/* Document Info */}
            {currentFile && (
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-black tracking-tighter uppercase">
                  Generating Tender
                </h2>
                <p className="text-black/60 font-black uppercase tracking-widest text-[12px]">
                  {currentFile.name}
                </p>
              </div>
            )}

            {/* Thinking Phase */}
            {generatingStatus === "thinking" && (
              <div className="bg-white border-2 border-black rounded-lg p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-[#FF7A45] animate-spin" />
                  <h3 className="text-xl font-black text-black tracking-tighter uppercase">
                    Thinking...
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-black/10 rounded-full animate-pulse w-3/4" />
                  <div className="h-4 bg-black/10 rounded-full animate-pulse w-5/6" />
                  <div className="h-4 bg-black/10 rounded-full animate-pulse w-2/3" />
                  <div className="h-4 bg-black/10 rounded-full animate-pulse w-4/5" />
                </div>
                <p className="text-black/40 font-black uppercase tracking-widest text-[11px]">
                  Analyzing requirements and preparing tender structure...
                </p>
              </div>
            )}

            {/* Generating Phase */}
            {generatingStatus === "generating" && (
              <div className="bg-white border-2 border-black rounded-lg p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-[#FF7A45] animate-pulse" />
                  <h3 className="text-xl font-black text-black tracking-tighter uppercase">
                    Generating Tender...
                  </h3>
                </div>
                <div className="space-y-6">
                  {/* Document Header Skeleton */}
                  <div className="space-y-3">
                    <div className="h-8 bg-black/20 rounded animate-pulse w-2/3" />
                    <div className="h-4 bg-black/10 rounded animate-pulse w-1/2" />
                    <div className="h-4 bg-black/10 rounded animate-pulse w-1/3" />
                  </div>
                  
                  {/* Section Skeletons */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-3 pt-4 border-t border-black/10">
                      <div className="h-6 bg-black/15 rounded animate-pulse w-1/4" />
                      <div className="h-3 bg-black/10 rounded animate-pulse w-full" />
                      <div className="h-3 bg-black/10 rounded animate-pulse w-5/6" />
                      <div className="h-3 bg-black/10 rounded animate-pulse w-4/5" />
                    </div>
                  ))}
                </div>
                <p className="text-black/40 font-black uppercase tracking-widest text-[11px]">
                  Crafting tender document with AI intelligence...
                </p>
              </div>
            )}

            {/* Complete Phase - Show Document */}
            {generatingStatus === "complete" && tenderDocument && (
              <div className="space-y-6">
                {/* Document Display */}
                <div className="bg-white border-2 border-black rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-black text-white px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6" />
                      <h3 className="font-black tracking-tighter uppercase text-lg">
                        Generated Tender Document
                      </h3>
                    </div>
                    <span className="text-[#FF7A45] font-black uppercase tracking-widest text-[11px]">
                      Ready
                    </span>
                  </div>
                  
                  <div className="p-8 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-['Nunito_Sans'] text-sm leading-relaxed text-black">
                      {tenderDocument}
                    </pre>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => {
                    const blob = new Blob([tenderDocument], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `tender_${currentFile?.name.replace('.pdf', '')}_${new Date().getTime()}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    toast.success("Tender document downloaded!");
                  }}
                  className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white py-4 rounded-lg font-black uppercase tracking-widest text-sm transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Tender
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
