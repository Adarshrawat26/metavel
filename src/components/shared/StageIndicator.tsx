import {
    Archive,
    CheckCircle2,
    ClipboardCheck,
    FileSearch,
    LogOut,
    MessageSquare,
    PenTool,
    Search,
    ShieldAlert,
    Zap
} from "lucide-react";

export type Stage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface StageIndicatorProps {
  currentStage: Stage;
}

export const stages = [
  { id: 1, label: "Request", icon: FileSearch },
  { id: 2, label: "Generate", icon: PenTool },
  { id: 3, label: "Negotiate", icon: MessageSquare },
  { id: 4, label: "Approval", icon: ClipboardCheck },
  { id: 5, label: "Execute", icon: Zap },
  { id: 6, label: "Search", icon: Search },
  { id: 7, label: "Comply", icon: ShieldAlert },
  { id: 8, label: "Review", icon: Archive },
  { id: 9, label: "Exit", icon: LogOut },
];

export function StageIndicator({ currentStage }: StageIndicatorProps) {
  return (
    <div className="w-full bg-white border-b border-black/5 py-4 px-6 mb-6 font-['Nunito_Sans']">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 relative">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    currentStage >= stage.id 
                      ? "bg-[#FF7A45] text-white" 
                      : "bg-black/5 text-black/20"
                  }`}
                >
                  {currentStage > stage.id ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <stage.icon className="w-3 h-3" />
                  )}
                </div>
                <span className={`text-[12px] font-black uppercase tracking-[0.15em] ${
                  currentStage === stage.id ? "text-black" : "text-black/30"
                }`}>
                  {stage.label}
                </span>
              </div>
              
              {index < stages.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 mb-4 bg-black/5 relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#FF7A45] transition-all duration-500" 
                    style={{ width: currentStage > stage.id ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
