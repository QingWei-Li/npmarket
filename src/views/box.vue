<template>
  <main class="PageBox">
    <filter-panel
      class="PageBox__list"
      @search="keyword = $event"
      @selected="$router.push({ query: { name: $event } })"
      :list="list"
      :total="total">
    </filter-panel>
    <section class="PageBox__main">
      <pkg-header :data="$at('pkg.collected.metadata')" />
      <readme-panel
        class="PageBox__main__readme"
        :content="$at('pkg.collected.metadata.readme')">
      </readme-panel>
    </section>
  </main>
</template>

<script>
  import FilterPanel from '@/components/filter-panel'
  import ReadmePanel from '@/components/readme-panel'
  import PkgHeader from '@/components/pkg-header'
  import CACHED from '@/utils/cached'

  export default {
    name: 'PageBox',

    components: { FilterPanel, ReadmePanel, PkgHeader },

    data: () => ({
      pkg: {},
      keyword: '',
      loadingList: false
    }),

    created() {
      this.$watch('$route.query.name', this.loadInfo, { immediate: true })
    },

    computed: {
      list() {
        return this.$store.state.collects
      },

      total() {
        return this.list.length
      }
    },

    methods: {
      async loadInfo(name) {
        if (!name) {
          return
        }

        if (CACHED[name]) {
          this.pkg = CACHED[name]
          window.__REPO_URL__ = this.pkg.collected.metadata.links.repository
          return
        }

        this.pkg = {}
        CACHED[name] = this.pkg = (await this.$npms(`package/${encodeURIComponent(name)}`)).data
        window.__REPO_URL__ = this.pkg.collected.metadata.links.repository
      }
    }
  }
</script>

<style>
  .PageBox {
    display: flex;

    &__list {
      background-color: #fff;
      flex: 25%;
      box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
      z-index: 1;
      position: relative;
      overflow-y: hidden;

      &__spinner {
        position: absolute;
        bottom: 0;
        margin: 10px auto;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    &__main {
      flex: 70%;
      display: flex;
      flex-direction: column;
      width: 0;

      &__readme {
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        background-color: #fff;
      }
    }
  }
</style>
