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
  storeDetail: {
    "name": "国贸店——商务DAY SPA新主张",
    "address": "北京市朝阳区建外大街1号国贸商城二期地下二层NB207商铺（冰场旁）",
    "phone": "010-65050552/0553",
    "code": "GROUPC80309145151797",
    "businessHours" : "10:00-22:00",
    "picture" : [
        "http://h5.palalife.com/Public/palalife/palaispaEcateVue/storePic/GROUPC80309145151797/0.jpg",
        "http://h5.palalife.com/Public/palalife/palaispaEcateVue/storePic/GROUPC80309145151797/1.jpg",
        "http://h5.palalife.com/Public/palalife/palaispaEcateVue/storePic/GROUPC80309145151797/2.jpg",
        "http://h5.palalife.com/Public/palalife/palaispaEcateVue/storePic/GROUPC80309145151797/3.jpg",
        "http://h5.palalife.com/Public/palalife/palaispaEcateVue/storePic/GROUPC80309145151797/4.jpg",
        "http://h5.palalife.com/Public/palalife/palaispaEcateVue/storePic/GROUPC80309145151797/5.jpg"
    ],
    "coordinate": [116.467459, 39.916524],
    "treatment": "M6KS，3-MAX，ICOONE，微针，安图，柔光脱毛，美甲，接待男宾，免费wifi",
    "description": "在目光与时尚汇聚的国贸，贝黎诗国贸百合店全新绽放。花开有声，恰如梦想在流淌。大理石的纹路交汇绵延，掩映绢花，似在倾诉一段写意的十四行诗。漫步入内，优雅的陈列与柔和的光线相得益彰，不经意间，尽是英伦风情的知性与浪漫。在这呵护美丽的空间里，木色是恪守，金色是崇尚，蓝色是诚恳，灰色是钟情。忘记忧扰，逃离繁杂，开启一段纯粹的心灵旅程，感受保守质朴温度的爱与守护。在这里，时间似是停驻，每一份情感都沉淀为信仰，再难磨灭。"
  }
}

export default state;