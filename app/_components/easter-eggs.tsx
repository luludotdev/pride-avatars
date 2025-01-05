"use client";

import { Circle } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect } from "react";
import useKonami from "react-use-konami";
import { Button } from "~/components/ui/button";
import { useCanvas } from "~/lib/data/rendering";
import { useStore } from "~/lib/data/store";

export const KonamiButton = () => {
  const canvasRef = useCanvas();

  const frames = useStore((state) => state.frames);
  const showRecursionEasterEgg = useStore(
    (state) => state.showRecursionEasterEgg,
  );

  const loadImage = useStore((state) => state.loadImage);
  const toggleRecursion = useStore((state) => state.toggleRecursionEasterEgg);

  useKonami(toggleRecursion, {
    code: [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ],
  });

  const onClick = useCallback(() => {
    if (!canvasRef.current) return;
    if (frames) return;
    const canvas = canvasRef.current;

    const b64 = canvas.toDataURL();
    void loadImage(b64);
  }, [canvasRef, frames, loadImage]);

  if (frames !== null) return null;
  if (!showRecursionEasterEgg) return null;

  return (
    <Button className="w-full" onClick={onClick} variant="outline">
      <Circle className="h-5 w-5" />
    </Button>
  );
};

export const OrangeCredits = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const showOrangeEasterEgg = useStore((state) => state.showOrangeEasterEgg);
  const enableOrangeEasterEgg = useStore(
    (state) => state.enableOrangeEasterEgg,
  );
  const toggleOrangeEasterEgg = useStore(
    (state) => state.toggleOrangeEasterEgg,
  );

  useKonami(toggleOrangeEasterEgg, {
    code: ["h", "e", "y", "a", "p", "p", "l", "e"],
  });

  useEffect(() => {
    const now = new Date();
    const isAprilFools = now.getMonth() === 3 && now.getDate() === 1;

    const rand = Math.random();
    const chance = isAprilFools ? 0.666_666 : 0.02;
    // 2% chance to automatically enable "annoying orange" mode
    // or 66.6% chance on april fools day (2/3rds time)

    if (rand <= chance) enableOrangeEasterEgg();
  }, [enableOrangeEasterEgg]);

  if (!showOrangeEasterEgg) return null;
  return <>{children}</>;
};
