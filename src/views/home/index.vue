<template>
  <div class="home-container">
    <!-- 搜索模块 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >
        搜索</van-button
      >
    </van-nav-bar>

    <!-- tab栏切换 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="palec"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: ''
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-icon {
  color: #fff !important;
}

.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset !important;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/ .channel-tabs {
  .van-tabs-wrap {
    height: 82px;
  }
  /deep/.van-tab {
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
  }
  /deep/.van-tab-active {
    color: #333 !important;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.9;
    i.toutiao {
      font-size: 33px;
      color: #000 !important;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100px;
      color: #000;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  .palec {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
}
</style>
