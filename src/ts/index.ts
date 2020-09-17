import './main'
import './styles'
import './firefox'

import { state } from './state'

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept(() => {
      state.dirty = true
    })
  }
}
