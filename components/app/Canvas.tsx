import { useRef } from 'react'
import { useAnimationFrame } from '~lib/hooks/useAnimationFrame'
import { useStore } from '~lib/hooks/useStore'
import type { FC } from 'react'

export const Canvas: FC = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  const { state, dispatch } = useStore()
  useAnimationFrame(() => {
    if (!ref.current) return
    if (!state.dirty) return

    const ctx = ref.current.getContext('2d')
    if (ctx === null) return

    dispatch({ type: 'markClean' })
  }, [])

  return (
    <canvas
      ref={ref}
      className='w-full h-auto rounded'
      width='512'
      height='512'
    />
  )
}
