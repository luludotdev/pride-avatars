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
  public flag: string = 'rainbow'
  public padding: number = 10
  public angle: number = 0

  public dirty: boolean = true

  constructor() {
    super()

    return new Proxy(this, {
      set: (target, prop, value) => {
        // @ts-ignore
        target[prop] = value

        if (prop !== 'dirty') this.emit('changed')
        return true
      },
    })
  }

  public get flagImage() {
    return getFlag(this.flag)
  }
}

export const state = new State()
