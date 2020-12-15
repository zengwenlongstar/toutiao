<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 宫格组件 -->
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channels, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channels, index)"
      >
        <van-icon
          v-show="isEdit && !fixdChlnne.includes(channels.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <div :class="{ active: index === active }" slot="text" class="text">
          {{ channels.name }}
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 宫格组件 -->
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        icon="plus"
        :key="index"
        :text="channel.name"
        @click="onAddchannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixdChlnne: [0]
    }
  },
  computed: {
    // 计算属性会观测内部依赖数据的变化
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(channel => {
        // find 遍历数组，找到满足条件的元素项
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // 如果我的频道中不包括该频道项，则收集到推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      // 把计算结果返回
      return channels
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        console.log('失败')
      }
    },
    onAddchannel (channel) {
      this.myChannels.push(channel)
    },
    onMyChannelClick (channels, index) {
      if (this.isEdit) {
        if (this.fixdChlnne.includes(index)) {
          return
        }
        if (index <= this.active) {
          this.$emit('updata-active', this.active - 1)
        }
        this.myChannels.splice(index, 1)
      } else {
        this.$emit('updata-active', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  /deep/.edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .title-text {
    font-size: 32px;
    color: #333;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}
</style>
