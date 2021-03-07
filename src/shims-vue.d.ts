/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'swiper/vue'

declare module 'mockjs' {
  import Mock from 'mockjs'
  const Mock: any
  export default Mock
}

declare module '*.json' {
  const value: any;
  export default value;
}

// declare module '*.js'

// declare module '*.cjs.js'