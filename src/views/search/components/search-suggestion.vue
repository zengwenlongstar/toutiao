<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in Suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div
    ></van-cell>

    <div v-html="htmlStr"></div>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      Suggestions: [],
      htmlStr: ''
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.Suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="actve">${this.searchText}</span`
      const reg = new RegExp(this.searchText, 'gi')
      text.replace(reg, highlightStr)
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/span.actve {
    color: #3296fa;
  }
}
</style>
