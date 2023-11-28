/* 功能：接收一个参数 url 和一个数据 data */
/* 帮助发送请求 */
import axios from 'axios'

/* 创建 axios 的实例 */
const instance = axios.create({
  /* 会自动拼接到 你发送的 url 上 */
  /* baseURL: 'https://www.fastmock.site/mock/b5307d7ad5164e9852039901c9e4718f/weixin', */
  baseURL: 'http://localhost:3000',
  /* 允许携带 cookie */
  withCredentials: true,
  timeout: 10000
})

const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }
    ).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default post
export { get }
