<template>
  <div id="app">
    <router-view />
    <h1>黑马头条</h1>
    <h2>我是你爹</h2>
    <i class="toutiao toutiao-shipin"></i>
    <van-button type="primary">Primary</van-button>
    <van-button type="info">Info</van-button>
    <van-button type="default">Default</van-button>
    <van-button type="danger">Danger</van-button>
    <van-button type="warning">Warning</van-button>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.box {
  width: 200px;
  height: 200px;
  background-color: red;
}
</style>
