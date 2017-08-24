import * as types from './mutation-types';

const mutations = {
  // 设置是否刷新main页面的Scroll组件
  [types.SET_SHOULD_MAIN_SCROLL_REFRESH](state, shouldMainScrollRefresh) {
    state.shouldMainScrollRefresh = shouldMainScrollRefresh;
  },
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
  },
  // 设置所选的护理详情
  [types.SET_SELECTED_TREATMENT](state, selectedTreatment) {
    state.selectedTreatment = selectedTreatment;
  }
}

export default mutations;