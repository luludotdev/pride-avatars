import { EventEmitter } from 'eventemitter3'
import { Flag, getFlag } from './flags'

interface IState {
  image?: HTMLImageElement
  flag: Flag
  padding: number
  angle: number
}

type Events = 'changed'
class State extends EventEmitter<Events> implements IState {
  public image: HTMLImageElement | undefined
  public flag: Flag = Flag.Genderfluid
  public padding: number = 10
  public angle: number = 0

  constructor() {
    super()

    return new Proxy(this, {
      set: (target, prop, value) => {
        // @ts-ignore
        target[prop] = value

        this.emit('changed')
        return true
      },
    })
  }

  public get flagImage() {
    return getFlag(this.flag)
  }
}

export const state = new State()
