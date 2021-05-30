import { useCallback } from 'react'
import { Button } from '~components/input/Button'
import { useStore } from '~lib/hooks/useStore'
import type { FC, RefObject } from 'react'

interface Props {
  children?: never
  canvasRef: RefObject<HTMLCanvasElement>
}

export const SaveImage: FC<Props> = ({ canvasRef }) => {
  const { state, dispatch } = useStore()
  const onSaveClicked = useCallback(async () => {
    if (state.saving) return
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    if (state.frames) {
      dispatch({ type: 'setSaving', value: true })

      try {
        // TODO: Implement
      } finally {
        dispatch({ type: 'setSaving', value: false })
      }
    } else {
      const a = document.createElement('a')
      const b64 = canvas.toDataURL('image/png;base64')

      a.href = b64
      a.download = 'avatar.png'
      a.click()
      a.remove()
    }
  }, [canvasRef, state, dispatch])

  return (
    <Button disabled={state.saving} onClick={onSaveClicked}>
      💾 Download
    </Button>
  )
}
