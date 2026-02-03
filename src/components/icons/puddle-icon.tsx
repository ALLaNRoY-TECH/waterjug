import { cn } from "@/lib/utils";

export function PuddleIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 20"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current text-blue-400/80", className)}
      {...props}
    >
      <path d="M0 10 C 10 0, 20 20, 30 10 C 40 0, 50 20, 60 10 C 70 0, 80 20, 90 10 C 95 5, 98 8, 100 10 L 100 20 L 0 20 Z" />
    </svg>
  );
}
