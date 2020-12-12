<template>
  <div class="article-list">
    文章列表组件
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {}
  },
  prop: {
    channel: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped></style>
