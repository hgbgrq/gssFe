<template>
  <!-- 로그인 -->
  <main class="login">
    <RouterView />
    <div class="login__footer">
      <p>CSS-HGB</p>
    </div>
  </main>
</template>

<style lang="scss">
.login {
  @apply flex-center flex-col justify-center w-full relative;
  min-height: 100vh;
  // padding: 120px 90px 0;
  background:$color-dark-2;

  &__form {
    @apply flex-center flex-col justify-center;
    min-height: 450px;
    width:520px;
    padding: 0 60px;
    background-color: $color-white;
    border-radius: $radius-1;
    border: 1px solid $color-light-3;
    box-shadow: rgb(0 0 0 / 5%) 0px 4px 16px 0px;

    input {
      @apply w-full px-4;
      @include typography("h7");
      height: 48px;
      border-radius: $radius-2;
      border:1px solid $color-light-7;
      background-color: $color-white;
      color: $color-dark-1;
      transition: $transition;

      &:focus {
        border: 1px solid $color-primary;
      }
    }
  }

  &__title {
    @apply mb-10;
    h1 {
      line-height: 32px;
      font-size: 24px;
      font-weight: 700;
      color: $color-dark-1;
    }
    p {
      @apply mt-3 text-center;
      @include typography("body1");
      line-height: 22px;
      color:$color-dark-3;
    }
  }

  &__footer {
    @apply flex justify-center;
    p {
      @include typography("body3");
      position:absolute;
      bottom:0;
      padding: 80px 0 60px;
      color: $color-dark-7;
    }
  }
}
</style>
