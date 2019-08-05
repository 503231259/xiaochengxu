
// 
export const getStorage = async function (key) {
  await wx.getStorage({
    key: key,
    success (res) {
      console.log(aaa)
    }
  })
}