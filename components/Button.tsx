import { useCallback } from 'react'
import type { FC } from 'react'

interface Props {
  onClick: () => void
}

export const Button: FC<Props> = ({ onClick, children }) => {
  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') onClick()
  }, [onClick])

  return (
    <button type='button' onClick={handleClick}>
      {children}
    </button>
  )
}
