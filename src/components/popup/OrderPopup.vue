<script setup lang="ts">
import type { Popup } from '~/components/types/popup'

const props = defineProps<{
  orderId: string
}>()

const emit = defineEmits([
  'close',
  'reload',
])

interface Product {
  productId: String
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
  button: '',
})

const orderInfo = reactive<OrderDetail>({
  orderId: '',
  orderOrderingDate: '',
  orderDeadLineDate: '',
  orgId: '',
  orgName: '',
  productList: [],
})

const close = () => {
  emit('close')
  emit('reload')
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

onMounted(async () => {
  popup.title = '발주서'
  popup.button = '수정'
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
      업데이트 예정 기능입니다.
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
  .popup{
    height: 100%;
    overflow-y: auto;
    padding: 0 40px!important;
  }
</style>
