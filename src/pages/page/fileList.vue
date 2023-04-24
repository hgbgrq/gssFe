<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import type { File, Option } from '~/fileList/types'
import { isEmpty } from '~/composables/utils'

const searchForm = {
  keyWord: '',
  keyWordType: '',
  startDate: '',
  endDate: '',
}
const options = ref<Option[]>([])
const date = ref()
const loading = ref(false)
const fileList = ref<File[]>([])

const getFileList = async () => {
  if (!isEmpty(date.value)) {
    searchForm.startDate = date.value[0].toISOString()
    searchForm.endDate = date.value[1].toISOString()
  }
  try {
    const params = {
      ...searchForm,
    }
    const res = await request('/file', { method: 'GET', params })
    fileList.value = res.list
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getFileList()
})
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
  </div>
  <div>
    <div class="grid-header">
      <div />
      <div class="button-location">
        <el-button type="info">
          삭제
        </el-button>
        <el-button type="primary">
          등록
        </el-button>
      </div>
    </div>
    <div>
      <el-table v-loading="loading" :data="fileList" style="width: 100%">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="fileName" label="파일 이름" />
        <el-table-column prop="fileCreateDate" label="등록일" />
        <el-table-column prop="fileCreateUserName" label="등록자" />
      </el-table>
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
