import { MarketingNavbar } from "@/components/marketing/navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <MarketingNavbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}