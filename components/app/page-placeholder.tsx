import { Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Honest placeholder for routes whose UI lands in a later implementation week
// (§16). Keeps the sidebar fully navigable in the foundation build.
export function PagePlaceholder({
  title,
  description,
  week,
}: {
  title: string;
  description: string;
  week: string;
}) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg border bg-card text-muted-foreground">
          <Construction className="size-5" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Badge variant="secondary">{week}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}