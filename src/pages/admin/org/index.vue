<template>
  <el-table :data="testList" style="width: 100%">
    <el-table-column prop="orgId" label="orgId"  />
    <el-table-column prop="orgName" label="orgName"  />
    <el-table-column prop="orgAddress" label="orgAddress" />
    <el-table-column prop="orgNumber" label="orgNumber" />
    <el-table-column prop="orgPaxNumber" label="orgPaxNumber" />
  </el-table>
</template>

<script setup lang="ts">
interface TestInterface {
  orgId: string
  orgName: string
  orgAddress: string
  orgNumber: string
  orgPaxNumber: string
}

const testList = ref<TestInterface[]>([])

const fetchData = async () => {
  try {
    const res = await request('/org', { method: 'GET' })
    testList.value = res.list
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<route lang="yaml">
  meta:
    layout: default
</route>