<script setup lang="ts">
import { File } from '~/fileList/types'

import type { Organization} from "~/order/types";
import 'swiper/css';

interface ISeachForm {
  orgId: string
  startMonth: string
  endMonth: string
}
interface IProduct {
  orderId: string
  productId: string
  productStyleNo: string
  productItem: string
  productSize: string
  productColor: string
  productQty: string
  productPrice: string
  productEtc: string
  orderOrderingDate: string
  totalPrdPrc: number
}
interface IOrganizationInfo {
  orgId: string
  orgName: string
}

interface stacInfo {
  month: string
  stacProductList: IProduct[]
}

interface IcommonCode {
  commonId: string
  commonName: string
  commonDesc: string
}

const searchForm: ISeachForm = reactive({
  orgId: '',
  startMonth: '',
  endMonth: '',
})


const organizationInfo = ref<IOrganizationInfo>();
const stacInfoList = ref<stacInfo[]>();
const checkedList = ref<IProduct[]>([])
const startMonth = ref("")
const endMonth = ref("")
const state = ref("");
const loading = ref(false)
const inputMode = ref(true)
const modeNmae = ref("단가 입력")
const modeType =ref("info")
let totalCount = ref(0)
const organizations = ref<Organization[]>([]);
const monthCommonCodes = ref<IcommonCode[]>([]);



const search = () => {
  console.log(searchForm)
}

const changeMode = () =>{
  if (inputMode.value){
    inputMode.value = false;
    modeType.value = "primary";
  }
  else{
    modifyPrice();
    inputMode.value = true;
    modeType.value = "info";
  }
}

const monthQuerySearch = (queryString: string, cb: any) =>{
  const results = queryString
    ? monthCommonCodes.value.filter(monthCreateFilter(queryString))
    : monthCommonCodes.value;
  cb(results);
}

const monthCreateFilter = (queryString: string) => {
  return (commonCode: IcommonCode) => {
    return (
      commonCode.commonName.toLowerCase().indexOf(queryString.toLowerCase()) !==
      -1
    );
  };
};

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? organizations.value.filter(createFilter(queryString))
    : organizations.value;
  cb(results);
};

const createFilter = (queryString: string) => {
  return (organization: Organization) => {
    return (
      organization.orgName.toLowerCase().indexOf(queryString.toLowerCase()) !==
      -1
    );
  };
};

const getOrganizationList = async () =>{

  try {
    const res = await request('/org', { method: 'GET' })
    organizations.value = res.list;
  }catch (error){
    console.log(error)
  }
}

const getMonthCommonCode = async () =>{
  try {
    const res = await request('/common-code/month-code', { method: 'GET' })
    monthCommonCodes.value = res.commonCodeList;
  }catch (error){
    console.log(error)
  }
}

const modifyPrice = async() =>{

  const data = {
    stacProductReqList: stacInfoList.value
  }
  try {
    const res = await request('/stac', { method: 'POST', data })
    console.log(res)
    if(res.code ==='200'){
      getStacList();
    }
  }catch (error) {
    console.log(error)
  }

}

const handleSelect = (item: Organization) => { 
  searchForm.orgId = JSON.parse(
    JSON.stringify(item.orgId)
  );
};

const startMonthHandleSelect = (item: IcommonCode) =>{
  searchForm.startMonth = JSON.parse(
    JSON.stringify(item.commonId)
  );
}

const endMonthHandleSelect = (item: IcommonCode) =>{
  searchForm.endMonth = JSON.parse(
    JSON.stringify(item.commonId)
  );
}

const handleSelectionChange = (val: IProduct[]) => {
  checkedList.value = val
}


const getStacList = async () => {
  const params = {
  ...searchForm,
  }
  try {
    const res = await request('/stac', { method: 'GET' ,params})
    organizationInfo.value = res;
    stacInfoList.value = res.stacMonthList;
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(
  async () => {
  await getOrganizationList();
  await getMonthCommonCode();
  }
)

</script>

<template>
  <h1 class="title">
    매입장
  </h1>
  <div class="search-box">
    <div class="search-form">
      <span class = "serach-label">
        회사
      </span>
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
    <div class="last">
      <div class="search-form">
        <span class = "serach-label">조회 기간</span>
        <div class="m-2">
          <el-autocomplete
              v-model="startMonth"
              value-key="commonName"
              :fetch-suggestions="monthQuerySearch"
              clearable
              class="inline-input w-30"
              placeholder="시작"
              @select="startMonthHandleSelect"
          />
          ~
          <el-autocomplete
            v-model="endMonth"
            value-key="commonName"
            :fetch-suggestions="monthQuerySearch"
            clearable
            class="inline-input w-30"
            placeholder="끝"
            @select="endMonthHandleSelect"
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
    <div class="table-button">
      <el-button :type="modeType" @click="changeMode">
        {{modeNmae}}
      </el-button>
    </div>
    <div class = "stac-box">
      <div v-for="(stacinfo, idx) in stacInfoList" :key="idx" class = "month-block">
        <span class = "stac-label">
          {{stacInfoList[idx].month}}
        </span>
        <div class ="stac-table">
          <el-table v-loading="loading" :data="stacinfo.stacProductList">
            <el-table-column prop="orderOrderingDate" label="발주일" />
            <el-table-column prop="productStyleNo" label="styleNo" />
            <el-table-column prop="productItem" label="item" />
            <el-table-column prop="productSize" label="size" />
            <el-table-column prop="productColor" label="color" />
            <el-table-column prop="productQty" label="qty" />
            <el-table-column label="비고">
              <template #default="scope">
                <el-input v-model="stacinfo.stacProductList[scope.$index].productEtc" :disabled="inputMode"/>
              </template>
            </el-table-column>
            <el-table-column label="개별 단가">
              <template #default="scope">
                <el-input v-model="stacinfo.stacProductList[scope.$index].productPrice" :disabled="inputMode"/>
              </template>
            </el-table-column>
            <el-table-column prop="totalPrdPrc" label="총액" />
          </el-table>
        </div>
      </div>
    </div>
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
.serach-label {
  margin-right: 5px;
}
.table-button {
  float: right;
  margin-bottom: 10px;
}
.stac-label {
  margin-bottom : 10px
}
.stac-box {
  display: flex;
  overflow-x: auto;
  width: 100%;
}
.month-block {
  width: 100%;
  margin-right: 10px;
  border: 1px solid #c1c2c3;
  border-radius: 4px;
}
.stac-table {
  width: 1200px;
}
</style>

