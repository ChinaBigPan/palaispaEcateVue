// jsonp组件的封装，从而获取Promise格式
import originJsonp from 'jsonp'

// export const options = {
//   param: 'callback',
//   prefix: '__jp'
// }

// 向外部暴露一个方法，名字就叫jsonp
export default function jsonp(url, data) {
  return new Promise((resolve, reject) => {       
    originJsonp(url, (err, data) => {
     if (!err) {
       resolve(data)
     } else {
       reject(err)
     }
    })
  })
};