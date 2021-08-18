import { useCallback, useEffect, useRef } from 'react'

export const useAnimationFrame = (
  cb: (arg: { time: number; delta: number }) => void,
  deps: readonly unknown[]
) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  if (typeof window === 'undefined') return

  const frame = useRef<number>()
  const last = useRef(performance.now())
  const init = useRef(performance.now())

  const animate = useCallback(() => {
    const now = performance.now()
    const time = (now - init.current) / 1000
    const delta = (now - last.current) / 1000

    cb({ time, delta })
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
