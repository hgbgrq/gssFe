<script setup lang="ts">
const router = useRouter()

const movePage = () => {
  router.push('/login')
}
onMounted(() => {
  movePage()
})
</script>

<template>
  <div />
</template>

<route lang="yaml">
meta:
  layout: Login
</route>
