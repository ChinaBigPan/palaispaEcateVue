<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"

  .video-list
    background $white
    padding-top 5px
    .video-item
      border-radius 2px
      box-shadow 0 0 2px 0 $palaispa-gray
      margin 10px
      padding 10px
      display flex
      .video-poster
        flex 0 0 281px
        width 281px
        height 204px
        border-radius 2px
      .video-desc-block
        flex 1
        margin-left 40px
        padding-top 5px
        .video-desc-list
          margin-top 10px
          line-height 1.5
          list-style-type disc

</style>

<template>
  <div class="promotionVideo">
    <ul class="video-list">
      <li class="video-item" v-for="(item, index) in video">
        <img @click="showVideo(item, videoPic[index])" class="video-poster" :src="videoPic[index]" :alt="index">
        <div class="video-desc-block">
          <h3 v-html="videoDesc[index].title"></h3>
          <ul class="video-desc-list">
            <li class="video-desc-item" v-for="description in videoDesc[index].desc">{{description}}</li>
          </ul>
        </div>
      </li>
    </ul>
    <promo-video :currentVideoProp="currentVideo" :currentVideoPosterProp="currentVideoPoster" :isShow="exhibitVideo"></promo-video>
  </div>
</template>

<script type="text/ecmascript-6">
import {getVideo} from '../../api/mainData.js'
import promoVideo from '../../base/video/video'

export default {
  name: 'promotionVideo',
  created() {
    this._getVideo();
  },
  data() {
    return {
      video: [],
      videoPic: [],
      videoDesc: [],
      currentVideo: '',
      currentVideoPoster: '',
      exhibitVideo: false
    }
  },
  methods: {
    // 获取视频数据
    _getVideo() {
      getVideo().then((res) => {
        this.video = res.videoUrl;
        this.videoPic = res.videoCover;
        this.videoDesc = res.videoDesc;
      })
    },
    // 显示视频
    showVideo(item, videoposter) {
      if(!event._constructed) {
        console.log(this.currentVideo);
        console.log(this.currentVideoPoster);
        this.currentVideo = item; 
        this.currentVideoPoster = videoposter;
        setTimeout(() => { 
          this.exhibitVideo = true;
        }, 200); 
      } 
    }
  },
  components: {
    promoVideo
  }
}
</script>
