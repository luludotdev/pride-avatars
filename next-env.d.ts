/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

declare module 'gif-encoder-2' {
  class GIFEncoder extends EventEmitter {
    public readonly out: ByteArray

    constructor(width: number, height: number, algorithm = 'neuquant', useOptimizer = false, totalFrames = 0)

    public start(): void
    public finish(): void
    public addFrame(ctx: CanvasRenderingContext2D): void

    public setFrameRate(fps: number): void
    public setDelay(ms: number): void
    public setQuality(quality: number): void
    public setRepeat(repeat: number): void
  }

  class ByteArray {
    public getData(): Buffer
  }

  export default GIFEncoder
}
