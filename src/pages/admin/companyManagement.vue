<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";

interface IOrgList {
  orgId: string
  orgName: string
  orgAddress: string
  orgNumber: string
  orgPaxNumber: string
  check: boolean
}

const searchForm = {
  keyWord: '',
  orgUuid: '',
}

const orgList = ref<IOrgList[]>([])
const checkedList = ref<IOrgList[]>([])
let loading = ref(false)

const getOrgList = async () => {
  try {
    const params = {
      ...searchForm,
    }
    const res = await request('/org', { method: 'GET', params })
    orgList.value = res.list
  }
  catch (error) {
    console.error(error)
  }
}

const deleteOrg = async () => {
  try {
    loading = ref(true)
    const params = ref<String[]>([])
    for (let i = 0; i < checkedList.value.length; i++){
      params.value[i] = checkedList.value[i].orgId
    }
    const res = await request('/org/delete', { method: 'POST', data: params.value })
  }
  catch (error) {
    console.error(error)
  }
  getOrgList()
  loading = ref(false)
}

const handleSelectionChange = (val: IOrgList[]) => {
  checkedList.value = val
}

onMounted(async () => {
  await getOrgList()
})
</script>

<template>
  <h1 class="title">
    회사 관리
  </h1>
  <div class="search-form">
    <input v-model="searchForm.keyWord" class="form-input">
    <el-button :icon="Search" circle @click="getOrgList" />
  </div>
  <div>
    <div class="grid-header">
      <div></div>
      <div class = "button-location">
        <el-button type="primary" @click="deleteOrg">삭제</el-button>
        <el-button type="primary">등록</el-button>
      </div>
    </div>
    <div>
      <el-table :data="orgList" v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="orgName" label="이름" />
        <el-table-column prop="orgAddress" label="주소" />
        <el-table-column prop="orgNumber" label="번호" />
        <el-table-column prop="orgPaxNumber" label="팩스번호" />
      </el-table>
    </div>
  </div>
  <input type="checkbox">
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
  .grid-header{
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 13px;
    font-weight: 500;
    color: #999;
  }
  .button-location{
    display: flex;
    align-items: center;
  }
  .search-form {
    width: 100%;
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
  }
</style>