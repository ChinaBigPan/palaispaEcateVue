// 获取各个页面的数据
import jsonp from '../common/js/jsonp';
import axios from 'axios';

// 基础URL
const BASEURL = "http://h5.palalife.com/Public/palalife/palaispaEcateVue/";

// 获取皮肤测试数据
export function getSkintestData() {
  let skintestSubURL = "skintest.php";
  let url = BASEURL + skintestSubURL;
  return jsonp(url);
}