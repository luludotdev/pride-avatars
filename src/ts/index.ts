import './main'
import './styles'

import { render } from './render'

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept(() => render())
  }
}
