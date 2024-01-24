<script setup lang="ts">
const router = useRouter()

const movePage = () => {
  router.push('/main')
}
</script>

<template>
  <div class="login__form">
    <div class="login__title">
      <h1>GSS-HGB</h1>
    </div>
    <div class="w-full">
      <input
        placeholder="아이디"
      >
      <input
        type="password"
        class="mt-10px"
        placeholder="비밀번호"
      >
      <button type="button" class="w-full mt-10 btn__gray--lg" @click="movePage">
        로그인
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: Login
</route>
