import { useEffect, useRef } from "react";

export const useAnimationFrame = (cb: (time: number, delta: number) => void) => {
  const frame = useRef<number>(null);
  const last = useRef<DOMHighResTimeStamp>(0);
  const init = useRef<DOMHighResTimeStamp>(0);

  useEffect(() => {
    last.current = performance.now();
    init.current = performance.now();

    const animate = () => {
      const now = performance.now();
      const time = (now - init.current) / 1000;
      const delta = (now - last.current) / 1000;

      cb(time, delta);

      last.current = now;
      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [cb]);
};
