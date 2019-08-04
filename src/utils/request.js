// 封装mpvue.request()
export default function (canshu) {
  // canshu是一个对象 {url , method, query}
 
  let url = 'https://www.zhengzhicheng.cn' + canshu.url // 设置基础路径
  let method = canshu.method || 'get' // 设置发送请求的方式
  let data = canshu.data || null // 设置有没有参数
  // 函数中返回promise
  return new Promise((resolve, reject) => {
    // 加载状态
    mpvue.showLoading({
      title: '玩命加载中',
    })
    // 请求
    mpvue.request({
      url,
      method,
      // 携带的参数
      data,
      // 请求成功
      success (info) {
        // console.log(info)
        resolve(info.data)
        // 结束加载状态
        mpvue.hideLoading()
      },
      // 请求失败
      // fail (err) {
      //   reject(err)
      // }
    })
  })
}