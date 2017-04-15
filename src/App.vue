<template>
  <main class="App">
    <app-sidebar class="App__sidebar" />
    <router-view class="App__view" />
  </main>
</template>

<script>
  import AppSidebar from '@/components/sidebar'

  export default {
    name: 'App',

    components: { AppSidebar }
  }
</script>

<style src="nprogress/nprogress.css"></style>
<style src="@/assets/font/iconfont.css"></style>
<style>
  @reset-global pc;

  html, body, .App {
    height: 100%;
  }

  body {
    font-size: 14px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  .App {
    display: flex;

    &__sidebar {
      flex: 5%;
    }

    &__view {
      flex: 95%;
    }
  }
</style>
