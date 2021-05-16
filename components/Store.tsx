import { createContext, useMemo, useReducer } from 'react'
import type { Dispatch, FC, Reducer } from 'react'

interface State {
  padding: number
  angle: number
}

const initialState: State = {
  padding: 10,
  angle: 0,
}

interface Context {
  state: State
  dispatch: Dispatch<Action>
}

// @ts-expect-error
export const store = createContext<Context>({ state: initialState })

type Action =
  | { type: 'setPadding'; value: number }
  | { type: 'setAngle'; value: number }

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    (prevState, action) => {
      switch (action.type) {
        case 'setPadding':
          return { ...prevState, padding: action.value }

        case 'setAngle':
          return { ...prevState, angle: action.value }

        default:
          throw new Error('Invalid Action')
      }
    },
    initialState
  )

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <store.Provider value={value}>{children}</store.Provider>
}
