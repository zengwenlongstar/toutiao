<template>
  <van-cell class="article-item" :to="'/article/' + article.art_id">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-item-images"
            :src="img"
            fit="cover"
          ></van-image>
        </div>
      </div>
      <div class="lable-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.pubdate | relativeTime }}</span>
        <span>{{ article.comm_count }} 评论</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    ></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  /deep/.right-cover {
    width: 232px;
    height: 146px;
  }
  .lable-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-left: 4px;
      }
      .cover-item-images {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
