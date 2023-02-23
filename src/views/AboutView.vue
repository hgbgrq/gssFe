<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import { request } from './../util/request';
import { onMounted } from 'vue'


const init = async () => { 
  const res = await request(`/org`, { method: 'GET' })
}

onMounted(() => {
  init()
})

</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
