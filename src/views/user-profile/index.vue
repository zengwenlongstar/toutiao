<template>
  <div class="user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      class="page-nav-bar"
      title="个人信息"
    />
    <!-- 编辑头像 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" @click="$refs.file.click()" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isUpdataNameShow = true"
      :value="user.name"
      is-link
    />
    <van-cell
      title="性别"
      @click="isUpdataGenderShow = true"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isUpdataBirthdayShow = true"
      :value="user.birthday"
      is-link
    />

    <!-- 昵称弹框 -->
    <van-popup v-model="isUpdataNameShow" style="height:100%" position="bottom">
      <update-name
        v-if="isUpdataNameShow"
        @close="isUpdataNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 性别弹框 -->
    <van-popup v-model="isUpdataGenderShow" position="bottom">
      <update-gender
        v-if="isUpdataGenderShow"
        v-model="user.gender"
        @close="isUpdataGenderShow = false"
      />
    </van-popup>
    <!-- 日期弹框 -->
    <van-popup v-model="isUpdataBirthdayShow" position="bottom">
      <updata-birthday
        v-if="isUpdataBirthdayShow"
        v-model="user.birthday"
        @close="isUpdataBirthdayShow = false"
      />
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdataPhotoShow"
      style="height:100%"
      position="bottom"
    >
      <update-photo
        v-if="isUpdataPhotoShow"
        @updata-photo="user.photo = $event"
        @close="isUpdataPhotoShow = false"
        :img="img"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdataBirthday from './components/updata-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdataBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isUpdataNameShow: false,
      isUpdataGenderShow: false,
      isUpdataBirthdayShow: false,
      isUpdataPhotoShow: false,
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      console.log(data)
      this.img = data
      this.isUpdataPhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar .van-icon {
  color: #fff !important;
}
.avatar {
  width: 60px;
  height: 60px;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
