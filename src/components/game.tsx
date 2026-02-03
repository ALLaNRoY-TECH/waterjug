"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';

import { levels, type Level } from '@/lib/levels';
import { Jug } from '@/components/jug';
import { GameControls } from '@/components/game-controls';
import { GameStatus } from '@/components/game-status';
import { WinDialog } from '@/components/win-dialog';
import { HintButton } from '@/components/hint-button';
import { WaterTap } from '@/components/water-tap';
import { PuddleIcon } from '@/components/icons/puddle-icon';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

type JugsState = {
  a: number;
  b: number;
};

type AnimationState = {
  pouringFrom?: 'A' | 'B';
  emptyingTo?: 'A' | 'B';
};

export default function Game() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Level>(levels[levelIndex]);
  const [jugs, setJugs] = useState<JugsState>({ a: 0, b: 0 });
  const [moves, setMoves] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [sounds, setSounds] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [animation, setAnimation] = useState<AnimationState>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const soundPack = {
      fill: new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.2 },
      }).toDestination(),
      pour: new Tone.NoiseSynth({
        noise: { type: 'brown' },
        envelope: { attack: 0.05, decay: 0.3, sustain: 0, release: 0.1 },
      }).toDestination(),
      empty: new Tone.NoiseSynth({
        noise: { type: 'pink' },
        envelope: { attack: 0.1, decay: 0.4, sustain: 0, release: 0.1 },
      }).toDestination(),
      win: new Tone.Synth({
        oscillator: { type: 'triangle8' },
        envelope: { attack: 0.05, decay: 0.2, sustain: 0.2, release: 0.5 },
      }).toDestination(),
    };
    
    setSounds(soundPack);

    return () => {
        if(soundPack){
            Object.values(soundPack).forEach((sound: any) => {
                if(sound && typeof sound.dispose === 'function'){
                    sound.dispose()
                }
            });
        }
    };
  }, []);

  const playSound = useCallback((soundName: keyof typeof sounds, note?: string) => {
    if (!sounds || isMuted || !Tone.context.state || Tone.context.state !== 'running') return;
    
    const sound = sounds[soundName];
    if (sound instanceof Tone.Synth) {
      sound.triggerAttackRelease(note || 'C4', '8n');
    } else if (sound instanceof Tone.NoiseSynth) {
        sound.triggerAttackRelease('2n');
    }
  }, [sounds, isMuted]);

  const startAudioContext = async () => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
  };


  useEffect(() => {
    setCurrentLevel(levels[levelIndex]);
    setJugs({ a: 0, b: 0 });
    setMoves(0);
    setIsWin(false);
  }, [levelIndex]);

  useEffect(() => {
    if (jugs.a === currentLevel.target || jugs.b === currentLevel.target) {
      if(!isWin) {
        setIsWin(true);
        playSound('win', 'C5');
        setTimeout(() => playSound('win', 'E5'), 200);
        setTimeout(() => playSound('win', 'G5'), 400);
      }
    }
  }, [jugs, currentLevel.target, playSound, isWin]);

  const handleAction = (action: () => void) => {
    startAudioContext();
    if (isWin) return;
    action();
    setMoves(prev => prev + 1);
  };
  
  const triggerAnimation = (anim: AnimationState, duration: number) => {
      setAnimation(anim);
      setTimeout(() => setAnimation({}), duration);
  }

  const handleFill = (jug: 'A' | 'B') => handleAction(() => {
    playSound('fill', jug === 'A' ? 'C4' : 'E4');
    if (jug === 'A') {
      setJugs(prev => ({ ...prev, a: currentLevel.jugA }));
    } else {
      setJugs(prev => ({ ...prev, b: currentLevel.jugB }));
    }
  });

  const handleEmpty = (jug: 'A' | 'B') => handleAction(() => {
    playSound('empty');
    triggerAnimation({ emptyingTo: jug }, 1200);
    if (jug === 'A') {
      setJugs(prev => ({ ...prev, a: 0 }));
    } else {
      setJugs(prev => ({ ...prev, b: 0 }));
    }
  });

  const handlePour = (from: 'A' | 'B', to: 'A' | 'B') => handleAction(() => {
    playSound('pour');
    triggerAnimation({ pouringFrom: from }, 1500);

    const fromJug = from === 'A' ? 'a' : 'b';
    const toJug = to === 'A' ? 'a' : 'b';
    const toCapacity = to === 'A' ? currentLevel.jugA : currentLevel.jugB;

    setJugs(prev => {
      const fromAmount = prev[fromJug];
      const toAmount = prev[toJug];
      const toSpace = toCapacity - toAmount;
      const amountToPour = Math.min(fromAmount, toSpace);

      return {
        ...prev,
        [fromJug]: fromAmount - amountToPour,
        [toJug]: toAmount + amountToPour,
      };
    });
  });

  const handleReset = () => {
    startAudioContext();
    setJugs({ a: 0, b: 0 });
    setMoves(0);
  };

  const handleNextLevel = () => {
    if (levelIndex < levels.length - 1) {
      setLevelIndex(prev => prev + 1);
    } else {
      setLevelIndex(0);
    }
    setIsWin(false);
  };

  const MemoizedHintButton = useMemo(() => (
    <HintButton
      jugA={currentLevel.jugA}
      jugB={currentLevel.jugB}
      target={currentLevel.target}
      currentA={jugs.a}
      currentB={jugs.b}
      moves={moves}
    />
  ), [currentLevel, jugs, moves]);


  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 space-y-6 relative overflow-hidden">
      <header className="absolute top-4 right-4 z-20">
        <Button onClick={() => { startAudioContext(); setIsMuted(!isMuted); }} variant="ghost" size="icon">
          {isMuted ? <VolumeX /> : <Volume2 />}
        </Button>
      </header>
      <div className="absolute top-0 left-0 z-0">
        <WaterTap />
      </div>

      <div className="flex flex-col items-center gap-4 z-10">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-white text-shadow-lg tracking-wide" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
          Aqua Puzzle
        </h1>
        <GameStatus level={currentLevel.id} target={currentLevel.target} moves={moves} />
      </div>

      <div className="flex items-end justify-center gap-8 md:gap-16 relative">
        <Jug
          label="A"
          capacity={currentLevel.jugA}
          current={jugs.a}
          isPouring={animation.pouringFrom === 'A'}
        />
        <Jug
          label="B"
          capacity={currentLevel.jugB}
          current={jugs.b}
          isPouring={animation.pouringFrom === 'B'}
        />
        {animation.emptyingTo && (
            <div className={cn(
                "absolute bottom-[-20px] w-48 h-16 z-0",
                animation.emptyingTo === 'A' ? 'left-[-40px]' : 'right-[-40px]'
            )}>
                 <PuddleIcon className="w-full h-full animate-puddle-spread" />
            </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 z-10 w-full max-w-sm">
        <GameControls
          onFill={handleFill}
          onEmpty={handleEmpty}
          onPour={handlePour}
          onReset={handleReset}
        />
        {isClient && MemoizedHintButton}
      </div>

      <WinDialog
        isOpen={isWin}
        moves={moves}
        level={currentLevel.id}
        onNextLevel={handleNextLevel}
      />
    </main>
  );
}
