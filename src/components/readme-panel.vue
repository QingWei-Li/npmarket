<template>
  <div>
    <article
      v-if="html"
      :scrollTop.prop="scrollTo"
      class="ReadmePanel markdown-body"
      v-html="html">
    </article>
    <div
      class="ReadmePanel__empty"
      v-else>
      <img src="~@/assets/logo.png" alt="npmarket" class="logo">
      <p>More efficient search for node packages</p>
      <p class="author">Created by <a href="//github.com/qingwei-li">QingWei-Li</a> & <a href="//github.com/mirzazulfan">Mirza Zulfan</a></p>
    </div>
  </div>
</template>

<script>
import markdown from '@/utils/markdown';

export default {
  name: 'ReadmePanel',

  props: ['content'],

  data: () => ({
    scrollTo: 0
  }),

  computed: {
    html() {
      this.scrollTo = 0;

      return markdown(this.content);
    }
  }
};
</script>

<style src="prismjs/themes/prism.css"></style>
<style src="github-markdown-css/github-markdown.css"></style>
<style>
.ReadmePanel {
  padding: 45px;
  box-sizing: border-box;

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

    .logo {
      width: 256px;
      margin-bottom: 30px;
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

iframe {
  outline: none;
  border: none;
  display: block;
  width: 100%;
  height: 306px;
}
</style>
