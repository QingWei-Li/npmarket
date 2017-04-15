<template>
  <aside class="Sidebar">
    <ul class="Sidebar__list">
      <li class="Sidebar__item Sidebar__item--highlight">
        <a target="_blank" href="//github.com/qingwei-li/npmarket">
          <i class="iconfont icon-github"></i>
        </a>
      </li>
      <router-link to="/" tag="li" class="Sidebar__item">
        <a to="/">
          <i class="iconfont icon-search"></i>
        </a>
      </router-link>
      <router-link to="/box" tag="li" class="Sidebar__item">
        <a to="/box">
          <i class="iconfont icon-box"></i>
        </a>
      </router-link>
    </ul>
  </aside>
</template>

<style>
  .Sidebar {
    background-color: #272E3D;
    overflow: hidden;

    .iconfont {
      color: #fff;
      font-size: 30px;
    }

    &__list {
      width: 100%;
    }

    &__item {
      width: 100%;
      text-align: center;
      padding: 18px 0;
      transition: all .3s;

      &--highlight {
        background-color: #0084ff;

        &:hover {
          background-color: #006acd;
        }
      }

      &:hover:not(&--highlight) {
        background-color: #1c212c;
      }
    }

    a:hover {
      text-decoration: none;
    }
  }
</style>
