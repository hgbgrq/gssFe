import { useEventBus } from '@vueuse/core'
import { gssEventBusKey } from '~/types'

export interface IReqOptions {
  method: string
  meta?: object
  headers?: HeadersInit
  data?: object
  params?: any
}

export const prefixUrl = '/api'
export const request = async (url: string, options: IReqOptions) => {
  const { method, headers, data, params } = options
  const reqObj: RequestInit = {
    method,
  }
  if (!headers) {
    reqObj.headers = {
      'Content-Type': 'application/json',
    }
  }

  if (data)
    reqObj.body = JSON.stringify(data)

  url = `${prefixUrl}${url}`
  if (params) {
    const paramsStr = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    url = `${url}?${paramsStr}`
  }

  const response = await fetch(url, reqObj)
  try {
    if (!response.ok)
      throw response.clone()
    return response.json()
  }
  catch (errorRes: any) {
    console.log(errorRes.status)
    // const errorJsonData = await errorRes.json()
    const bus = useEventBus(gssEventBusKey)
    bus.emit()
  }
}
