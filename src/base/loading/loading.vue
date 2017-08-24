<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: 16px
      color: $palaispa-gray
</style>

<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="读取数据中...">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'loading',
  data() {	
    return {}
  },
  props: {
    title: String,
    default: '正在载入...'
  },
  methods: {}
}
</script>
