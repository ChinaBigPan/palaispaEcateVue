const state =  {
  // 首页的Scroll是否应当刷新
  shouldMainScrollRefresh: false,
  // 是否显示首页的推广页
  showPopularize: false,
  // 向首页推广区块传递的图片数组
  mainBannerGenerize: [],
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
  treatDetailAside: {},
  // 是否展示门店详情
  showStoreDetail: false,
  // 所选择的门店详情
  storeDetail: {}
}

export default state;