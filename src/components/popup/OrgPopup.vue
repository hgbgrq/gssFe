<script setup lang="ts">

import { Popup } from "~/components/types/popup";

const popup: Popup = reactive({
  name: 'VacationP',
  title: '회사 등록',
  show: true,
  width: '1000px',
})

const props = defineProps<{
  orgId: string
}>()

const emit = defineEmits([
  'close',
  'reload',
])

const close = () => {
  emit('close')
  emit('reload')
}
</script>

<template>
  <el-dialog
    v-model="popup.show"
    :width="popup.width"
    top="100px"
    :title="popup.title"
    @close="close"
    draggable
    style="height: 70%"
  >
    <div class="popup">
      <div class="block-1">
        <label class="label-1">
          회사이름
        </label>
        <input type="text" class="input-1">
        <el-button type="info" class="button-1">중복체크</el-button>
      </div>
      <div class="block-2">
        <div class="th-1">
          <label class="label-1">
            전화 번호
          </label>
          <input type="text" class="input-2">
        </div>
        <div class="th-1">
          <label class="label-1">
            팩스번호
          </label>
          <input type="text" class="input-2">
        </div>
      </div>
      <div class="block-2">
        <div class="th-1">
          <label class="label-1">
            이메일
          </label>
          <input type="text" class="input-2">
        </div>
        <div class="th-1">
          <label class="label-1">
            담당자
          </label>
          <input type="text" class="input-2">
        </div>
      </div>
    </div>
    <template #footer>
      <div class="footer">
        <el-button type="info">취소</el-button>
        <el-button type="primary">등록</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
  .popup{
    height: 70%;
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