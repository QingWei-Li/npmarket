<template>
  <main class="PageSearch">
    <filter-panel
      class="PageSearch__list"
      @search="loadList"
      @selected="$router.push({ query: { name: $event } })"
      :list="list"
      :total="total" />
    <section class="PageSearch__main">
      <header class="PageSearch__main__header">
        <span>{{ $route.query.name }}</span>
        <span>v{{ $at('pkg.collected.metadata.version') }}</span>
        <span>{{ $at('pkg.collected.metadata.description') }}</span>
        <a
          class="PageSearch__main__link"
          target="_blank"
          :href="$at('pkg.collected.metadata.links.repository')">
          <i class="iconfont icon-github"></i>
        </a>
      </header>
      <readme-panel
        class="PageSearch__main__readme"
        :content="$at('pkg.collected.metadata.readme')"/>
    </section>
  </main>
</template>

<script>
  import FilterPanel from '@/components/filter-panel'
  import ReadmePanel from '@/components/readme-panel'
  import { CancelToken } from 'axios'

  export default {
    name: 'PageSearch',

    components: { FilterPanel, ReadmePanel },

    data: () => ({
      list: [],
      total: 0,
      pkg: {}
    }),

    created() {
      this.$watch('$route.query.name', async name => {
        if (!name) return
        this.pkg = {}

        try {
          this.pkg = (await this.$npms(`package/${name}`)).data
        } catch (e) {
          console.log(e)
        }
      }, { immediate: true })
    },

    methods: {
      async loadList(q) {
        try {
          this.cancelSearch && this.cancelSearch()

          const result = await this.$npms('search', {
            cancelToken: new CancelToken(c => {
              this.cancelSearch = c
            }),
            params: { q }
          })

          this.total = result.data.total
          this.list = result.data.results
        } catch (e) {
          this.total = 0
          this.list = []
        }
      }
    }
  }
</script>

<style>
  .PageSearch {
    display: flex;

    &__list {
      background-color: #455D7A;
      flex: 25%;
      box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
      z-index: 1;
    }

    &__main {
      flex: 70%;
      display: flex;
      flex-direction: column;
      width: 0;

      &__link {
        text-decoration: none;
        color: inherit;

        &:hover {
          opacity: .6;
        }
      }

      &__header {
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
      }

      &__readme {
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        background-color: #fafafa;
      }
    }
  }
</style>
