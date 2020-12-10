<template>
  <div class="login-container">
    <!-- 登录模块 -->
    <van-nav-bar class="page-nav-bar " title="登录" />
    <!-- 表单模块 -->
    <van-form @submit="onSubmit" ref="loginFrom">
      <van-field
        v-model="user.mobile"
        name="mobile"
        left-icon="smile-o"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        :rules="userFormRules.code"
        v-model="user.code"
        name="code"
        type="number"
        maxlength="6"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            @click="onSendSms"
            class="send-sms-btn"
            size="small"
            round
            type="default"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="warning" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        model: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })
      try {
        const { data } = await login(user)
        console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginFrom.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isCountDownShow = true
      try {
        await sendSms(this.user.mobile)
        console.log('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast.success('发送验证码频繁，请稍后重试')
        } else {
          console.log('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.toutiao {
  font-size: 37px;
  color: #ff8c00;
}
.send-sms-btn {
  background-color: #ff8c00 !important;
  width: 160px;
  height: 46px;
  line-height: 46px;
  font-size: 22px !important;
  color: #fff;
}
.login-btn-wrap {
  padding: 53px 33px;
}
</style>
