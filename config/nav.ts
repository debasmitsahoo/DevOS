import {
  LayoutDashboard,
  User,
  FolderGit2,
  Swords,
  PenLine,
  BadgeCheck,
  Trophy,
  Users,
  FileText,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** keyboard hint shown in the command palette */
  shortcut?: string;
}

// §1.2 primary sidebar nav (private). Recruiter Mode is V2 / role-gated and
// intentionally absent here.
export const APP_NAV: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, shortcut: "G O" },
  { label: "Profile", href: "/dashboard/profile", icon: User, shortcut: "G P" },
  { label: "Repositories", href: "/dashboard/repositories", icon: FolderGit2, shortcut: "G R" },
  { label: "Problem-Solving", href: "/dashboard/solving", icon: Swords, shortcut: "G S" },
  { label: "Blogs", href: "/dashboard/blogs", icon: PenLine, shortcut: "G B" },
  { label: "Credentials", href: "/dashboard/credentials", icon: BadgeCheck },
  { label: "Achievements", href: "/dashboard/achievements", icon: Trophy },
  { label: "Communities", href: "/dashboard/communities", icon: Users },
  { label: "Résumé", href: "/dashboard/resume", icon: FileText, shortcut: "G C" },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

// §1.2 public passport tabs
export const PASSPORT_TABS = [
  { label: "Code", value: "code" },
  { label: "Writing", value: "writing" },
  { label: "Solving", value: "solving" },
  { label: "Milestones", value: "milestones" },
] as const;