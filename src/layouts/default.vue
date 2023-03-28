<script setup lang="ts">
import Header from './header.vue'
import Sidebar from './sidebar.vue'

const route = useRouter()

</script>

<template>
  <div class="FrameworkWrap">
    <Header />
    <div class="layout">
      <Sidebar />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .layout {
      position: relative;
      overflow-y: scroll;
      width: 100%;
      height: 100%;
      padding-top: 50px;
      background-color: white;

      .content {
        overflow-x: auto;
        width: 100%;
        height: 100%;
        padding-left: 250px;
        padding-right: 30px;

        &>div {
          max-width: 1500px;
          margin: 0 auto;
          padding: 30px 0;
          height: 100%;
        }
      }

      &.main {
        padding: 0;
        .content__wrap {
          width: 100%;
          padding: 0;
        }
      }
    }
    </style>
