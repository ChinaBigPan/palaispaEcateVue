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
      <li class="video-item" v-for="(item, index) in videoUrl">
        <img @click="showVideo(item, videoPic[index])" class="video-poster" :src="videoPic[index]" :alt="index">
        <div class="video-desc-block">
          <h3 v-html="videoDesc[index].title"></h3>
          <ul class="video-desc-list">
            <li class="video-desc-item" v-for="description in videoDesc[index].desc">{{description}}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {getVideo} from '../../api/mainData.js'
import {mapMutations} from 'vuex'

export default {
  name: 'promotionVideo',
  created() {
    this._getVideo();
  },
  data() {
    return {
      videoUrl: [],
      videoPic: [],
      videoDesc: [],
      currentVideo: '',
      currentVideoPoster: '',
      exhibitVideo: false
    }
  },
  computed: {},
  methods: {
    // 获取视频数据
    _getVideo() {
      getVideo().then((res) => {
        this.videoUrl = res.videoUrl;
        this.videoPic = res.videoCover;
        this.videoDesc = res.videoDesc;
      })
    },
    // 显示视频
    showVideo(item, videoposter) {
      if(!event._constructed) {
        this.currentVideo = item; 
        this.currentVideoPoster = videoposter;
        this.exhibitVideo = true;
        // 修改store数据，vuex真好用哇哈哈
        this.setVideo(this.currentVideo);
        this.setVideoPoster(this.currentVideoPoster);
        this.setExhibitVideo(this.exhibitVideo);
      } 
    },
    // 关闭视频
    closeVideo() {
      this.exhibitVideo = false;
    },
    // vuex方法引入
    ...mapMutations({
      setVideo: 'SET_VIDEO',
      setVideoPoster: 'SET_VIDEOPOSTER',
      setExhibitVideo: 'SET_EXHIBITVIDEO'
    })
  },
  components: {}
}
</script>
