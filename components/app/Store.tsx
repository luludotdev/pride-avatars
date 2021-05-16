import { createContext, useMemo, useReducer } from 'react'
import type { FlagName } from '~lib/flags'
import type { Dispatch, FC, Reducer } from 'react'

interface State {
  dirty: boolean
  padding: number
  angle: number
  flag: FlagName
}

const initialState: State = {
  dirty: true,
  padding: 10,
  angle: 0,
  flag: 'Pastel',
}

interface Context {
  state: State
  dispatch: Dispatch<Action>
}

// @ts-expect-error
export const store = createContext<Context>({ state: initialState })

type Action =
  | { type: 'markClean'; value: never }
  | { type: 'setPadding'; value: number }
  | { type: 'setAngle'; value: number }
  | { type: 'setFlag'; value: FlagName }

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    (prevState, action) => {
      switch (action.type) {
        case 'markClean':
          return { ...prevState, dirty: false }

        case 'setPadding':
          return { ...prevState, dirty: true, padding: action.value }

        case 'setAngle':
          return { ...prevState, dirty: true, angle: action.value }

        case 'setFlag':
          return { ...prevState, dirty: true, flag: action.value }

        default:
          throw new Error('Invalid Action')
      }
    },
    initialState
  )

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <store.Provider value={value}>{children}</store.Provider>
}
