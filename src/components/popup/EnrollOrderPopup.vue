<script setup lang="ts">
import dayjs from 'dayjs'
import type { Popup } from '~/components/types/popup'
import type { OrderingInfo, Organization } from '~/order/types'

const props = defineProps<{
  orgId: string
  orgName: string
}>()

const emit = defineEmits([
  'close',
  'reload',
])

const close = () => {
  emit('close')
  emit('reload')
}
interface Product {
  productId: string
  productStyleNo: string
  productItem: string
  productSize: string
  productColor: string
  productQty: number
  productEtc: string
  productPrice: number
  totalPrdPrc: number
}

const popup: Popup = reactive({
  name: '',
  title: '',
  show: true,
  width: '1300px',
  button: '등록',
})

const popupOrgName = ref('')
const selectedOrg = ref('')
const orderDate = ref()
const deadLineDate = ref()
const enrollProduct = ref<Product[]>([])
const organizations = ref<Organization[]>([])

const enrollOrderData = reactive<OrderingInfo>({
  orgId: selectedOrg.value,
  orderOrderingDate: orderDate.value,
  orderDeadLineDate: deadLineDate.value,
  productList: enrollProduct.value,
})

const createFilter = (queryString: string) => {
  return (organization: Organization) => {
    return (
      organization.orgName.toLowerCase().includes(queryString.toLowerCase())
    )
  }
}

const handleSelect = (item: Organization) => {
  selectedOrg.value = JSON.parse(
    JSON.stringify(item.orgId),
  )
}

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? organizations.value.filter(createFilter(queryString))
    : organizations.value
  cb(results)
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

const popupButton = async () => {
  const data = {
    ...enrollOrderData,
  }

  try {
    data.orderOrderingDate = dayjs(enrollOrderData.orderOrderingDate).format('YYYY-MM-DD')
    data.orderDeadLineDate = dayjs(enrollOrderData.orderDeadLineDate).format('YYYY-MM-DD')
    data.orgId = selectedOrg.value
    await request('/order', { method: 'POST', data })
    close()
  }
  catch (error) {
    console.log(error)
  }
}

const convertDate = (date: Date) => {
  const yyyy = date.getFullYear().toString()
  const mm = (date.getMonth() + 1).toString()
  const dd = date.getDate().toString()

  let converDate = ''
  converDate += `${yyyy}-${mm[1] ? mm : `0${mm[0]}`}-${dd[1] ? dd : `0${dd[0]}`}`

  return converDate
}
const onAddItem = () => {
  enrollProduct.value.push({
    productId: '',
    productStyleNo: '',
    productItem: '',
    productSize: '',
    productColor: '',
    productQty: 0,
    productEtc: '',
    productPrice: 0,
    totalPrdPrc: 0,
  })
}

onMounted(
  async () => {
    await getOrganizationList()
    popupOrgName.value = props.orgName
    selectedOrg.value = props.orgId
  },
)
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
              v-model="popupOrgName"
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
          <el-date-picker v-model="orderDate" type="date" />
        </div>
        <div class="search-form">
          <span class="serach-label"> 납기일 </span>
          <el-date-picker v-model="deadLineDate" type="date" />
        </div>
      </div>

      <div>
        <el-button class="mt-4" style="width: 50%" @click="onAddItem">
          추 가
        </el-button>
        <el-table :data="enrollProduct" style="width: 100%">
          <el-table-column label="StyleNo" width="150">
            <template #default="scope">
              <el-input v-model="enrollProduct[scope.$index].productStyleNo" />
            </template>
          </el-table-column>
          <el-table-column label="Item" width="150">
            <template #default="scope">
              <el-input v-model="enrollProduct[scope.$index].productItem" />
            </template>
          </el-table-column>
          <el-table-column label="Size" width="150">
            <template #default="scope">
              <el-input v-model="enrollProduct[scope.$index].productSize" />
            </template>
          </el-table-column>
          <el-table-column label="Color" width="150">
            <template #default="scope">
              <el-input v-model="enrollProduct[scope.$index].productColor" />
            </template>
          </el-table-column>
          <el-table-column label="Qty" width="150">
            <template #default="scope">
              <el-input v-model="enrollProduct[scope.$index].productQty" type="number" />
            </template>
          </el-table-column>
          <el-table-column label="Etc" width="150">
            <template #default="scope">
              <el-input v-model="enrollProduct[scope.$index].productEtc" />
            </template>
          </el-table-column>
          <el-table-column label="개별 단가" width="150">
            <template #default="scope">
              <el-input v-model="enrollProduct[scope.$index].productPrice" />
            </template>
          </el-table-column>
          <el-table-column label="총액" width="150">
            <template #default="scope">
              <el-input v-model="enrollProduct[scope.$index].totalPrdPrc" />
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
