import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, RotateCw, Waves, Trash2 } from "lucide-react";

type GameControlsProps = {
  onFill: (jug: 'A' | 'B') => void;
  onEmpty: (jug: 'A' | 'B') => void;
  onPour: (from: 'A' | 'B', to: 'A' | 'B') => void;
  onReset: () => void;
};

export function GameControls({ onFill, onEmpty, onPour, onReset }: GameControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
      <Button onClick={() => onFill('A')}><Waves className="mr-2" /> Fill A</Button>
      <Button onClick={() => onFill('B')}><Waves className="mr-2" /> Fill B</Button>
      <Button onClick={() => onPour('A', 'B')} variant="secondary">Pour A <ArrowRight className="mx-2" /> B</Button>
      <Button onClick={() => onPour('B', 'A')} variant="secondary">Pour B <ArrowLeft className="mx-2" /> A</Button>
      <Button onClick={() => onEmpty('A')} variant="destructive"><Trash2 className="mr-2" /> Empty A</Button>
      <Button onClick={() => onEmpty('B')} variant="destructive"><Trash2 className="mr-2" /> Empty B</Button>
      <Button onClick={onReset} className="col-span-2" variant="outline"><RotateCw className="mr-2" /> Reset Level</Button>
    </div>
  );
}
