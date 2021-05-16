import { EventEmitter } from 'eventemitter3'
import { getFlag } from './flags'

interface IState {
  image?: HTMLImageElement
  flag: string
  padding: number
  angle: number
}

type Events = 'changed'
class State extends EventEmitter<Events> implements IState {
  public image: HTMLImageElement | undefined
  public flag = 'pastel'
  public padding = 10
  public angle = 0

  public dirty = true

  public get flagImage() {
    return getFlag(this.flag)
  }
}

const createState = () => {
  const base = new State()
  return new Proxy(base, {
    set: (target, prop, value: unknown) => {
      // @ts-expect-error
      target[prop] = value

      if (prop !== 'dirty') base.emit('changed')
      return true
    },
  })
}

export const state = createState()
