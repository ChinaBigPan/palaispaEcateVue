// dom操作用的工具方法

/**
 * 获得自定义的"data-"属性
 * @param {Dom元素} el 
 * @param {自定义属性名} name 
 * @param {设置值} val 
 */
export function getSelfDefinedProperty(el, name, val) {
  let prefix = "data-";
  if(val) {
    return el.setAttribute(prefix + name, val);
  }
  return el.getAttribute(prefix + name)
}

// CSS前缀处理
let elementStyle = document.createElement('div').style;

// 自执行获取厂商前缀
let vendor = (() => {
  // 主要浏览器厂商
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    // 判定是否存在
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

/**
 * 为CSS添加前缀
 * @param {需要添加前缀的样式} style 
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
