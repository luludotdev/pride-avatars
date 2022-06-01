import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type Reducer,
  useMemo,
  useReducer,
} from 'react'
import { type FlagName } from '~lib/flags'

export interface State {
  dirty: boolean
  quality: number
  padding: number
  angle: number
  flag: FlagName
  /* eslint-disable @typescript-eslint/ban-types */
  filename: string | null
  image: HTMLImageElement | null
  frames: HTMLCanvasElement[] | null
  /* eslint-enable @typescript-eslint/ban-types */
  delay: number
  showEasterEgg: boolean
  saving: boolean
  advertOpen: boolean
  lastShownAd: Date | undefined
}

const loadLastShownAd: () => State['lastShownAd'] = () => {
  if (typeof window === 'undefined') return undefined

  const stored = localStorage.getItem('lastShownAd')
  if (!stored) return undefined

  const parsed = Number.parseInt(stored, 10)
  if (Number.isNaN(parsed)) return undefined

  const date = new Date(parsed)
  return date
}

const initialState: State = {
  dirty: true,
  quality: 3,
  padding: 12,
  angle: 0,
  flag: 'Pastel',
  filename: null,
  image: null,
  frames: null,
  delay: -1,
  showEasterEgg: false,
  saving: false,
  advertOpen: false,
  lastShownAd: loadLastShownAd(),
}

interface Context {
  state: State
  dispatch: Dispatch<Action>
}

// @ts-expect-error Does not include `dispatch()`
export const store = createContext<Context>({ state: initialState })

export type Action =
  | { type: 'markClean' }
  | { type: 'setQuality'; value: number }
  | { type: 'setPadding'; value: number }
  | { type: 'setAngle'; value: number }
  | { type: 'setFlag'; value: FlagName }
  | { type: 'setFilename'; value: string }
  | { type: 'setImage'; value: string }
  | { type: 'setGif'; value: [frames: HTMLCanvasElement[], delay: number] }
  | { type: 'toggleEasterEgg' }
  | { type: 'setSaving'; value: boolean }
  | { type: 'setAdShowing'; value: boolean }
  | { type: 'markAdShown' }

export const Provider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    (previousState, action) => {
      switch (action.type) {
        case 'markClean':
          return { ...previousState, dirty: false }

        case 'setQuality':
          return { ...previousState, dirty: true, quality: action.value }

        case 'setPadding':
          return { ...previousState, dirty: true, padding: action.value }

        case 'setAngle': {
          const snap = 0.25
          const raw = action.value

          const angle = raw > snap * -1 && raw < snap ? 0 : raw
          return { ...previousState, dirty: true, angle }
        }

        case 'setFlag':
          return { ...previousState, dirty: true, flag: action.value }

        case 'setFilename':
          return { ...previousState, dirty: true, filename: action.value }

        case 'setImage': {
          previousState.image?.remove()
          for (const frame of previousState?.frames ?? []) {
            frame.remove()
          }

          const image = new Image()
          image.src = action.value

          return {
            ...previousState,
            dirty: true,
            frames: null,
            delay: -1,
            image,
          }
        }

        case 'setGif': {
          previousState.image?.remove()
          for (const frame of previousState?.frames ?? []) {
            frame.remove()
          }

          const [frames, delay] = action.value
          return { ...previousState, dirty: true, image: null, frames, delay }
        }

        case 'toggleEasterEgg':
          return {
            ...previousState,
            showEasterEgg: !previousState.showEasterEgg,
          }

        case 'setSaving':
          return { ...previousState, saving: action.value }

        case 'setAdShowing':
          return { ...previousState, advertOpen: action.value }

        case 'markAdShown': {
          const now = new Date()
          localStorage.setItem('lastShownAd', now.getTime().toString())
          return { ...previousState, lastShownAd: now }
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
