import './main'
import './styles'

import { state } from './state'

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept(() => {
      state.dirty = true
    })
  }
}
