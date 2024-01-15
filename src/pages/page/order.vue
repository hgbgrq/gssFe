<script setup lang="ts">
import { Download, Edit } from '@element-plus/icons-vue'
import type { Order, Organization } from '~/order/types'
import OrderPopup from '~/components/popup/OrderPopup.vue'
import FileUploadPopup from '~/components/popup/FileUploadPopup.vue'

const router = useRouter()

const organizations = ref<Organization[]>([])
const state = ref('')
const startDate = ref()
const endDate = ref()
const orderList = ref<Order[]>([])
let totalCount = ref(0)
const loading = ref(false)
const checkedList = ref<Order[]>([])

const searchForm = {
  orgId: '',
  startDate: '',
  endDate: '',
  currentPage: 0,
  pageSize: 10,
}

const popup: OrderPopup = reactive({
  show: false,
  orderId: '',
})

const filePopup: FileUploadPopup = reactive({
  show: false,
})

const getOrderList = async () => {
  searchForm.startDate = ''
  searchForm.endDate = ''
  if (startDate.value)
    searchForm.startDate = dateFormat(startDate.value)

  if (endDate.value)
    searchForm.endDate = dateFormat(endDate.value)

  if (!state.value)
    searchForm.orgId = ''

  try {
    const params = {
      ...searchForm,
    }
    const res = await request('/order', { method: 'GET', params })
    orderList.value = res.list
    totalCount = res.totalCount
  }
  catch (error) {
    console.log(error)
  }
}

const getOrganizationList = async () => {
  try {
    const res = await request('/org', { method: 'GET' })
    organizations.value = res.list
  }
  catch (error) {
    console.log(error)
  }
}

const deleteOrder = async () => {
  const data = {
    orderList: checkedList.value,
  }

  try {
    const res = await request('/order/remove', { method: 'POST', data })
    if (res.code === '200')
      getOrderList()
  }
  catch (error) {
    console.log(error)
  }
}

const handleSelectionChange = (val: Order[]) => {
  checkedList.value = val
}

const downloadFile = async (row: number) => {
  try {
    const orderId = orderList.value[row].orderId
    await downloadExcelFile(`/order/downloadExcel/${orderId}`, { method: 'GET' })
  }
  catch (error) {
    console.error(error)
  }
}

const editOrder = (row: number) => {
  popup.orderId = orderList.value[row].orderId
  popup.show = true
}

const createFilter = (queryString: string) => {
  return (organization: Organization) => {
    return (
      organization.orgName.toLowerCase().includes(queryString.toLowerCase())
    )
  }
}

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? organizations.value.filter(createFilter(queryString))
    : organizations.value
  cb(results)
}

const handleSelect = (item: Organization) => {
  searchForm.orgId = item.orgId
}

const moveEnrollPage = () => {
  router.push('/page/enrollOrder')
}

const fileUpload = () => {
  filePopup.show = true
}

const handleCurrentChange = (page: number) => {
  loading.value = true
  searchForm.currentPage = page - 1
  getOrderList()
  loading.value = false
}

const closePopup = () => {
  popup.show = false
}

const closeFilePopup = () => {
  filePopup.show = false
}
const reload = () => {
  getOrderList()
}

const openDetail = () => {
  console.log('클릭함')
}

onMounted(
  async () => {
    await getOrderList()
    await getOrganizationList()
  },
)
</script>

<template>
  <h1 class="title">
    발주서 관리
  </h1>

  <div class="search">
    <div class="search-form">
      <div class="search-type">
        <div class="search-label">
          회사
        </div>
        <div class="search-box">
          <el-autocomplete
            v-model="state"
            value-key="orgName"
            :fetch-suggestions="querySearch"
            clearable
            class="inline-input w-50"
            placeholder="회사 선택"
            @select="handleSelect"
          />
        </div>
      </div>

      <div class="search-type">
        <div class="search-label">
          발주일
        </div>
        <div class="search-box">
          <el-date-picker
            v-model="startDate"
            type="date"
          />
          ~
          <el-date-picker
            v-model="endDate"
            type="date"
          />
        </div>
      </div>
    </div>

    <div class="search-button">
      <el-button type="info" @click="getOrderList">
        조회
      </el-button>
    </div>
  </div>

  <div class="grid-header">
    <div />
    <div class="button-location">
      <el-button type="danger" @click="deleteOrder">
        삭제
      </el-button>
      <el-button type="primary" @click="moveEnrollPage">
        등록
      </el-button>
      <el-button type="primary" @click="fileUpload">
        파일 등록
      </el-button>
    </div>
  </div>

  <div>
    <div class="order-table">
      <el-table v-loading="loading" :data="orderList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="orgName" label="회사" @click="openDetail" />
        <el-table-column prop="orderStyleNos" label="styleNo" />
        <el-table-column prop="orderOrderingDate" label="발주일" />
        <el-table-column prop="orderDeadLineDate" label="납기일" />
        <el-table-column label="" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="editOrder(scope.$index)"
            >
              <el-icon :size="20">
                <Edit />
              </el-icon>
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="downloadFile(scope.$index)"
            >
              <el-icon :size="20">
                <Download />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination layout="prev, pager, next" :total="totalCount" @current-change="handleCurrentChange" />
    <div>
      <OrderPopup
        v-if="popup.show"
        :order-id="popup.orderId"
        @close="closePopup"
        @reload="reload"
      />
    </div>
    <div>
      <FileUploadPopup
        v-if="filePopup.show"
        @close="closeFilePopup"
        @reload="reload"
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 2rem;
  font-size: 32px;
  line-height: 40px;
}

.search {
  width: 100%;
  height: 50px;
  padding: 5px;
  display: flex;
  margin-bottom: 30px;
}

.search-form{
    align-items: center;
    display : flex;
    justify-content: flex-start;
    flex: 1 1 0%
}

.search-type {
  display : flex;
  margin-right: 20px;
  align-items: center;
}

.search-label {
  position: relative;
  margin-right: 5px;
}

.search-box {
  flex-direction: column;
}

.form-input {
  width: 60px;
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

.grid-header {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 13px;
  font-weight: 500;
  color: #999;
}
.order-table {
  margin-bottom: 10px;
}
</style>
