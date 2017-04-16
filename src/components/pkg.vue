<template>
  <div
    class="Pkg"
    @mouseenter="hover = true"
    @mouseleave="hover = false">
    <div class="Pkg__score">
      <i
        :style="{
          color: colors[score]
        }"
        class="iconfont icon-bgscore"></i>
      <span>{{ score }}</span>
    </div>

    <div class="Pkg__container">
      <h2>
        <span>{{ data.package.name }}</span>
        <small>v{{ data.package.version }}</small>
      </h2>
      <blockquote class="Pkg__text">{{ data.package.description }}</blockquote>

      <p class="Pkg__text">
        updated
        <timeago :since="data.package.date"></timeago>
        by
        <a
          target="_blank"
          :href="'//npmjs.com/~' + data.package.publisher.username"
          class="Pkg__user">{{ data.package.publisher.username }}</a>
      </p>
    </div>

    <div class="Pkg__toolbar">
      <i
        v-show="hover || isStar"
        :class="[isStar ? 'icon-star' : 'icon-unstar']"
        @click.stop="starPkg"
        class="iconfont"></i>
    </div>
  </div>
</template>

<script>
  import gradient from '@/utils/gradient'

  const colors = gradient('#f66', '#4fc08d', 100)

  export default {
    name: 'Pkg',

    props: ['data'],

    data: () => ({
      hover: false
    }),

    computed: {
      score() {
        return parseInt((this.data.score.final || 0) * 100, 10)
      },

      isStar() {
        return Boolean(this.$store.state.collects.find(pkg => pkg.name === this.data.package.name))
      }
    },

    created() {
      this.colors = colors
    },

    methods: {
      starPkg() {
        const { name, version, description, date, publisher } = this.data.package

        if (this.isStar) {
          this.$store.commit('REMOVE_FROM_BOX', name)
        } else {
          this.$store.commit('ADD_TO_BOX', {
            name,
            version,
            description,
            date,
            publisher,
            score: this.store
          })
        }
      }
    }
  }
</script>

<style>
  .Pkg {
    display: flex;
    align-items: center;
    padding: 20px;

    &__toolbar {
      position: absolute;
      right: 10px;
      top: 10px;

      .iconfont {
        font-size: 14px;
        cursor: pointer;
        padding: 10px 0 10px 10px;
      }

      .icon-star {
        color: #ffc107;
      }
    }

    &__text {
      color: #9CA3A9;
    }

    &__score {
      position: relative;
      height: 30px;
      margin-right: 20px;

      .iconfont {
        font-size: 28px;
      }

      span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
    }

    &__container {
      flex: 100%;
    }

    h2 {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 6px;
    }

    small {
      font-weight: lighter;
      font-style: italic;
    }

    blockquote {
      font-size: 14px;
      margin-bottom: 6px;
    }
  }
</style>
