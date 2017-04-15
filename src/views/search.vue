<template>
  <main class="PageSearch">
    <filter-panel
      class="PageSearch__list"
      @search="[clearList(), loadList($event)]"
      @loadMore="!loading && !lock && loadList($event, ++page)"
      @selected="$router.push({ query: { name: $event } })"
      :list="list"
      :total="total">
      <spinner
        class="PageSearch__list__spinner"
        v-if="loading"
        color="#0084ff"
        size="30px" />
      </filter-panel>
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
  import Spinner from 'vue-spinner/src/BounceLoader'
  import { CancelToken } from 'axios'

  const LIMIT = 25

  export default {
    name: 'PageSearch',

    components: { FilterPanel, ReadmePanel, Spinner },

    data: () => ({
      list: [],
      total: 0,
      pkg: {},
      page: 0,
      loading: false,
      lock: false
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
      async loadList(q, page = 0) {
        const from = page * LIMIT

        if (this.lock || this.loading) return
        if (this.total && this.total < from) {
          this.lock = true
        }
        this.loading = true
        try {
          this.cancelSearch && this.cancelSearch()

          const result = await this.$npms('search', {
            cancelToken: new CancelToken(c => {
              this.cancelSearch = c
            }),
            params: { q, from }
          })

          this.total = result.data.total
          this.list = this.list.concat(result.data.results)
          this.loading = false
        } catch (e) {
          this.loading = false
        }
      },

      clearList() {
        this.page = 0
        this.list = []
        this.lock = false
        this.loading = false
      }
    }
  }
</script>

<style>
  .PageSearch {
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

      &__link {
        text-decoration: none;
        color: inherit;

        &:hover {
          opacity: .6;
        }
      }

      &__header {
        border-bottom: 1px solid rgba(#9CA3A9, .1);
        box-sizing: border-box;
        padding: 16px;
        position: relative;
      }

      &__readme {
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        background-color: #fff;
      }
    }
  }
</style>
