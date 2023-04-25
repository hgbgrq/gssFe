<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import type { File, Option } from '~/fileList/types'
import { dateFormat, downloadExcelFile, isEmpty } from '~/composables/utils'
import FileUploadPopup from '~/components/popup/FileUploadPopup.vue'

const popup: FileUploadPopup = reactive({
  show: false,
})

const searchForm = {
  keyWord: '',
  keyWordType: '',
  startDate: '',
  endDate: '',
  row: 1,
  size: 10,
}
const options = ref<Option[]>([])
const date = ref()
let loading = ref(false)
const fileList = ref<File[]>([])
const checkedList = ref<File[]>([])
let totalCount = ref(0)

const getFileList = async () => {
  if (!isEmpty(date.value)) {
    searchForm.startDate = dateFormat(date.value[0])
    searchForm.endDate = dateFormat(date.value[1])
  }
  try {
    const params = {
      ...searchForm,
    }
    const res = await request('/file', { method: 'GET', params })
    fileList.value = res.list
    totalCount = res.totalCount
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}
const handleSelectionChange = (val: File[]) => {
  console.log(val)
  checkedList.value = val
}

const openPopup = () => {
  popup.show = true
}

const closePopup = () => {
  popup.show = false
  getFileList()
}

const reload = () => {
  getFileList()
}

const handleCurrentChange = (page: number) => {
  loading.value = true
  searchForm.row = page
  getFileList()
}

onMounted(async () => {
  await getFileList()
})

const deleteFile = async () => {
  try {
    loading = ref(true)
    const params = ref<String[]>([])
    for (let i = 0; i < checkedList.value.length; i++)
      params.value[i] = checkedList.value[i].fileId
    console.log(params)
    const res = await request('/file/delete', { method: 'POST', data: params.value })
  }
  catch (error) {
    console.error(error)
  }
  getFileList()
  loading = ref(false)
}

const downloadFile = async (row: number) => {
  try {
    await downloadExcelFile(`/file/download/${fileList.value[row].fileId}`, { method: 'GET' })
  }
  catch (error) {
    console.error(error)
  }
}

const initSearch = () => {
  date.value = null
  searchForm.row = 1
  searchForm.size = 10
  searchForm.keyWord = ''
  searchForm.keyWordType = ''
}
</script>

<template>
  <h1 class="title">
    파일 관리
  </h1>
  <div class="search-form">
    <el-select v-model="searchForm.keyWordType" class="m-2" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <input v-model="searchForm.keyWord" class="form-input">
    <el-button :icon="Search" circle @click="getFileList" />
  </div>
  <div class="search-form">
    <div class="m-2">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="~"
        start-placeholder="시작 시간"
        end-placeholder="끝 시간"
      />
    </div>
    <el-button type="success" @click="initSearch">
      검색 조건 초기화
    </el-button>
  </div>
  <div>
    <div class="grid-header">
      <div />
      <div class="button-location">
        <el-button type="info" @click="deleteFile">
          삭제
        </el-button>
        <el-button type="primary" @click="openPopup">
          등록
        </el-button>
      </div>
    </div>
    <div>
      <el-table v-loading="loading" :data="fileList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="fileName" label="파일 이름" />
        <el-table-column prop="createDate" label="등록일" />
        <el-table-column prop="createUserId" label="등록자" />
        <el-table-column label="파일 다운로드" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="downloadFile(scope.$index)"
            >
              Download
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="totalCount" @current-change="handleCurrentChange" />
    </div>
    <div>
      <FileUploadPopup
        v-if="popup.show"
        @close="closePopup"
        @reload="reload"
      />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style lang="scss" scoped>
.title {
  margin-bottom: 2rem;
  font-size: 32px;
  line-height: 40px;
}
.search-form {
  width: 70%;
  position: relative;
  justify-content: space-between;
}
.form-input{
  width: 100%;
  font-size: 14px;
  height: 40px;
  padding: 8px 15px;
  background: #ffffff;
  border: 1px solid #d6dbe4;
  border-radius: 4px;
  color: #222;
  caret-color: #5bb870;
  justify-content: space-between;
}
.grid-header{
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 13px;
  font-weight: 500;
  color: #999;
}
</style>
