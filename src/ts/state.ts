import { EventEmitter } from 'eventemitter3'

interface IState {
  image?: HTMLImageElement
  padding: number
}

type Events = 'changed'
class State extends EventEmitter<Events> implements IState {
  public image: HTMLImageElement | undefined
  public padding: number = 10

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
}

export const state = new State()
