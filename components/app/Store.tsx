'use client'

import { castDraft } from 'immer'
import { createContext, useMemo } from 'react'
import type { Dispatch, FC, PropsWithChildren } from 'react'
import { useImmerReducer } from 'use-immer'
import type { FlagName } from '~/lib/flags'

export type AnimationFrame = [canvas: HTMLCanvasElement, clear: boolean]
export interface State {
  dirty: boolean
  quality: number
  padding: number
  angle: number
  blur: number
  feather: number
  preview: boolean
  clip: boolean
  dualFlag: boolean
  flag: FlagName
  flag2: FlagName

  filename: string | null
  image: HTMLImageElement | null
  frames: AnimationFrame[] | null
  delay: number
  showEasterEgg: boolean
  saving: boolean
  advertOpen: boolean
  lastShownAd: Date | undefined
}

const LAST_SHOW_ADD_KEY = '@@pride-avatars/last-shown-ad'
const loadLastShownAd: () => State['lastShownAd'] = () => {
  if (typeof window === 'undefined') return undefined

  const stored = localStorage.getItem(LAST_SHOW_ADD_KEY)
  if (!stored) return undefined

  const parsed = Number.parseInt(stored, 10)
  if (Number.isNaN(parsed)) return undefined

  return new Date(parsed)
}

const initialState: State = {
  dirty: true,
  quality: 3,
  padding: 24,
  angle: 0,
  blur: 0,
  feather: 0,
  preview: false,
  clip: true,
  dualFlag: false,
  flag: 'Pastel',
  flag2: 'Pastel',
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
  | { type: 'markAdShown' }
  | { type: 'markClean' }
  | { type: 'setAdShowing'; value: boolean }
  | { type: 'setAngle'; value: number }
  | { type: 'setBlur'; value: number }
  | { type: 'setClip'; value: boolean }
  | { type: 'setDualFlag'; value: boolean }
  | { type: 'setFeather'; value: number }
  | { type: 'setFilename'; value: string }
  | { type: 'setFlag'; value: FlagName }
  | { type: 'setFlag2'; value: FlagName }
  | { type: 'setGif'; value: [frames: AnimationFrame[], delay: number] }
  | { type: 'setImage'; value: string }
  | { type: 'setPadding'; value: number }
  | { type: 'setPreview'; value: boolean }
  | { type: 'setQuality'; value: number }
  | { type: 'setSaving'; value: boolean }
  | { type: 'toggleEasterEgg' }

export const Provider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [state, dispatch] = useImmerReducer<State, Action>((state, action) => {
    switch (action.type) {
      case 'markClean': {
        state.dirty = false

        break
      }

      case 'setQuality': {
        state.dirty = true
        state.quality = action.value

        break
      }

      case 'setPadding': {
        state.dirty = true
        state.padding = action.value

        break
      }

      case 'setAngle': {
        const snap = 0.25
        const raw = action.value

        state.dirty = true
        state.angle = raw > snap * -1 && raw < snap ? 0 : raw

        break
      }

      case 'setBlur': {
        state.dirty = true
        state.blur = action.value

        break
      }

      case 'setFeather': {
        state.dirty = true
        state.feather = action.value

        break
      }

      case 'setPreview': {
        state.dirty = true
        state.preview = action.value

        break
      }

      case 'setClip': {
        state.dirty = true
        state.clip = action.value

        break
      }

      case 'setDualFlag': {
        state.dirty = true
        state.dualFlag = action.value

        break
      }

      case 'setFlag': {
        state.dirty = true
        state.flag = action.value

        break
      }

      case 'setFlag2': {
        state.dirty = true
        state.flag2 = action.value

        break
      }

      case 'setFilename': {
        state.dirty = true
        state.filename = action.value

        break
      }

      case 'setImage': {
        state.image?.remove()
        for (const [frame] of state?.frames ?? []) {
          frame.remove()
        }

        const image = new Image()
        image.src = action.value

        state.dirty = true
        state.frames = null
        state.delay = -1
        state.image = castDraft(image)

        break
      }

      case 'setGif': {
        state.image?.remove()
        for (const [frame] of state?.frames ?? []) {
          frame.remove()
        }

        const [frames, delay] = action.value
        state.dirty = true
        state.image = null
        state.frames = castDraft(frames)
        state.delay = delay

        break
      }

      case 'toggleEasterEgg': {
        state.showEasterEgg = !state.showEasterEgg
        break
      }

      case 'setSaving': {
        state.saving = action.value
        break
      }

      case 'setAdShowing': {
        state.advertOpen = action.value
        break
      }

      case 'markAdShown': {
        const now = new Date()

        localStorage.setItem(LAST_SHOW_ADD_KEY, now.getTime().toString())
        state.lastShownAd = now

        break
      }
    }
  }, initialState)

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <store.Provider value={value}>{children}</store.Provider>
}
