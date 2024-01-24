import { type ViteSSGContext } from 'vite-ssg'
import type { EventBusKey } from '@vueuse/core'

export type UserModule = (ctx: ViteSSGContext) => void

export interface IResponse {
  code: string
  message: string
  body: any
}

// event Bus key 타입 정의
export const gssEventBusKey: EventBusKey<IResponse> = Symbol('requestApiEventBus')
