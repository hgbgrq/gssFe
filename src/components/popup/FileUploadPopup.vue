<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import type { UploadAjaxError } from 'element-plus/es/components/upload/src/ajax'
import type { Popup } from '~/components/types/popup'
const popup: Popup = reactive({
  name: '',
  title: '파일 등록',
  show: true,
  width: '1000px',
  button: '',
})

interface fileUploadResult {
  fileId: string
  fileName: string
  resultCode: string
  resultMessage: string
}

const uploadSuccess = (res: fileUploadResult) => {
  ElMessageBox.alert(`${res.fileName}등록에 성공하였습니다.`)
}
const uploadFail = (res: UploadAjaxError) => {
  const result: fileUploadResult = JSON.parse(res.message)
  ElMessageBox.alert(`${result.fileName}의 ${result.resultMessage}`)
}
</script>

<template>
  <el-dialog
    v-model="popup.show"
    :width="popup.width"
    top="100px"
    :title="popup.title"
    draggable
    style="height: 50%"
    @close="close"
  >
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:3333/api/file"
      multiple
      :on-success="uploadSuccess"
      :on-error="uploadFail"
    >
      <el-icon class="el-icon--upload">
        <UploadFilled />
      </el-icon>
      <div class="el-upload__text">
        <em>파일 업로드</em>
      </div>
    </el-upload>
  </el-dialog>
</template>
