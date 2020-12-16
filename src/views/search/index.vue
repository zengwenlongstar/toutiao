<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        background="#2892ff"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result :search-text="searchText" v-if="isResultShow" />
    <!-- 联想建议 -->
    <search-suggestion
      @search="onSearch"
      v-else-if="searchText"
      :searchText="searchText"
    />
    <!-- 搜索历史 -->
    <search-history
      @update-search-histories="searchHistories = []"
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
      console.log(this.searchHistories)
    },
    onCancel (onCancel) {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  //   padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
