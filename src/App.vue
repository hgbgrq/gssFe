<script setup lang="ts">
import '~/styles/base.scss'
import '~/styles/common.scss'
import { useEventBus } from '@vueuse/core'
import type { IResponse } from '~/types'
import { gssEventBusKey } from '~/types'

const router = useRouter()

const bus = useEventBus(gssEventBusKey)
const notEvent = (errorResponse: IResponse) => {
  // if (errorResponse.code === RESPONSE.LOGIN_UNAUTHORIZED) {
  //   ElMessage({
  //     type: 'error',
  //     message: '세션이 만료되었습니다. 로그인 페이지로 이동합니다.',
  //   })
  //   router.push('/login')
  // }
  router.push('/login')
}
bus.on(notEvent)

// onBeforeUnmount(() => {
//   bus.off(notEvent)
// })
</script>

<template>
  <RouterView />
</template>
