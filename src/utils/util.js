/**
 * 同步方式等待指定时间, 使用示例 await sleep(1000)
 * @param {Number} ms 等待多长时间，单位毫秒
 */
export function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 是否 iPhone X 系列机型
export function isIPhoneX () {
  if (screen.width === 375 && screen.height === 812) {
    // iPhone X, iPhone Xs
    return true
  } else if (screen.width === 414 && screen.height === 896) {
    // iPhone XR, iPhone Xs MAX
    return true
  } else {
    return false
  }
}

// 是否在 Safari 浏览器中
export function isSafari () {
  const userAgent = window.navigator.userAgent
  const safari = /iphone.+mobile.+safari/i.test(userAgent)
  return safari
}

// 滚动到消息最底部
export async function pageScrollToBottom () {
  await sleep(200)

  // 读取message高度并滚动到底部
  const scrollTop = document.querySelector('.messages').clientHeight

  // 判断是否支持scrollTo方法，如果不支持则用scrollTop代替
  // 目前已知的是edge浏览器，企业微信和微信PC端内嵌浏览器不支持scrollTo方法
  // 因为内置浏览器内核采用的是老版本chrome内核
  if (typeof document.body.scrollTo === 'function') {
    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  } else {
    window.scrollTop = scrollTop
  }
}
