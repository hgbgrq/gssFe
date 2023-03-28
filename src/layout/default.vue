<script setup lang="ts">
import Header from './header.vue'
import Sidebar from './sidebar.vue'

const route = useRouter()

</script>

<template>
  <Header />
  <main>
    <Sidebar />
    <div class ='content'>
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  @apply flex h-full;
  padding-top: $header-height;
}
.content {
  @apply w-full h-full;
  overflow-y: auto;
  margin-left: $sidebar-width;
  padding: 40px 48px 80px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04), -1px 0px 0px 0px rgba(0, 0, 0, 0.04), 0px 0px 24px 0px rgba(0, 0, 0, 0.04);
}
.footer-layout {
  @extend .content;
  height: calc(100% - 70px);
  padding: 40px 48px 0;
}
</style>