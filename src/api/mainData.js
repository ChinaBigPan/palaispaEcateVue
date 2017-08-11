// 获取main.js的数据
import jsonp from '../common/js/jsonp';
import axios from 'axios';

// 基础URL
const BASEURL = "http://h5.palalife.com/Public/palalife/palaispaEcateVue/";

// 获取首页轮播图的数据
export function getMainSlider() {
  let picSubURL = "main.php";
  let url = BASEURL + picSubURL;
  // 居然忘了这里的return，妈的智障
  return jsonp(url);
}

// 获取精神荣誉页的图片数据
export function getBrandSpiritPic() {
  let picSubURL = "brandSpirit.php";
  let url = BASEURL + picSubURL;
  return jsonp(url);
}

// 获取历史积淀页的图片和文字
export function getHistory() {
  let picSubURL = "timeLine.php";
  let url = BASEURL + picSubURL;
  return jsonp(url);
}

// 获取宣传视频
export function getVideo() {
  let picSubURL = "video.php";
  let url = BASEURL + picSubURL;
  return jsonp(url);
}