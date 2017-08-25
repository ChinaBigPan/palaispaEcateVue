const state =  {
  // 首页的Scroll是否应当刷新
  shouldMainScrollRefresh: false,
  // 当前播放的视频
  video: '',
  // 当前播放的视频的封面图
  videoposter: '',
  // 是否展示视频
  exhibitVideo: false,
  // 所选择的护理的详情
  selectedTreatment: {},
  // 是否展示护理详情
  showTreatmentDetail: false,
  // 护理详情的侧边列表所显示的护理
  treatDetailAside: {}
}

export default state;