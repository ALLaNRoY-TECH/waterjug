import { cn } from "@/lib/utils";

type JugProps = {
  label: string;
  capacity: number;
  current: number;
  isPouring?: boolean;
};

export function Jug({ label, capacity, current, isPouring = false }: JugProps) {
  const waterPercentage = (current / capacity) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "relative w-32 h-48 md:w-40 md:h-64 bg-white/30 border-4 border-white/80 rounded-t-xl rounded-b-lg overflow-hidden transition-transform duration-500",
          "shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]",
          isPouring && "animate-tilt-pour"
        )}
      >
        <div
          className="absolute bottom-0 left-0 right-0 bg-primary transition-[height] duration-500 ease-in-out"
          style={{ height: `${waterPercentage}%` }}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-blue-300/50 opacity-75"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl md:text-5xl font-bold font-headline text-white drop-shadow-md">
            {current}
          </span>
        </div>
      </div>
      <div className="text-center font-semibold">
        <p className="font-headline text-lg">Jug {label}</p>
        <p className="text-sm text-foreground/80">{capacity}L Capacity</p>
      </div>
    </div>
  );
}
