"use client";

import type { DragEvent } from "react";
import { Suspense } from "react";
import { useCanvas, useLayers } from "#/lib/data/rendering";
import { useStore } from "#/lib/data/store";
import { useAnimationFrame } from "#/lib/hooks/useAnimationFrame";
import { useDebug } from "#/lib/hooks/useDebug";
import { ensureLayers } from "#/lib/layers";
import { qualityToResolution } from "#/lib/quality";
import { drawFrame } from "#/lib/render";
import { cn } from "#/lib/utils";

export const Canvas = () => {
  const ref = useCanvas();

  const quality = useStore((state) => state.quality);
  const preview = useStore((state) => state.preview);

  const loadImage = useStore((state) => state.loadImage);

  const handleDrop = async (ev: DragEvent<HTMLCanvasElement>) => {
    ev.preventDefault();

    const file = ev.dataTransfer.items[0]?.getAsFile();
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    await loadImage(file);
  };

  const resolution = qualityToResolution(quality);

  return (
    <>
      <canvas
        className={cn("aspect-square h-auto w-full border", preview && "rounded-full")}
        height={resolution}
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
        onDrop={handleDrop}
        ref={ref}
        width={resolution}
      />

      <Suspense fallback={null}>
        <Render />
      </Suspense>
    </>
  );
};

const Render = () => {
  const debug = useDebug();
  const ref = useCanvas();
  const maybeLayers = useLayers();

  const render = async (time: number) => {
    const state = useStore.getState();

    if (state.saving) return;
    if (!ref.current) return;
    if (!debug && !state.dirty && state.frames === null) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const layers = ensureLayers(maybeLayers);
    if (!ctx || !layers) return;

    await drawFrame(ctx, layers, state, time);
    if (state.blur === 0) state.markClean();
  };

  useAnimationFrame(render);
  return null;
};
