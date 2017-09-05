import _ from 'lodash';

// 各种工具方法
/**
 * 判定一下护理时间，如果是数字则返回“数字+分”，如果是字符串则直接返回
 * @param {护理时间} duration 
 */
export function judgeDuration(duration) {
  let isNumber = _.isNumber(duration);
  if (isNumber) {
    return `${duration} 分`
  } else {
    return duration
  }
}

/**
 * 合并多个数组
 * @param {被连接的数组} array 
 * @param {连接的数组} targetArray 
 */
export function concatArrays(array, ...targetArray) {
  return _.concat(array, ...targetArray)
}

/**
 * 处理字符串为空时的会员卡数据，以及对1和0的处理
 * @param {会员卡数据} data
 */
export function formatMembershipData(data) {
  let isNumber = _.isNumber(data);
  if (!data || (isNumber && data === 0)) {
    return "—"
  } else if (isNumber && data === 1) {
    return "有"
  } else {
    return data
  }
}

/**
 * 判定数组中的值是否是undefined
 * @param {数组中的值} value
 */
export function isValueUndefined(value) {
  let isUndefined = _.isUndefined(value);
  return isUndefined;
}