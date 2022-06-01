import { ChangeEventHandler, type FC, useCallback, useRef } from 'react'
import { Button } from '~/components/input/Button'
import { useStore } from '~/lib/hooks/useStore'
import { loadImage } from '~/lib/load'

export const LoadImage: FC = () => {
  const { state, dispatch } = useStore()
  const ref = useRef<HTMLInputElement>(null)

  const onLoadClicked = useCallback(() => {
    ref.current?.click()
  }, [])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async ev => {
      const file = ev.target.files?.[0]
      if (file === undefined) return

      await loadImage(dispatch, file)
    },
    [dispatch]
  )

  return (
    <>
      <Button disabled={state.saving} onClick={onLoadClicked}>
        📸 Load Image
      </Button>

      <input
        ref={ref}
        type='file'
        name='avatar'
        accept='image/*'
        className='hidden'
        onChange={handleChange}
      />
    </>
  )
}
