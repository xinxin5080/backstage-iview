import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// axios拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config)

  // 获取传递过来的token
  let token = localStorage.getItem('mytoken')
  // 判断有无token
  if (token) {
  // 将其实在进请求头
    config.headers.Authorization = token
    console.log(config)
  } else {

  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export const Login = obj => {
  return axios.post('/login', obj)
}
