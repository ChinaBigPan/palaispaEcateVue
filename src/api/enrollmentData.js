// 获取各个页面的数据
import jsonp from '../common/js/jsonp';
import axios from 'axios';

// 基础URL
const BASEURL = "http://h5.palalife.com/Public/palalife/palaispaEcateVue/";

/**
 * 获取enrollment页面的数据
 */
export function getEnrollment() {
  let picSubURL = "enrollment.php";
  let url = BASEURL + picSubURL;
  // 居然忘了这里的return，妈的智障
  return jsonp(url);
}