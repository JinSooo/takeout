<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{ on: loginWay }" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{ on: !loginWay }" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="loginInfo.phone" />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ rightPhone: rightPhone && captchaTime === 0 }"
                @click.prevent="getCaptcha"
              >
                {{ captchaTime ? `已发送(${captchaTime}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="loginInfo.code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="loginInfo.username" />
              </section>
              <section class="login_verification">
                <input
                  :type="switchBtn ? 'text' : 'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="loginInfo.password"
                />
                <div class="switch_button" :class="switchBtn ? 'on' : 'off'" @click="switchBtn = !switchBtn">
                  <div class="switch_circle" :class="{ showPwd: switchBtn }"></div>
                  <span class="switch_text">{{ switchBtn ? 'on' : 'off' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="loginInfo.captcha" />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="updateCaptcha"
                  ref="captchaImgRef"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goBack">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
  <Message :msg="msgContent" @closeMessage="msgVisible = false" v-if="msgVisible" />
</template>

<script lang="ts">
import router from '@/router'
import { loginByPhone, sendCaptcha, loginByName } from '@/utils/api'
import { defineComponent, ref, computed, reactive, inject, onMounted } from 'vue'
export default defineComponent({
  name: 'Login',
  setup() {
    const Store: any = inject('store')
    // 登录的方式 true:短信登录  false:密码登录
    const loginWay = ref(true)
    // 验证时间
    const captchaTime = ref(0)
    // 是否显示密码
    const switchBtn = ref(false)
    // 提示框显示
    const msgVisible = ref(false)
    // 提示框内容
    const msgContent = ref('')
    // 验证码图片元素
    const captchaImgRef = ref()
    // 登录信息对象
    const loginInfo = reactive({
      // 手机号
      phone: '',
      // 手机验证码
      code: '',
      // 用户名
      username: '',
      // 密码
      password: '',
      // 图片验证码
      captcha: '',
    })
    // 定时器id
    let timerId = 0
    /* **************************************************************************************** */
    // 判断手机号是否有误
    const rightPhone = computed(() => /^1\d{10}$/.test(loginInfo.phone))
    /* **************************************************************************************** */
    const goBack = () => {
      router.back()
    }
    // 显示提示框
    const showMsg = (txt: string) => {
      msgVisible.value = true
      msgContent.value = txt
    }
    // 获取验证码
    const getCaptcha = () => {
      // 判断是否可以发送验证码
      if (!captchaTime.value) {
        captchaTime.value = 30
        timerId = setInterval(() => {
          captchaTime.value--
          if (!captchaTime.value) clearInterval(timerId)
        }, 1000)
        sendCaptcha(loginInfo.phone).then((res: any) => {
          if (res.code === 1) {
            captchaTime.value = 0
            clearInterval(timerId)
            return showMsg(res.msg)
          }
        })
      }
    }
    // 更新验证码
    const updateCaptcha = () => {
      // 每次指定的src不一样不然不会改变
      captchaImgRef.value.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
    // 登录
    const login = async () => {
      // 前端判断
      // 响应结果
      let res: any = null
      if (loginWay.value) {
        if (!loginInfo.phone) return showMsg('请输入手机号')
        if (!rightPhone.value) return showMsg('请输入合法的手机号')
        if (!loginInfo.code) return showMsg('请输入手机验证码')
        res = await loginByPhone(loginInfo)
      } else {
        if (!loginInfo.username) return showMsg('请输入手机/邮箱/用户名')
        if (!loginInfo.password) return showMsg('请输入密码')
        if (!loginInfo.captcha) return showMsg('请输入图形验证码')
        res = await loginByName(loginInfo)
      }
      if (res.code === 1) {
        captchaTime.value = 0
        clearInterval(timerId)
        updateCaptcha()
        loginInfo.captcha = ''
        return showMsg(res.msg)
      }
      Store.userInfo = res.data
      console.log(Store)
      router.back()
    }

    onMounted(() => {
      // 每次进入更新验证码
      updateCaptcha()
    })

    return {
      captchaImgRef,
      goBack,
      loginWay,
      rightPhone,
      getCaptcha,
      captchaTime,
      switchBtn,
      showMsg,
      msgContent,
      msgVisible,
      loginInfo,
      login,
      updateCaptcha,
    }
  },
})
</script>

<style lang="stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              outline 0
              &.rightPhone
                color: #000
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.showPwd
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
          outline 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
