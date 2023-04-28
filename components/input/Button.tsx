import clsx from 'clsx'
import { useCallback } from 'react'
import type { FC, PropsWithChildren } from 'react'

interface Props {
  disabled?: boolean
  onClick(): void
}

export const Button: FC<PropsWithChildren<Props>> = ({
  disabled,
  onClick,
  children,
}) => {
  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') onClick()
  }, [onClick])

  return (
    <button
      className={clsx(
        'w-full',
        'py-2',
        'font-semibold',
        'text-lg',
        'rounded',
        'border',
        'border-gray-400',
        'dark:border-gray-500',
        'transition-all',
        'focus:outline-none',
        'hover:border-gray-100',
        'dark:hover:border-gray-300',
        'hover:shadow-md',
        'active:shadow-sm',
        'dark:hover:shadow-none',
        'dark:active:shadow-none',
        'disabled:opacity-40',
        'disabled:shadow-none',
        'disabled:cursor-not-allowed',
        'disabled:hover:border-gray-400',
        'dark:disabled:hover:border-gray-500',
      )}
      disabled={disabled}
      onClick={handleClick}
      type='button'
    >
      {children}
    </button>
  )
}
