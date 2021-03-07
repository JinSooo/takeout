import { loginByNameInterface, loginByPhoneInterface } from './types'
import { get, getMock, post } from './ajax'

// [1、根据经纬度获取位置详情]
export const getAddress = (geohash: string) => get(`/position/${geohash}`)

// [2、获取食品分类列表]
export const getFoodCategories = () => get(`/index_category`)

// [3、根据经纬度获取商铺列表]
export const getShops = (latitude: string, longitude: string) => get(`/shops`, { latitude, longitude })

// [4、根据经纬度和关键字搜索商铺列表]
export const getShopsByName = (keyword: string, geohash: string) => get(`/search_shops`, { keyword, geohash })

// [5、获取一次性验证码]
export const getCaptcha = () => get('/captcha')

// [6、用户名密码登陆]
export const loginByName = (data: loginByNameInterface) =>
  post('/login_pwd', { username: data.username, password: data.password, captcha: data.captcha })

// [7、发送短信验证码]
export const sendCaptcha = (phone: string) => get('/sendcode', { phone })

// [8、手机号验证码登陆]
export const loginByPhone = (data: loginByPhoneInterface) => post('/login_sms', { phone: data.phone, code: data.code })

// [9、根据会话获取用户信息]
export const getUserInfo = () => get('/userinfo')

// [10、用户登出]
export const logout = () => get('/logout')

/**
 * mock 接口
 */

// 获取商品信息
export const getGoods = () => getMock('/goods')

// 获取评价信息
export const getRatings = () => getMock('/ratings')

// 获取商家信息
export const getInfo = () => getMock('/info')
