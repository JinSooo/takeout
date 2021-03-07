import axios from 'axios'

// 默认配置为/api 相当于 http://localhost:4000/
// 新建一个axios实例用于mock接口使用
const axiosMock = axios.create({
  baseURL: '',
})

/**
 * get请求
 * @param url     请求api地址
 * @param params  请求参数    {}
 */
export function get(url: string, params: object = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * post请求
 * @param url   请求api地址
 * @param data  请求数据
 */
export function post(url: string, data: object) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 用于Mock请求
 * @param url     请求api地址
 */
export function getMock(url: string) {
  return new Promise((resolve, reject) => {
    axiosMock
      .get(url)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
