import { parse as parsePath } from "path";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { preloadFlags } from "~/lib/flags";
import type { FlagName } from "~/lib/flags";

// eslint-disable-next-line no-restricted-globals, n/prefer-global/process
const IS_DEV = process.env.NODE_ENV !== "production";

const LAST_SHOW_ADD_KEY = "@@pride-avatars/last-shown-ad";
const loadLastShownAd: () => State["lastShownAd"] = () => {
  if (typeof window === "undefined") return undefined;

  const stored = localStorage.getItem(LAST_SHOW_ADD_KEY);
  if (!stored) return undefined;

  const parsed = Number.parseInt(stored, 10);
  if (Number.isNaN(parsed)) return undefined;

  return new Date(parsed);
};

export type AnimationFrame = [canvas: HTMLCanvasElement, clear: boolean];
export interface State {
  dirty: boolean;
  markClean(this: void): void;

  quality: number;
  setQuality(this: void, quality: number): void;

  padding: number;
  setPadding(this: void, padding: number): void;

  angle: number;
  setAngle(this: void, angle: number): void;

  blur: number;
  setBlur(this: void, blur: number): void;

  feather: number;
  setFeather(this: void, feather: number): void;

  preview: boolean;
  setPreview(this: void, preview: boolean): void;

  clip: boolean;
  setClip(this: void, clip: boolean): void;

  dualFlag: boolean;
  setDualFlag(this: void, value: boolean): void;

  blurFlagBoundary: boolean;
  setBlurFlagBoundary(this: void, blur: boolean): void;

  flag: FlagName;
  setFlag(this: void, flag: FlagName): void;

  flag2: FlagName;
  setFlag2(this: void, flag: FlagName): void;

  filename: string | null;
  image: HTMLImageElement | null;
  frames: AnimationFrame[] | null;
  delay: number;

  loadImage(this: void, image: File | string): Promise<void>;
  clearImage(this: void): void;

  showRecursionEasterEgg: boolean;
  showOrangeEasterEgg: boolean;
  toggleRecursionEasterEgg(this: void): void;
  toggleOrangeEasterEgg(this: void): void;
  enableOrangeEasterEgg(this: void): void;

  saving: boolean;
  setSaving(this: void, saving: boolean): void;

  advertOpen: boolean;
  lastShownAd: Date | undefined;
  setAdShowing(this: void, showing: boolean): void;
}

export const useStore = create<State>()(
  devtools(
    (set, get) => {
      const clearPreviousImage = () => {
        const image = get().image;
        const frames = get().frames ?? [];

        image?.remove();
        for (const [frame] of frames) {
          frame.remove();
        }
      };

      return {
        dirty: true as boolean,
        markClean: () => {
          const dirty = get().dirty;
          if (dirty) set({ dirty: false }, false, "markClean");
        },

        quality: 3,
        setQuality: (quality) =>
          set({ dirty: true, quality }, false, "setQuality"),

        padding: 42,
        setPadding: (padding) =>
          set({ dirty: true, padding }, false, "setPadding"),

        angle: 0,
        setAngle: (raw) => {
          const snap = 0.25;
          const angle = raw > snap * -1 && raw < snap ? 0 : raw;

          set({ dirty: true, angle }, false, "setAngle");
        },

        blur: 0,
        setBlur: (blur) => set({ dirty: true, blur }, false, "setBlur"),

        feather: 0,
        setFeather: (feather) =>
          set({ dirty: true, feather }, false, "setFeather"),

        preview: false,
        setPreview: (preview) => set({ preview }, false, "setPreview"),

        clip: true,
        setClip: (clip) => set({ dirty: true, clip }, false, "setClip"),

        dualFlag: false,
        setDualFlag: (dualFlag) =>
          set({ dirty: true, dualFlag }, false, "setDualFlag"),

        blurFlagBoundary: false,
        setBlurFlagBoundary: (blurFlagBoundary) =>
          set({ dirty: true, blurFlagBoundary }, false, "setBlurFlagBoundary"),

        flag: "Pastel",
        setFlag: (flag) => set({ dirty: true, flag }, false, "setFlag"),

        flag2: "Pastel",
        setFlag2: (flag2) => set({ dirty: true, flag2 }, false, "setFlag2"),

        filename: null,
        image: null,
        frames: null,
        delay: -1,
        loadImage: async (file) => {
          const setImage = (data: string, filename?: string) => {
            clearPreviousImage();

            const img = new Image();
            img.src = data;

            if (filename) {
              set(
                { dirty: true, filename, image: img, frames: null, delay: -1 },
                false,
                "loadImage",
              );
            } else {
              set(
                { dirty: true, image: img, frames: null, delay: -1 },
                false,
                "loadImage",
              );
            }
          };

          if (typeof file === "string") {
            setImage(file);
            return;
          }

          const { name: filename } = parsePath(file.name);
          if (file.type !== "image/gif") {
            const image = URL.createObjectURL(file);
            setImage(image, filename);

            return;
          }

          const { parseGIF, decompressFrames } = await import("gifuct-js");
          const gif = parseGIF(await file.arrayBuffer());
          const decoded = decompressFrames(gif, true);

          if (decoded.length === 0) return;
          if (decoded.length === 1) {
            const image = URL.createObjectURL(file);
            setImage(image, filename);

            return;
          }

          const { delay } = decoded[0];
          const frames: AnimationFrame[] = decoded.map(
            ({ patch, disposalType, dims: { width, height, top, left } }) => {
              const canvas = document.createElement("canvas");
              canvas.width = gif.lsd.width;
              canvas.height = gif.lsd.height;

              const ctx = canvas.getContext("2d");
              if (ctx === null) throw new Error("oh no");

              const image = ctx.createImageData(width, height);
              image.data.set(patch);

              ctx.putImageData(image, left, top);

              return [canvas, disposalType === 2];
            },
          );

          clearPreviousImage();
          set(
            { dirty: true, filename, image: null, frames, delay },
            false,
            "loadImage",
          );
        },
        clearImage: () => {
          clearPreviousImage();
          set(
            { dirty: true, image: null, frames: null, delay: -1 },
            false,
            "clearImage",
          );
        },

        showRecursionEasterEgg: false,
        showOrangeEasterEgg: false,
        toggleRecursionEasterEgg: () => {
          const showRecursionEasterEgg = !get().showRecursionEasterEgg;
          set({ showRecursionEasterEgg }, false, "toggleRecursionEasterEgg");
        },
        toggleOrangeEasterEgg: () => {
          const showOrangeEasterEgg = !get().showOrangeEasterEgg;
          if (showOrangeEasterEgg) preloadFlags(true);

          set(
            { dirty: true, showOrangeEasterEgg },
            false,
            "toggleOrangeEasterEgg",
          );
        },
        enableOrangeEasterEgg: () => {
          preloadFlags(true);

          set(
            { dirty: true, showOrangeEasterEgg: true },
            false,
            "toggleOrangeEasterEgg",
          );
        },

        saving: false,
        setSaving: (saving) => set({ saving }, false, "setSaving"),

        advertOpen: false,
        lastShownAd: loadLastShownAd(),
        setAdShowing: (advertOpen) => {
          if (advertOpen) {
            const now = new Date();
            localStorage.setItem(LAST_SHOW_ADD_KEY, now.getTime().toString());

            set({ advertOpen, lastShownAd: now }, false, "setAdShowing");
          } else {
            set({ advertOpen }, false, "setAdShowing");
          }
        },
      };
    },
    { enabled: IS_DEV },
  ),
);
