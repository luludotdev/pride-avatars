import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useExperimental = () => {
  const { query } = useRouter()
  const experimental = useMemo<boolean>(
    () => query.experimental !== undefined,
    [query]
  )

  return experimental
}
