<script setup lang="ts">
import { VueDaumPostcode } from 'vue-daum-postcode'
import type { VueDaumPostcodeCompleteResult } from 'vue-daum-postcode'
import type { Popup } from '~/components/types/popup'

const emit = defineEmits([
  'complete',
  'close',
])

const popup: Popup = reactive({
  name: '',
  title: '주소 찾기',
  show: true,
  width: '500px',
})

const result = ref<VueDaumPostcodeCompleteResult | null>(null)

const onComplete = (newResult: VueDaumPostcodeCompleteResult) => {
  result.value = newResult
  emit('complete', newResult)
}

const close = () => {
  emit('close')
}
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
    <VueDaumPostcode @complete="onComplete" />
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>
