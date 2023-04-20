<script setup lang="ts">
import type { VueDaumPostcodeCompleteResult } from 'vue-daum-postcode'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Popup } from '~/components/types/popup'
import DaumPostPopup from '~/components/popup/DaumPostPopup.vue'
import type { Org } from '~/admin/companyManagement/types'
import { isEmpty } from '~/composables/utils'

const props = defineProps<{
  orgId: string
  type: string
}>()

const emit = defineEmits([
  'close',
  'reload',
])

const popup: Popup = reactive({
  name: '',
  title: '',
  show: true,
  width: '1000px',
  button: '',
})

const org = reactive<Org>({
  orgId: '',
  orgName: '',
  orgEmail: '',
  orgAddress: '',
  orgAddressDetail: '',
  orgNumber: '',
  orgPaxNumber: '',
  orgZoneCode: '',
  orgEtc: '',
})

const postPopup = ref(false)
const checkOrgName = ref(false)

const complete = (newResult: VueDaumPostcodeCompleteResult) => {
  postPopup.value = false
  org.orgZoneCode = newResult.zonecode
  org.orgAddress = `${newResult.address}(${newResult.buildingName})`
  console.log(newResult)
}
const DaumPostPopupOpen = () => {
  postPopup.value = true
  console.log('오픈')
}
const close = () => {
  emit('close')
  emit('reload')
}

const closePost = () => {
  postPopup.value = false
}

const isChange = () => {
  checkOrgName.value = false
}

const checkDuplicateName = async () => {
  try {
    const res = await request(`/org/check/${org.orgName}`, { method: 'GET' })
    if (!res) {
      checkOrgName.value = true
      ElMessageBox.alert('사용 가능한 아이디 입니다.')
    }
    else { ElMessageBox.alert('이미 존재하는 아이디 입니다.') }
  }
  catch (error) {
    console.error(error)
  }
}

const validation = (): boolean => {
  if (isEmpty(org.orgName)) {
    // ElMessage({ message: '이름을 입력하지 않았습니다.', type: 'warning' })
    ElMessageBox.alert('이름을 입력하지 않았습니다.')
    return false
  }
  return true
}

const popupButton = async () => {
  if (!checkOrgName.value) {
    // ElMessage({ message: '이름 중복 체크를 완료해주세요.', type: 'warning' })
    ElMessageBox.alert('이름 중복 체크를 완료해주세요.')
    return
  }
  console.log(checkOrgName)
  console.log(validation)
  if (!validation())
    return

  try {
    const data = {
      ...org,
    }
    if (props.type === 'modify') {
      const res = await request('/org/modify', { method: 'POST', data })
      if (res.code === '200') {
        ElMessageBox.alert('수정 하였습니다.')
        close()
      }
      else { ElMessageBox.alert(res.desc) }
    }
    else {
      const res = await request('/org', { method: 'POST', data })
      if (res.code === '200') {
        ElMessageBox.alert('등록 하였습니다.')
        close()
      }
      else { ElMessageBox.alert(res.desc) }
    }
  }
  catch (error) {
    console.log(error)
  }
}

const getDetailOrg = async () => {
  try {
    const res = await request(`/org/${props.orgId}`, { method: 'GET' })
    org.orgName = res.orgName
    org.orgNumber = res.orgNumber
    org.orgPaxNumber = res.orgPaxNumber
    org.orgEmail = res.orgEmail
    org.orgEtc = res.orgEtc
    org.orgZoneCode = res.orgZoneCode
    org.orgAddress = res.orgAddress
    org.orgAddressDetail = res.orgAddressDetail
    org.orgId = res.orgId
  }
  catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  if (props.type === 'modify') {
    popup.title = '회사 수정'
    popup.button = '수정'
    checkOrgName.value = true
    await getDetailOrg()
  }
  else {
    popup.title = '회사 등록'
    popup.button = '등록'
  }
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
      <div class="block-1">
        <label class="label-1">
          회사이름
        </label>
        <input v-model="org.orgName" type="text" class="input-1" @input="isChange">
        <el-button type="info" class="button-1" @click="checkDuplicateName">
          중복체크
        </el-button>
      </div>
      <div class="block-2">
        <div class="th-1">
          <label class="label-1">
            전화 번호
          </label>
          <input v-model="org.orgNumber" type="text" class="input-2">
        </div>
        <div class="th-1">
          <label class="label-1">
            팩스번호
          </label>
          <input v-model="org.orgPaxNumber" type="text" class="input-2">
        </div>
      </div>
      <div class="block-2">
        <div class="th-1">
          <label class="label-1">
            이메일
          </label>
          <input v-model="org.orgEmail" type="text" class="input-2">
        </div>
        <div class="th-1">
          <label class="label-1">
            비고
          </label>
          <input v-model="org.orgEtc" type="text" class="input-2">
        </div>
      </div>
      <div class="block-3">
        <label class="label-1">
          우편번호
        </label>
        <input v-model="org.orgZoneCode" type="text" class="input-3" disabled>
        <el-button type="info" class="button-1" @click="DaumPostPopupOpen">
          주소 찾기
        </el-button>
      </div>
      <div class="block-3">
        <label class="label-1">
          주소
        </label>
        <input v-model="org.orgAddress" type="text" class="input-2" disabled>
      </div>
      <div class="block-3">
        <label class="label-1">
          상세 주소
        </label>
        <input v-model="org.orgAddressDetail" type="text" class="input-2">
      </div>
      <div>
        <DaumPostPopup
          v-if="postPopup"
          @complete="complete"
          @close="closePost"
        />
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

<style lang="scss" scoped>
  .popup{
    height: 100%;
    overflow-y: auto;
    padding: 0 40px!important;
  }
  .block-1{
    margin-bottom: 1rem;
    height: 80px;
  }
  .block-2{
    width: 100%;
    height: 80px;
    display: flex;
  }
  .block-3{
    margin-bottom: 1rem;
    height: 50px;
  }
  .label-1{
    display: flex;
    font-size: 13px;
    line-height: 19px;
    color: #666;
  }
  .input-1{
    width: 50%;
    font-size: 14px;
    height: 40px;
    padding: 8px 15px;
    background: #ffffff;
    border: 1px solid #d6dbe4;
    border-radius: 4px;
    color: #222;
    caret-color: #5bb870;
    transition: all .1s linear;
  }
  .input-2{
    width: 80%;
    font-size: 14px;
    height: 40px;
    padding: 8px 15px;
    background: #ffffff;
    border: 1px solid #d6dbe4;
    border-radius: 4px;
    color: #222;
    caret-color: #5bb870;
    transition: all .1s linear;
  }
  .input-3{
    width: 30%;
    font-size: 14px;
    height: 40px;
    padding: 8px 15px;
    background: #ffffff;
    border: 1px solid #d6dbe4;
    border-radius: 4px;
    color: #222;
    caret-color: #5bb870;
    transition: all .1s linear;
  }
  .button-1{
    height: 40px;
    margin-left: 1em;
  }
  .th-1{
    width: 50%;
  }
  .footer{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 40px 40px!important;
  }
</style>
