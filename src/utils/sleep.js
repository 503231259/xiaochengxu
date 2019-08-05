
// 函数停三秒
export default function (num) {
  return new Promise((resolt, reject) =>{
    setTimeout(function () {
      resolt()
    }, num * 1000)
  })
}