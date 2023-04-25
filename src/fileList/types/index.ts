export interface Option {
  optionCode: boolean
  optionName: string
}

export interface File {
  fileId: string
  fileName: string
  createUserId: string
  createUserName: string
  createDate: string
}

export interface FileUploadPopup {
  show: boolean
}
