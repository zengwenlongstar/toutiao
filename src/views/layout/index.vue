<template>
  <div class="login-container">
    <van-tabbar class="lay-out">
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span></van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video"
        ><i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my"
        ><i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .lay-out {
    i.toutiao {
      font-size: 40px !important;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
