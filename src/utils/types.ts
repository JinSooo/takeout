// 通过用户名进行登录
export interface loginByNameInterface {
  username: string
  password: string
  captcha: string
}
// 通过手机号进行登录
export interface loginByPhoneInterface {
  phone: string
  code: string
}
