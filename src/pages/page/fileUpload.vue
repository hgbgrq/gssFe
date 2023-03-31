<script setup lang="ts">
import '~/admin/styles/admin.scss'
interface IOrgList {
  orgId: string
  orgName: string
  orgAddress: string
  orgNumber: string
  orgPaxNumber: string
}

const orgList = ref<IOrgList[]>([])

const getOrgList = async () => {
  try {
    const res = await request('/org', { method: 'GET' })
    orgList.value = res.list
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getOrgList()
})
</script>

<template>
  <div>
    <div class="table__file">
      <el-table :data="testList" border style="width: 60%">
        <el-table-column prop="파일 목록" label="업로드 파일 목록" />
      </el-table>
    </div>
    <div class="tab">
      <el-tabs type="border-card">
        <el-tab-pane label="User">
          <el-table :data="orgList" border style="width: 100%">
            <el-table-column prop="orgId" label="orgId" />
            <el-table-column prop="orgName" label="orgName" />
            <el-table-column prop="orgAddress" label="orgAddress" />
            <el-table-column prop="orgNumber" label="orgNumber" />
            <el-table-column prop="orgPaxNumber" label="orgPaxNumber" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Config">
          Config
        </el-tab-pane>
        <el-tab-pane label="Role">
          Role
        </el-tab-pane>
        <el-tab-pane label="Task">
          Task
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
layout: default
</route>
