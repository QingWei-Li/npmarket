<template>
  <main class="App">
    <app-sidebar class="App__sidebar" />
    <keep-alive>
      <router-view class="App__view" />
    </keep-alive>
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
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #272E3D;
  }

  a {
    text-decoration: none;
    color: #0084ff;

    &:hover {
      text-decoration: underline;
    }
  }

  .App {
    display: flex;

    &__sidebar {
      width: 71px;
    }

    &__view {
      flex: 1;
    }
  }

  .mini-toastr-notification__message {
    padding: 0!important;
  }
</style>
