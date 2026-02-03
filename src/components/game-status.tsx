type GameStatusProps = {
  level: number;
  target: number;
  moves: number;
};

export function GameStatus({ level, target, moves }: GameStatusProps) {
  return (
    <div className="text-center p-4 rounded-lg glassmorphism">
      <h2 className="font-headline text-2xl font-bold">Level {level}</h2>
      <p className="text-lg mt-1">
        Target: <span className="font-bold text-primary-foreground bg-primary/80 px-2 py-1 rounded">{target}L</span>
      </p>
      <p className="text-lg mt-2">
        Moves: <span className="font-bold">{moves}</span>
      </p>
    </div>
  );
}
