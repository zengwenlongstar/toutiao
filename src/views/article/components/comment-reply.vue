<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon @click="$emit('close')" slot="left" name="cross" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <comment-item :comment="comment" />
      <!-- 评论回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :list="commentList" type="c" :source="comment.com_id" />
    </div>
    <!-- 当前评论项 -->
    <!-- 发表评论 -->
    <div class="post-wrap">
      <van-button
        @click="isPostShow = true"
        class="write-btn"
        round
        size="small"
        >写评论</van-button
      >
    </div>
    <!-- 评论框 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (data) {
      console.log(data)

      this.comment.reply_count++

      // 关闭弹层
      this.isPostShow = false
      console.log(11)

      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar .van-icon {
  color: #1989fa !important;
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
