export interface IReqOptions {
    method: string
    meta?: object
    headers?: HeadersInit
    data?: object
    params?: object
  }

export const prefixUrl: string = '/api'

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
    else {
      reqObj.headers = headers
    }
    url = `${prefixUrl}${url}`
    const response = await fetch(url, reqObj)
    console.log(response.json())
    return response.json()
}