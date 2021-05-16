import { createContext, useMemo, useReducer } from 'react'
import type { FlagName } from '~lib/flags'
import type { Dispatch, FC, Reducer } from 'react'

export interface State {
  dirty: boolean
  padding: number
  angle: number
  flag: FlagName
  image: HTMLImageElement | null
}

const initialState: State = {
  dirty: true,
  padding: 10,
  angle: 0,
  flag: 'Pastel',
  image: null,
}

interface Context {
  state: State
  dispatch: Dispatch<Action>
}

// @ts-expect-error
export const store = createContext<Context>({ state: initialState })

type Action =
  | { type: 'markClean' }
  | { type: 'setPadding'; value: number }
  | { type: 'setAngle'; value: number }
  | { type: 'setFlag'; value: FlagName }
  | { type: 'setImage'; value: string }

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    (prevState, action) => {
      switch (action.type) {
        case 'markClean':
          return { ...prevState, dirty: false }

        case 'setPadding':
          return { ...prevState, dirty: true, padding: action.value }

        case 'setAngle': {
          const snap = 0.25
          const raw = action.value

          const angle = raw > snap * -1 && raw < snap ? 0 : raw
          return { ...prevState, dirty: true, angle }
        }

        case 'setFlag':
          return { ...prevState, dirty: true, flag: action.value }

        case 'setImage': {
          prevState.image?.remove()

          const image = new Image()
          image.src = action.value

          return { ...prevState, dirty: true, image }
        }

        default:
          throw new Error('Invalid Action')
      }
    },
    initialState
  )

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <store.Provider value={value}>{children}</store.Provider>
}
