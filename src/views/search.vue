<template>
  <main class="PageSearch">
    <filter-panel
      class="PageSearch__list"
      @search="[clearList(), loadList($event)]"
      @loadMore="!loadingList && !lockList && loadList($event, ++page)"
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
      <header class="PageSearch__main__header">
        <div class="PageSearch__main__header__info">
          <span class="PageSearch__main__title">
          {{ $route.query.name || $at('pkg.collected.metadata.name') }}
          </span>
          <small class="PageSearch__main__version">{{ $at('pkg.collected.metadata.version') }}</small>
          <p class="PageSearch__main__desc">{{ $at('pkg.collected.metadata.description') }}</p>
        </div>
        <div class="PageSearch__main__header__links">
          <a
            class="PageSearch__main__github"
            target="_blank"
            :href="$at('pkg.collected.metadata.links.repository')">
            <i class="iconfont icon-github"></i>
          </a>
        </div>
      </header>
      <readme-panel
        v-if="$at('pkg.collected.metadata.readme')"
        class="PageSearch__main__readme"
        :content="$at('pkg.collected.metadata.readme')">
      </readme-panel>
      <div class="PageSearch__main__empty" v-else>
        <h2>npmarket</h2>
        <p>More efficient search for node packages</p>
        <p class="author">Created by <a href="//github.com/qingwei-li">QingWei-Li</a></p>
      </div>
    </section>
  </main>
</template>

<script>
  import FilterPanel from '@/components/filter-panel'
  import ReadmePanel from '@/components/readme-panel'
  import Spinner from 'vue-spinner/src/BounceLoader'
  import { CancelToken } from 'axios'

  const LIMIT = 25
  const CACHED = {}

  export default {
    name: 'PageSearch',

    components: { FilterPanel, ReadmePanel, Spinner },

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
    },

    methods: {
      async loadList(q, page = 0) {
        const from = page * LIMIT

        if (this.lockList || this.loadingList) return
        if (this.total && this.total < from) {
          this.lockList = true
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

      clearList() {
        this.page = 0
        this.list = []
        this.lockList = false
        this.loadingList = false
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
          width: 100px;
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

      &__readme {
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        background-color: #fff;
      }

      &__empty {
        text-align: center;
        align-items: center;
        margin-top: 16vh;

        h2 {
          font-size: 50px;
          font-family: 'Avenir', Helvetica, Arial, sans-serif;
          color: #0084ff;
          margin-bottom: 20px;
        }

        p {
          font-size: 20px;
          margin-bottom: 20px;
        }

        .author {
          font-size: 14px;
        }
      }
    }
  }
</style>
