// 获取各个页面的数据
import jsonp from '../common/js/jsonp';
import axios from 'axios';

// 基础URL
const BASEURL = "http://h5.palalife.com/Public/palalife/palaispaEcateVue/";

// 获取门店数据
export function getStoreData() {
  let storeSubURL = "storeVue.php";
  let url = BASEURL + storeSubURL;
  return jsonp(url);
}