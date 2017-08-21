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
      background rgba(0,0,0,.8)
      position fixed
      top 0
      z-index 8000
    // 视频播放区块
    .videoBlock
      position fixed
      z-index 9000
      width 960px
      height 540px
      top 100px
      left 32px
      // 关闭按钮
      .videoplayer
        width 100%
        height 100%
        position relative
        z-index 9050
      .close 
        position absolute
        top -30px
        left 0
        color $white
        i 
          font-size 25px
          color $white
          vertical-align sub
          padding-right 5px


</style>

<template>
  <div v-show="isShow" class="video-component">
    <div class="videoBlock">
      <div @click.stop.prevent="closeVideo" class="close"><i class="icon-close"></i>关闭</div>
      <video controls @click="pauseVideo" class="videoplayer" ref="videoplayer" :src="currentVideoProp" :poster="currentVideoPosterProp" autoplay="true" ></video>
    </div>
    <div class="mask"></div>
  </div> 
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex';

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
  data() {	
    return {}
  },
  computed: {},
  methods: {
    // 关闭视频
    closeVideo() {
      this.$emit('closeVideo');
      let player = this.$refs.videoplayer;
      player.pause();
      // 关闭显示视频
      this.setExhibitVideo(false);
    },
    // 暂停视频
    pauseVideo() {
      let player = this.$refs.videoplayer;
      if(player.paused) {
        player.play()
      } else {
        player.pause();
      }
    },
    // 引入vuex方法
    ...mapMutations({
      setExhibitVideo: 'SET_EXHIBITVIDEO'
    })
  },
  components: {}
}
</script>
