import { useCallback } from 'react'
import { Button } from '~components/input/Button'
import type { FC, RefObject } from 'react'

interface Props {
  children?: never
  canvasRef: RefObject<HTMLCanvasElement>
}

export const SaveImage: FC<Props> = ({ canvasRef }) => {
  const onSaveClicked = useCallback(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    const a = document.createElement('a')
    const b64 = canvas.toDataURL('image/png;base64')

    a.href = b64
    a.download = 'avatar.png'
    a.click()
    a.remove()
  }, [canvasRef])

  return <Button onClick={onSaveClicked}>💾 Download</Button>
}
