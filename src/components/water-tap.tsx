import { Bath } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaterTap({ className, ...props }: React.ComponentProps<typeof Bath>) {
    return (
        <div className={cn("relative", className)}>
            <Bath className="w-24 h-24 text-slate-400/80" {...props} />
        </div>
    )
}
