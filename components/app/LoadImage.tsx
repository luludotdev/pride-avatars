import { Suspense, useCallback, useRef } from 'react'
import type { ChangeEventHandler, FC } from 'react'
import { Button } from '~/components/input/Button'
import { useDebug } from '~/lib/hooks/useDebug'
import { useStore } from '~/lib/store'

export const LoadImage: FC = () => {
  const saving = useStore(state => state.saving)

  const loadImage = useStore(state => state.loadImage)
  const clearImage = useStore(state => state.clearImage)

  const ref = useRef<HTMLInputElement>(null)
  const onLoadClicked = useCallback(() => {
    ref.current?.click()
  }, [])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async ev => {
      const file = ev.target.files?.[0]
      if (file === undefined) return

      await loadImage(file)
    },
    [loadImage],
  )

  return (
    <>
      <Button disabled={saving} onClick={onLoadClicked}>
        📸 Load Image
      </Button>

      <Suspense fallback={null}>
        <ClearImage onClearClicked={clearImage} saving={saving} />
      </Suspense>

      <input
        accept='image/*'
        className='hidden'
        name='avatar'
        onChange={handleChange}
        ref={ref}
        type='file'
      />
    </>
  )
}

interface ClearImageProps {
  readonly saving: boolean
  onClearClicked(): void
}

const ClearImage: FC<ClearImageProps> = ({ saving, onClearClicked }) => {
  const debug = useDebug()
  if (!debug) return null

  return (
    <Button disabled={saving} onClick={onClearClicked}>
      🗑️ Clear Image
    </Button>
  )
}
