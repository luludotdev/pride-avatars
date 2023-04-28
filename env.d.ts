import type * as CSS from 'csstype'
import type { StaticImageData } from 'next/image'

declare module 'csstype' {
  interface Properties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: string
  }
}

declare module '~/assets/flags/*.svg' {
  const content: StaticImageData
  export default content
}
