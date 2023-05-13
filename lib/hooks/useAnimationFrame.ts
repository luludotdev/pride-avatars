import { useCallback, useEffect, useRef } from 'react'

export const useAnimationFrame = (
  cb: (arg: { time: number; delta: number }) => Promise<void> | void,
  deps: readonly unknown[],
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  if (typeof window === 'undefined') return

  const frame = useRef<number>()
  const last = useRef(performance.now())
  const init = useRef(performance.now())

  const animate = useCallback(async () => {
    const now = performance.now()
    const time = (now - init.current) / 1_000
    const delta = (now - last.current) / 1_000

    // eslint-disable-next-line n/callback-return, n/no-callback-literal, promise/prefer-await-to-callbacks
    await cb({ time, delta })

    // eslint-disable-next-line require-atomic-updates
    last.current = now
    frame.current = requestAnimationFrame(animate)
  }, [cb])

  useEffect(() => {
    frame.current = requestAnimationFrame(animate)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, ...deps])
  /* eslint-enable react-hooks/rules-of-hooks */
}
