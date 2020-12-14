<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="refreshSuccessText"
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false,
      refreshSuccessText: '更新成功'
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          timestamp: Date.now(),
          with_top: 1 // 是否包含置顶
        })

        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          timestamp: Date.now(),
          with_top: 1 // 是否包含置顶
        })
        const { results } = data.data
        this.list.unshift(...data.data.results)
        this.isreFreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
