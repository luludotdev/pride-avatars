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
    <button
      type='button'
      className='w-full py-2 font-semibold text-lg rounded border border-gray-400 dark:border-gray-500 transition-all focus:outline-none hover:border-gray-100 dark:hover:border-gray-300 hover:shadow-md dark:hover:shadow-none'
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
