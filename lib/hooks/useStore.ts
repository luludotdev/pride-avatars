import { useContext } from 'react'
import { store } from '~components/Store'

export const useStore = () => {
  const { state, dispatch } = useContext(store)
  return { state, dispatch }
}
