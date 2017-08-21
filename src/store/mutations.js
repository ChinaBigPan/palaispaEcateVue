import * as types from './mutation-types';

const mutations = {
  // 设置当前播放的video
  [types.SET_VIDEO](state, video) {
    state.video = video;
  },
  // 设置当前播放的video poster
  [types.SET_VIDEOPOSTER](state, videoposter) {
    state.videoposter = videoposter;
  },
  // 设置是否播放视频
  [types.SET_EXHIBITVIDEO](state, exhibitVideo) {
    state.exhibitVideo = exhibitVideo;
  }
}

export default mutations;