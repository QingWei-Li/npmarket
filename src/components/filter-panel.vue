<template>
  <div class="FilterPanel">
    <div
      :class="{
        'FilterPanel__search--active': focus
      }"
      class="FilterPanel__search">
      <i class="iconfont icon-search FilterPanel__search__icon"></i>
      <input
        autofocus
        @keyup.enter="$emit('search', keyword)"
        @focus="focus = true"
        @blur="focus = false"
        class="FilterPanel__search__input"
        type="search"
        v-model="keyword">
    </div>
    <ul class="FilterPanel__list">
      <li
        @click="$emit('selected', item.package.name)"
        class="FilterPanel__list__item"
        v-for="item in list">
        <h2>
          <span>{{ item.package.name }}</span>
          <small>{{ item.package.version }}</small>
        </h2>
        <p>{{ item.package.description }}</p>

        <p>
          <span>{{ item.package.publisher.username }}</span>
          <span>{{ item.score.final }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import debounce from 'throttle-debounce/debounce'

  export default {
    name: 'FilterPanel',

    props: ['list', 'total'],

    created() {
      this.keyword = this.$route.query.name
    },

    data: () => ({
      keyword: '',
      focus: false
    }),

    watch: {
      keyword: debounce(200, function (val) {
        val && this.$emit('search', val)
      })
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
      height: 50px;
      border-bottom: 1px solid #3d526c;
      transition: all .3s;
      margin: 0 20px;

      &--active {
        border-bottom-color: #233142;

        .FilterPanel__search__icon {
          color: #233142;
        }
      }

      &__icon {
        color: #3d526c;
        height: 100%;
        line-height: 50px;
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
        background-color: transparent;
        color: #fff;
      }
    }

    &__list {
      flex: 1;
      overflow-y: auto;

      &__item {
        padding: 20px;
        color: #e3e3e3;
        /*border-bottom: 1px dashed #384c64;*/

        &:hover {
          background-color: #384c64;
        }
      }
    }
  }
</style>
