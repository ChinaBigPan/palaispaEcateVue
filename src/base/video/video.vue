<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .video-component
    position absolute
    z-index 9999
    top 0
    left 0
    right 0
    bottom 0
    .mask 
      width 100%
      height 100%
      background rgba(0,0,0,.3)

</style>

<template>
  <div v-if="isShow" class="video-component">
    <div class="close"></div>
    <div class="videoBlock">
      <my-video :sources="video.sources" :options="video.options"></my-video>
    </div>
    <div class="mask"></div>
  </div> 
</template>

<script type="text/ecmascript-6">
import myVideo from 'vue-video'

export default {
  name: 'video',
  props: {
    // 是否显示视频区块
    isShow: {
      type: Boolean,
      default: false
    },
    // 视频地址
    currentVideoProp: {
      type: String,
      default: ''
    },
    // 视频图片地址
    currentVideoPosterProp: {
      type: String,
      default: ''
    }
  },
  updated() {
    this._showProps()
  },
  data() {	
    return {
      video: {
        sources: [{
          src: this.currentVideoProp,
          type: 'video/mp4'
        }],
        options: {
          autoplay: true,
          volume: 0.6,
          poster: this.currentVideoPosterProp
        }
      }
    }
  },
  methods: {
    // 测试下传过来的props
    _showProps() {
      // setTimeout(function() {
      //   console.log(this.isShow);
      //   console.log(this.currentVideo);
      //   console.log(this.currentVideoPoster);
      // }, 20); 
    }
  },
  components: {
    myVideo
  }
}
</script>
