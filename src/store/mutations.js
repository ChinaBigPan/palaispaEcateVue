import * as types from './mutation-types';

const mutations = {
  // 设置是否刷新main页面的Scroll组件
  [types.SET_SHOULD_MAIN_SCROLL_REFRESH](state, shouldMainScrollRefresh) {
    state.shouldMainScrollRefresh = shouldMainScrollRefresh;
  },
  // 设置是否显示首页的推广页
  [types.SET_SHOW_POPULARIZE](state, showPopularize) {
    state.showPopularize = showPopularize;
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
  },
  // 设置是否展示护理详情
  [types.SET_SHOW_TREATMENT_DETAIL](state, showTreatmentDetail) {
    state.showTreatmentDetail = showTreatmentDetail;
  },
  // 设置护理详情侧边列表所显示的护理
  [types.SET_TREAT_DETAIL_ASIDE](state, treatDetailAside) {
    state.treatDetailAside = treatDetailAside;
  }
}

export default mutations;