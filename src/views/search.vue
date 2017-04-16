<template>
  <main class="PageSearch">
    <filter-panel
      class="PageSearch__list"
      @search="[clearList(), updateQuery($event)]"
      @loadMore="!loadingList && !lockList && updateQuery($event, ++page)"
      @selected="$router.push({ query: { name: $event } })"
      :list="list"
      :total="total">
      <spinner
        class="PageSearch__list__spinner"
        v-if="loadingList"
        color="#0084ff"
        size="30px" />
    </filter-panel>
    <section class="PageSearch__main">
      <pkg-header :data="$at('pkg.collected.metadata')" />
      <readme-panel
        class="PageSearch__main__readme"
        :content="$at('pkg.collected.metadata.readme')">
      </readme-panel>
    </section>
  </main>
</template>

<script>
  import FilterPanel from '@/components/filter-panel'
  import ReadmePanel from '@/components/readme-panel'
  import PkgHeader from '@/components/pkg-header'
  import Spinner from 'vue-spinner/src/BounceLoader'
  import { CancelToken } from 'axios'
  import CACHED from '@/utils/cached'

  const LIMIT = 25

  export default {
    name: 'PageSearch',

    components: { FilterPanel, ReadmePanel, Spinner, PkgHeader },

    data: () => ({
      list: [],
      total: 0,
      pkg: {},
      page: 0,
      loadingList: false,
      lockList: false
    }),

    created() {
      this.$watch('$route.query.name', this.loadInfo, { immediate: true })
      this.$watch('$route.query.q', this.loadList, { immediate: true })
    },

    methods: {
      updateQuery(q, page = 0) {
        const from = page * LIMIT

        if (this.lockList || this.loadingList) return
        if (this.total && this.total < from) {
          this.lockList = true
        }

        this.$router.push({
          query: { q, from }
        })
      },

      clearList() {
        this.page = 0
        this.list = []
        this.lockList = false
        this.loadingList = false
      },

      async loadList() {
        const { q, from } = this.$route.query

        if (!q) {
          return
        }

        this.loadingList = true
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
          this.loadingList = false
        } catch (e) {
          this.loadingList = false
        }
      },

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

      &__readme {
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        background-color: #fff;
      }
    }
  }
</style>
