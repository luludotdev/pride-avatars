import { useCallback, useRef } from 'react'
import type { ChangeEventHandler, FC } from 'react'
import { Button } from '~/components/input/Button'
import { useDebug } from '~/lib/hooks/useDebug'
import { useStore } from '~/lib/hooks/useStore'
import { loadImage } from '~/lib/load'

export const LoadImage: FC = () => {
  const { state, dispatch } = useStore()
  const debug = useDebug()
  const ref = useRef<HTMLInputElement>(null)

  const onLoadClicked = useCallback(() => {
    ref.current?.click()
  }, [])

  const onClearClicked = useCallback(
    () => dispatch({ type: 'clearImage' }),
    [dispatch],
  )

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async ev => {
      const file = ev.target.files?.[0]
      if (file === undefined) return

      await loadImage(dispatch, file)
    },
    [dispatch],
  )

  return (
    <>
      <Button disabled={state.saving} onClick={onLoadClicked}>
        📸 Load Image
      </Button>

      {debug && (
        <Button disabled={state.saving} onClick={onClearClicked}>
          🗑️ Clear Image
        </Button>
      )}

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
