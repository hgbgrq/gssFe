<script setup lang="ts">
const router = useRouter()

const moveHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="header">
    <span class="logo__title" @click="moveHome">
      GSS-HGB
    </span>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-width: 1536px;
  height: 50px;
  padding: 10px 10px;
  background-color: #17BD81;
  box-sizing: border-box;
}
.logo {
    cursor: pointer;
    -webkit-user-select: none; // drag unset
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.logo__title{
  color: #ffffff;
  cursor: default;
  margin-left: 3%;
  font-size: 15pt;
  padding-bottom: 4px;
}
</style>
