<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .video-component
    position fixed
    z-index 9999
    top 0
    left -60px
    right 0
    bottom 0
    // 视频遮罩层
    .mask 
      width 200%
      height 200%
      background rgba(0,0,0,.6)
      position fixed
      top 0
      z-index 8000
    // 视频播放区块
    .videoBlock
      position relative
      z-index 9000
      width 800px
      height 400px
      margin 15% auto
      // 关闭按钮
      .close 
        position absolute
        top -30px
        left 0
        color $white
        i 
          font-size 30px
          color $white

</style>

<template>

  <div v-show="isShow" class="video-component">
    <div class="videoBlock">
      <div @click.stop.prevent="closeVideo" class="close"><i class="icon-close"></i></div>
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
  computed: {},
  methods: {
    // 测试下传过来的props
    _showProps() {
      setTimeout(function() {
        console.log(this.isShow);
        console.log(this.currentVideo);
        console.log(this.currentVideoPoster);
      }, 20); 
    },
    // 关闭视频
    closeVideo() {
      this.$emit('closeVideo');
    }
  },
  components: {
    myVideo
  }
}
</script>
