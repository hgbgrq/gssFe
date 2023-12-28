<script setup lang="ts">
import type { Organization, Product, Ordering } from "~/order/types";

const organizations = ref<Organization[]>([]);
const enrollProduct = ref<Product[]>([]);
const orderate = ref();
const deadLineDate = ref();
const oroderName = ref("");
const selectedOrg = ref("");
const state = ref("");
const enrollOrderData = reactive<Ordering>({
  orgId: selectedOrg.value,
  orderOrderingDate: orderate.value,
  orderDeadLineDate: deadLineDate.value,
  productList: enrollProduct.value
});
let loading = ref(false)

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

const deleteRow = (index: number) => {
  enrollProduct.value.splice(index, 1);
};

const copyCell = (index: number) => {
  enrollProduct.value[index] = JSON.parse(
    JSON.stringify(enrollProduct.value[index - 1])
  );
};

const handleSelect = (item: Organization) => {
  console.log(item);
  selectedOrg.value = JSON.parse(
    JSON.stringify(item.orgId)
  );
};

const onAddItem = () => {
  enrollProduct.value.push({
    productStyleNo: "",
    productItem: "",
    productSize: "",
    productColor: "",
    productQty: 0,
    productEtc: "",
  });
};



const getOrganizationList = async () =>{

  try {
    const res = await request('/org', { method: 'GET' })
    console.log(res)
    organizations.value = res.list;
  }catch (error){
    console.log(error)
  }
}

const convertDate = (date : Date) =>{
    const yyyy = date.getFullYear().toString(); 
    const mm = (date.getMonth()+1).toString(); 
    const dd = date.getDate().toString(); 

    var converDate = '';
    converDate += yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' +(dd[1] ? dd : '0' + dd[0]);
    
    return converDate

}

const Ordering = async () =>{

    loading.value = true
    enrollOrderData.orgId = selectedOrg.value
    enrollOrderData.orderOrderingDate = convertDate(orderate.value)
    enrollOrderData.orderDeadLineDate = convertDate(deadLineDate.value)

    const orderId = ref();
    const data = {
        ...enrollOrderData,
    }

    try {
        const res = await request('/order', { method: 'POST', data })
        orderId.value = res.orderId
    }catch (error){
    console.log(error)
    }

    try {
        await downloadExcelFile(`/order/downloadExcel/${orderId.value}`, { method: 'GET' })
    }catch (error){
    console.log(error)
    }

    loading.value = false


}
onMounted(
  async () => {
    await getOrganizationList();
  }
)
</script>

<template>
  <h1 class="title">발주등록</h1>

  <div>
    <div class="search-box">
      <div class="search-form">
        <span class="serach-label"> 회사 </span>
        <div>
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
      <div class="search-form">
        <span class="serach-label"> 발주일 </span>
        <el-date-picker v-model="orderate" type="date" />
      </div>
      <div class="search-form">
        <span class="serach-label"> 납기일 </span>
        <el-date-picker v-model="deadLineDate" type="date" />
      </div>
    </div>

    <div>
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
            <el-input v-model="enrollProduct[scope.$index].productQty" type = "number" />
          </template>
        </el-table-column>
        <el-table-column label="Etc" width="150">
          <template #default="scope">
            <el-input v-model="enrollProduct[scope.$index].productEtc" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="60">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
            >
              제거
            </el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="left" width="30">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click.prevent="copyCell(scope.$index)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 50%" @click="onAddItem">
        추가
      </el-button>
    </div>
    <el-button class="mt-4" style="width: 50%" @click="Ordering">
      발주
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 2rem;
  font-size: 32px;
  line-height: 40px;
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
