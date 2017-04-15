<template>
  <article
    :scrollTop.prop="scrollTo"
    class="ReadmePanel markdown-body"
    v-html="html">
  </article>
</template>

<script>
  import markdown from '@/utils/markdown'

  export default {
    name: 'ReadmePanel',

    props: ['content'],

    data: () => ({
      scrollTo: 0
    }),

    computed: {
      html() {
        this.scrollTo = 0

        return markdown(this.content)
      }
    }
  }
</script>

<style src="prismjs/themes/prism.css"></style>
<style src="github-markdown-css/github-markdown.css"></style>
<style>
  .ReadmePanel {
    padding: 45px;
    box-sizing: border-box;
  }

  iframe {
    outline: none;
    border: none;
    display: block;
    width: 100%;
    height: 306px;
  }
</style>
