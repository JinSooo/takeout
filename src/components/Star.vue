<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(item, index) in score" :key="index" :class="item"></span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'Star',
  props: {
    rating: Number,
    size: Number,
  },
  setup(props) {
    const rating = props.rating!
    const score = computed(() => {
      const arr = []
      let on = Math.floor(rating)
      let half = (rating * 10) % 10 >= 5 ? 1 : 0
      let off = 5 - on - half
      while (on--) arr.push('on')
      while (half--) arr.push('half')
      while (off--) arr.push('off')
      return arr
    })

    return {
      score,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixins.styl'
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('../assets/images/stars/star48_on')
      &.half
        bg-image('../assets/images/stars/star48_half')
      &.off
        bg-image('../assets/images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('../assets/images/stars/star36_on')
      &.half
        bg-image('../assets/images/stars/star36_half')
      &.off
        bg-image('../assets/images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('../assets/images/stars/star24_on')
      &.half
        bg-image('../assets/images/stars/star24_half')
      &.off
        bg-image('../assets/images/stars/star24_off')
</style>
