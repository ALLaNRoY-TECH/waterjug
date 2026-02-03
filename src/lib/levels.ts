export type Level = {
  id: number;
  jugA: number;
  jugB: number;
  target: number;
};

export const levels: Level[] = [
  { id: 1, jugA: 4, jugB: 3, target: 2 },
  { id: 2, jugA: 5, jugB: 3, target: 4 },
  { id: 3, jugA: 8, jugB: 5, target: 6 },
  { id: 4, jugA: 7, jugB: 5, target: 3 },
  { id: 5, jugA: 9, jugB: 4, target: 7 },
];
