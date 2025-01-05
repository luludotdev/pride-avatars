"use client";

import { createContext, use, useMemo, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { useLayers as useMakeLayers } from "~/lib/hooks/useLayers";
import type { MaybeLayers } from "~/lib/layers";

const Context = createContext<{
  readonly canvas: RefObject<HTMLCanvasElement | null>;
  readonly layers: MaybeLayers;
}>({
  canvas: { current: null },
  layers: {
    flag: undefined,
    flag2: undefined,
    image: undefined,
    mask: undefined,
    composite: undefined,
  },
});

export const CanvasProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const layers = useMakeLayers();

  const value = useMemo(() => ({ canvas: ref, layers }), [ref, layers]);
  return <Context value={value}>{children}</Context>;
};

export const useCanvas = () => {
  const { canvas } = use(Context);
  return canvas;
};

export const useLayers = () => {
  const { layers } = use(Context);
  return layers;
};
