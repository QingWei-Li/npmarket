<template>
  <div class="FilterPanel">
    <div
      :class="{
        'FilterPanel__search--active': focus
      }"
      class="FilterPanel__search">
      <i
        @click="keyword = ''"
        :class="[focus && keyword ? 'icon-cross' : 'icon-search']"
        class="iconfont FilterPanel__search__icon"></i>
      <input
        autofocus
        placeholder="Search packages"
        @keyup.enter="$emit('search', keyword), index = -1"
        @focus="focus = true"
        @blur="focus = false"
        @keydown.prevent.down="index++"
        @keydown.prevent.up="index && index--"
        class="FilterPanel__search__input"
        type="search"
        v-model="keyword">
    </div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
      class="FilterPanel__list">
      <li
        @click="[$emit('selected', item.package.name), index = key]"
        class="FilterPanel__list__item"
        :class="{
          'FilterPanel__list__item--active': index === key
        }"
        v-for="(item, key) in list">
        <pkg :data="item" />
      </li>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  import debounce from 'throttle-debounce/debounce'
  import Pkg from './pkg'

  export default {
    name: 'FilterPanel',

    props: ['list', 'total'],

    components: { Pkg },

    created() {
      this.keyword = this.$route.query.name
    },

    data: () => ({
      keyword: '',
      index: -1,
      focus: false,
      scrollTo: 0
    }),

    watch: {
      keyword: debounce(200, function (val) {
        this.$emit('search', val)
      }),

      index: debounce(200, function (val) {
        const item = this.list[val]

        item && this.$emit('selected', item.package.name)
      })
    },

    methods: {
      loadMore() {
        this.list.length && this.$emit('loadMore', this.keyword)
      }
    }
  }
</script>

<style>
  .FilterPanel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &__search {
      display: flex;
      align-items: center;
      height: 71px;
      border-bottom: 1px solid rgba(#9CA3A9, .1);
      transition: all .3s;
      padding: 0 20px;

      &--active {
        .FilterPanel__search__icon {
          color: #272E3D;
        }

        .FilterPanel__search__input {
          color: #272E3D;
        }
      }

      &__icon {
        color: #9CA3A9;
        height: 100%;
        line-height: 71px;
        transition: all .3s;
      }

      &__input {
        padding-left: 10px;
        display: block;
        outline: none;
        border: none;
        appearance: none;
        border-radius: 0;
        flex: 1;
        height: 100%;
        color: #9CA3A9;
        transition: all .3s;
      }
    }

    &__list {
      flex: 1;
      overflow-y: auto;
      padding-bottom: 60px;

      &__item {
        color: #272E3D;
        position: relative;

        &:hover:not(&--active) {
          background-color: rgba(#DDE2E9, .2);
        }

        &--active {
          background-color: rgba(#DDE2E9, .8);
        }
      }
    }
  }
</style>
