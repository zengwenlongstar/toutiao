<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localGender = this.localGender
        console.log(this.localGender)
        const { data } = await updateUserProfile({ gender: localGender })
        console.log(data)
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更改失败')
      }
    },
    onPickerChange (pick, value, index) {
      this.localGender = index
      console.log(this.localGender)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-picker__cancel {
  color: #2892ff;
}
/deep/.van-picker__confirm {
  color: #2892ff;
}
</style>
