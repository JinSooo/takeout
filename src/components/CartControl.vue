<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click.stop="updateCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{ food.count }}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateCount(true)"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, inject } from 'vue'
export default defineComponent({
  name: 'CartControl',
  props: ['food'],
  setup(prop) {
    const cart = toRef(inject<any>('store'), 'cart')
    const food = toRef(prop, 'food')
    /* **************************************************************************************** */
    const updateCount = (flag: boolean) => {
      if (!food.value.count) food.value.count = 1
      else if (food.value.count > 0) food.value.count += flag ? 1 : -1
      const index = cart.value.indexOf(food.value)
      if (index != -1) {
        if (food.value.count === 0) return cart.value.splice(index, 1)
      } else {
        // 添加到cart中的food是响应式的数据所以不需要变化count值，food会自己改变
        cart.value.push(food.value)
      }
    }

    return {
      updateCount,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import "../assets/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter-from, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
