<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { File } from '~/fileList/types'
interface selectBox {
  code: string
  name: string
}
interface ISeachForm {
  orgId: string[]
  keyWordType: string
  keyWord: string
  isPayment: number
}
interface IProduct {
  productId: string
  prdStyleNo: string
  prdItem: string
  prdSize: string
  prdColor: string
  prdQty: string
  prdPrc: string
  prdEtc: string
  isPayment: string
  paymentDate: string
  orgId: string
  orgName: string
  totalPrdPrc: number
}
interface IStac {
  orderMonth: string
  productList: IProduct[]
}

const searchForm: ISeachForm = reactive({
  orgId: [],
  keyWordType: '',
  keyWord: '',
  isPayment: 1,
})

const orgList = ref <selectBox[]>([
  {
    code: '테스트1',
    name: '테스트1',
  },
  {
    code: '테스트2',
    name: '테스트2',
  },
])

const checkedList = ref<IProduct[]>([])
const typeList = ref <selectBox[]>([])
const date = ref()
const stacList = ref<IStac[]>([])
const loading = ref(false)
const search = () => {
  console.log(searchForm)
}

const handleSelectionChange = (val: IProduct[]) => {
  console.log(val)
  checkedList.value = val
}

const getStacList = async () => {
  console.log(searchForm)
  try {
    const res = await request('/stac', { method: 'GET' })
    stacList.value = res.stacList
    console.log(stacList.value)
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getStacList()
})
</script>

<template>
  <h1 class="title">
    매입장
  </h1>
  <div class="search-box">
    <div class="search-form">
      <span>
        회사
      </span>
      <el-select
        v-model="searchForm.orgId"
        class="m-2"
        placeholder="Select"
        multiple
        show-checkbox
      >
        <el-option
          v-for="item in orgList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </div>
    <div class="search-form">
      <span>
        필터
      </span>
      <el-select v-model="searchForm.keyWordType" class="m-2" placeholder="Select">
        <el-option
          v-for="item in typeList"
          :key="item.orgId"
          :label="item.string"
          :value="item.orgId"
        />
      </el-select>
      <input v-model="searchForm.keyWord" class="form-input">
    </div>
    <div class="search-form">
      <span>
        결재여부
      </span>
      <el-radio-group v-model="searchForm.isPayment">
        <el-radio :label="1">
          전체
        </el-radio>
        <el-radio :label="2">
          미결재
        </el-radio>
        <el-radio :label="3">
          결재 완료
        </el-radio>
      </el-radio-group>
    </div>
    <div class="last">
      <div class="search-form">
        <span>조회 기간</span>
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
      <div class="last-button">
        <el-button type="info">
          초기화
        </el-button>
        <el-button type="primary" @click="getStacList">
          검색
        </el-button>
      </div>
    </div>
  </div>
  <div>
    <Swiper
      :slides-per-view="1"
      :space-between="50"
    >
      <SwiperSlide v-for="(stac, idx) in stacList" :key="idx">
        <div>
          <div>
            <span>{{ stac.orderMonth }}</span>
            <el-button type="info">
              결재
            </el-button>
          </div>
          <el-table v-loading="loading" :data="stac.productList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" />
            <el-table-column prop="orgName" label="회사이름" />
            <el-table-column prop="prdStyleNo" label="스타일 넘버" />
            <el-table-column prop="prdItem" label="아이템" />
            <el-table-column prop="prdSize" label="사이즈" />
            <el-table-column prop="prdColor" label="색" />
            <el-table-column prop="prdQty" label="수량" />
            <el-table-column prop="prdPrc" label="단가" />
            <el-table-column prop="totalPrdPrc" label="금액" />
            <el-table-column prop="paymentDate" label="결재 날자" />
          </el-table>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 2rem;
  font-size: 32px;
  line-height: 40px;
}
.search-box{
  padding: 10px;
  background: #ffffff;
  border: 1px solid #c1c2c3;
  border-radius: 10px;
  margin-bottom: 60px;
}
.last-button{
  padding-top: 10px;
}
.last {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
}
.search-form {
  width: 70%;
  position: relative;
  justify-content: start;
}
.form-input{
  width: 70%;
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
</style>

