import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Confetti from "@/components/confetti";

type WinDialogProps = {
  isOpen: boolean;
  moves: number;
  level: number;
  onNextLevel: () => void;
};

export function WinDialog({ isOpen, moves, level, onNextLevel }: WinDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="glassmorphism">
        {isOpen && <Confetti count={150} />}
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-headline text-center text-accent-foreground">
            Level {level} Complete!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg">
            You solved it in <span className="font-bold text-foreground">{moves}</span> moves.
            <br />
            Excellent work!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onNextLevel} className="w-full">
            Next Level
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
