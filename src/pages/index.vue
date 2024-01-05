<script setup lang="ts">
const router = useRouter()

const movePage = () => {
  router.push('/main')
}
onMounted(() => {
  movePage()
})
</script>

<template>
  <div />
</template>
