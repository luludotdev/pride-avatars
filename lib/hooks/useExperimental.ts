import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useExperimental = () => {
  const { query } = useRouter()
  return useMemo<boolean>(() => query.experimental !== undefined, [query])
}
