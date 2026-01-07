import type { ComponentType } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  ShieldAlert, 
  Library, 
  Shield, 
  CalendarDays, 
  BarChart3, 
  UserCog, 
  User, 
  Calendar, 
  Settings as SettingsIcon, 
  Sparkles,
} from "lucide-react";
import type { Page } from "../types";

export type NavItem = {
  id: Page;
  label: string;
  icon: ComponentType<{ className?: string }>;
  group: "Main" | "Resources" | "System";
};

export const NAV_GROUPS = ["Main", "Resources", "System"] as const;

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Main" },
  { id: "contracts", label: "Contracts", icon: FileText, group: "Main" },
  { id: "tender-ai", label: "Tender AI", icon: Sparkles, group: "Main" },
  { id: "review", label: "Review", icon: ShieldAlert, group: "Main" },
  { id: "library", label: "Library", icon: Library, group: "Resources" },
  { id: "risk", label: "Risk Dashboard", icon: Shield, group: "Resources" },
  { id: "renewals", label: "Renewals", icon: CalendarDays, group: "Resources" },
  { id: "audit", label: "Audit Logs", icon: BarChart3, group: "System" },
  { id: "admin", label: "Admin", icon: UserCog, group: "System" },
  { id: "managers", label: "Managers", icon: User, group: "System" },
  { id: "calendar", label: "Calendar", icon: Calendar, group: "System" },
  { id: "settings", label: "Settings", icon: SettingsIcon, group: "System" },
];

