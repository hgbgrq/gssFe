<script setup lang="ts">
import dayjs from 'dayjs'
import type { Popup } from '~/components/types/popup'
import type { Organization } from '~/order/types'

const props = defineProps<{
  orderId: string
}>()

const emit = defineEmits([
  'close',
  'reload',
])

interface Product {
  productId: string
  productStyleNo: string
  productItem: string
  productSize: string
  productColor: string
  productQty: number
  productEtc: string
}

interface OrderDetail {
  orderOrderingDate: string
  orderDeadLineDate: string
  orgId: string
  orgName: string
  orderId: string
  productList: Product[]
}

const popup: Popup = reactive({
  name: '',
  title: '',
  show: true,
  width: '1000px',
  button: '수정',
})

const orderInfo = reactive<OrderDetail>({
  orderId: '',
  orderOrderingDate: '',
  orderDeadLineDate: '',
  orgId: '',
  orgName: '',
  productList: [],
})

const org = ref('')
const organizations = ref<Organization[]>([])
const selectedOrg = ref('')

const close = () => {
  emit('close')
  emit('reload')
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

const getDetailOrder = async () => {
  try {
    const res = await request(`/order/${props.orderId}`, { method: 'GET' })
    orderInfo.orderOrderingDate = res.orderOrderingDate
    orderInfo.orderDeadLineDate = res.orderDeadLineDate
    orderInfo.orderId = res.orderId
    orderInfo.orgId = res.orgId
    orderInfo.orgName = res.orgName
    orderInfo.productList = res.productList
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

const handleSelect = (item: Organization) => {
  selectedOrg.value = JSON.parse(
    JSON.stringify(item.orgId),
  )
}

const popupButton = async () => {
  const data = {
    ...orderInfo,
  }

  try {
    data.orderOrderingDate = dayjs(orderInfo.orderOrderingDate).format('YYYY-MM-DD')
    data.orderDeadLineDate = dayjs(orderInfo.orderDeadLineDate).format('YYYY-MM-DD')
    const res = await request('/order/modify', { method: 'POST', data })
    if (res.code === '200')
      close()
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  popup.title = '발주서'
  popup.button = '수정'
  await getOrganizationList()
  await getDetailOrder()
})
</script>

<template>
  <el-dialog
    v-model="popup.show"
    :width="popup.width"
    top="100px"
    :title="popup.title"
    draggable
    style="height: 70%"
    @close="close"
  >
    <div class="popup">
      <div class="search-box">
        <div class="search-form">
          <span class="serach-label"> 회사 </span>
          <div>
            <el-autocomplete
              v-model="orderInfo.orgName"
              value-key="orgName"
              :fetch-suggestions="querySearch"
              clearable
              class="inline-input w-50"
              placeholder="회사 선택"
              @select="handleSelect"
            />
          </div>
        </div>
        <div class="search-form">
          <span class="serach-label"> 발주일 </span>
          <el-date-picker v-model="orderInfo.orderOrderingDate" type="date" />
        </div>
        <div class="search-form">
          <span class="serach-label"> 납기일 </span>
          <el-date-picker v-model="orderInfo.orderDeadLineDate" type="date" />
        </div>
      </div>

      <div>
        <el-table :data="orderInfo.productList" style="width: 100%">
          <el-table-column label="StyleNo" width="150">
            <template #default="scope">
              <el-input v-model="orderInfo.productList[scope.$index].productStyleNo" />
            </template>
          </el-table-column>
          <el-table-column label="Item" width="150">
            <template #default="scope">
              <el-input v-model="orderInfo.productList[scope.$index].productItem" />
            </template>
          </el-table-column>
          <el-table-column label="Size" width="150">
            <template #default="scope">
              <el-input v-model="orderInfo.productList[scope.$index].productSize" />
            </template>
          </el-table-column>
          <el-table-column label="Color" width="150">
            <template #default="scope">
              <el-input v-model="orderInfo.productList[scope.$index].productColor" />
            </template>
          </el-table-column>
          <el-table-column label="Qty" width="150">
            <template #default="scope">
              <el-input v-model="orderInfo.productList[scope.$index].productQty" type="number" />
            </template>
          </el-table-column>
          <el-table-column label="Etc" width="150">
            <template #default="scope">
              <el-input v-model="orderInfo.productList[scope.$index].productEtc" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <template #footer>
      <div class="footer">
        <el-button type="info" @click="close">
          취소
        </el-button>
        <el-button type="primary" @click="popupButton">
          {{ popup.button }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
  .popup{
    height: 100%;
    overflow-y: auto;
    padding: 0 40px!important;
  }
  .search-box {
    padding: 10px;
    background: #ffffff;
    border: 1px solid #c1c2c3;
    border-radius: 10px;
    margin-bottom: 60px;
  }

  .search-form {
    width: 70%;
    position: relative;
    justify-content: start;
    margin-bottom: 30px;
  }

  .serach-label {
    margin-right: 5px;
  }
</style>
