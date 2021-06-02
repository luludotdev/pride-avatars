import Konami from 'konami'
import { useEffect } from 'react'

export const useKonami = (fn: () => void) => {
  useEffect(() => {
    const konami = new Konami(fn)
    konami.load()

    return () => {
      konami.unload()
    }
  })
}
