<template>
  <header class="PkgHeader__header">
    <div class="PkgHeader__header__info">
      <span class="PkgHeader__title">
      {{ $route.query.name || $at('data.name') }}
      </span>
      <small class="PkgHeader__version">{{ $at('data.version') }}</small>
      <p class="PkgHeader__desc">{{ $at('data.description') }}</p>
    </div>
    <div class="PkgHeader__header__links">
      <a
        class="PkgHeader__github"
        target="_blank"
        :href="$at('data.links.repository')">
        <i class="iconfont icon-github"></i>
      </a>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'PkgHeader',

    props: ['data']
  }
</script>

<style>
  .PkgHeader {
    &__github {
      color: inherit;

      &:hover {
        text-decoration: none;
        opacity: .6;
      }

      .iconfont {
        font-size: 20px;
      }
    }

    &__header {
      border-bottom: 1px solid rgba(#9CA3A9, .1);
      box-sizing: border-box;
      position: relative;
      height: 72px;
      padding: 0 20px;
      display: flex;
      align-items: center;

      &__info {
        flex: 1;
      }

      &__links {
        width: 300px;
        text-align: right;
        margin-right: 20px;
      }
    }

    &__title {
      font-size: 30px;
      font-weight: bold;
    }

    &__desc {
      margin-top: 4px;
    }
  }
</style>
