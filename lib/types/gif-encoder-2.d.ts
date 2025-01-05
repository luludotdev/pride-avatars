declare module "gif-encoder-2" {
  import type { Buffer } from "buffer";

  type Algorithm = "neuquant" | "octree";

  class GIFEncoder extends EventEmitter {
    public readonly out: ByteArray;

    public constructor(
      width: number,
      height: number,
      algorithm: Algorithm = "neuquant",
      useOptimizer = false,
      totalFrames = 0,
    );

    public start(): void;
    public finish(): void;
    public addFrame(ctx: CanvasRenderingContext2D): void;

    public setFrameRate(fps: number): void;
    public setDelay(ms: number): void;
    public setQuality(quality: number): void;
    public setRepeat(repeat: number): void;
  }

  class ByteArray {
    public getData(): Buffer;
  }

  export default GIFEncoder;
}
