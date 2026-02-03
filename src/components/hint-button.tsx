"use client";

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from "@/hooks/use-toast";
import { getAIHint } from '@/lib/actions';

type HintButtonProps = {
  jugA: number;
  jugB: number;
  target: number;
  currentA: number;
  currentB: number;
  moves: number;
};

export function HintButton(props: HintButtonProps) {
  const [hint, setHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleGetHint = async () => {
    setIsLoading(true);
    setHint(null);
    try {
      const hintText = await getAIHint(props);
      setHint(hintText);
      setIsOpen(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch a hint.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-accent/80 hover:bg-accent border-accent-foreground/30 text-accent-foreground"
          onClick={handleGetHint}
          disabled={isLoading}
        >
          <Lightbulb className="mr-2 h-4 w-4" />
          {isLoading ? 'Thinking...' : 'Get Hint'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glassmorphism">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none font-headline">AI Hint</h4>
            <p className="text-sm text-muted-foreground">
              {hint || "Let's see..."}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
