import type { SetNonNullable } from "type-fest";

export type Layer = (typeof layers)[number];
export const layers = ["flag", "flag2", "image", "mask", "composite"] as const;

const makeLayer = () => {
  const canvas = document.createElement("canvas");
  return canvas.getContext("2d") ?? undefined;
};

export type MaybeLayers = Record<Layer, ReturnType<typeof makeLayer>>;
export const makeLayers = () =>
  Object.fromEntries(
    layers.map((layer) => [layer, makeLayer()] as const),
  ) as MaybeLayers;

export type Layers = SetNonNullable<MaybeLayers>;
export const ensureLayers = (maybe: MaybeLayers): Layers | undefined => {
  const hasUndefined = Object.values(maybe).includes(undefined);
  if (hasUndefined) return undefined;

  return maybe as Layers;
};
