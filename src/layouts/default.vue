<script setup lang="ts">
import Header from './header.vue'
import Sidebar from './sidebar.vue'

const route = useRouter()

</script>

<template>
  <Header />
  <main class="FrameworkWrap">
    <nav class="sb">
      <Sidebar />
    </nav>
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<style lang="scss" scoped>
    .sb {
      position: fixed;
      bottom: 0rem;
      top: 50px;
      width: 220px;
    }
    .content{
      width: 100%;
      height: 100%;
      overflow-y: auto;
      margin-left: 220px;
      padding: 40px 48px 80px;
    }
    .FrameworkWrap{
      height: 100%;
      display: flex;
      padding-top: 50px;
    }
</style>
