"use client";

import { createContext, useContext, useMemo, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { useLayers as useMakeLayers } from "~/lib/hooks/useLayers";
import type { MaybeLayers } from "~/lib/layers";

const Context = createContext<{
  readonly canvas: RefObject<HTMLCanvasElement>;
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
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCanvas = () => {
  const { canvas } = useContext(Context);
  return canvas;
};

export const useLayers = () => {
  const { layers } = useContext(Context);
  return layers;
};
