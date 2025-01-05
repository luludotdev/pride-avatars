declare module "konami" {
  class Konami {
    public constructor(arg: string | (() => void));

    public load(): void;
    public unload(): void;
  }

  export default Konami;
}
