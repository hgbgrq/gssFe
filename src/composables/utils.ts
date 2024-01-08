export const isEmpty = (value: string | number | undefined | object) => {
  // 빈 값 체크
  const result = false
  if (value === undefined)
    return true

  if (typeof value === 'number') {
    if (value === 0)
      return true
  }
  else if (typeof value === 'string') {
    if (value === '' || value.length === 0)
      return true
  }
  else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      if (value.length === 0)
        return true
    }
    else if (!value) {
      return true
    }
    else {
      if (Object.keys(value).length === 0)
        return true
    }
  }
  return result
}

export const dateFormat = (date: Date) => {
  let month: string | number = date.getMonth() + 1
  let day: string | number = date.getDate()

  month = month >= 10 ? month : `0${month}`
  day = day >= 10 ? day : `0${day}`

  return `${date.getFullYear()}-${month}-${day}`
}

export interface DownReqOptions {
  method: string
  params?: object
}
export const downloadExcelFile = async (url: string, options: DownReqOptions) => {
  const { method, params } = options
  const reqObj: RequestInit = {
    method,
  }

  reqObj.headers = {
    'Content-Type': 'application/json',
  }

  url = `${prefixUrl}${url}`
  if (params) {
    const paramsStr = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    url = `${url}?${paramsStr}`
  }
  console.log(url)
  const response = await fetch(url, reqObj)
  try {
    if (response.ok) {
      let fileName = ''
      // 1. blob 형태로 response 값 추출
      const blob = await response.blob()

      // 2. header 에서 disposition 값 추출 이런 형태로 저장 되어 있음(Content-Disposition: attachment; filename="filename.xlsx")
      const disposition = response.headers.get('content-disposition')
      if (disposition && disposition.includes('attachment')) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        const matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1])
          fileName = matches[1].replace(/['"]/g, '')
      }

      // 3. 추출한 fileName 디코딩
      fileName = decodeURI(fileName)

      // 4. 가상의 a 태그 생성
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.target = '_self'
      if (fileName)
        link.download = fileName

      link.click()
    }
    else {
      throw new Error('not Response')
    }
  }
  catch (error: any) {
    throw new Error(error)
  }
}

