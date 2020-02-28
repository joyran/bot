<template>
  <div id="app" @click="handleClick">
    <Message />
    <InputArea />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Message'
import InputArea from '@/components/InputArea'

export default {
  components: {
    Message,
    InputArea
  },

  computed: mapState([
    'systemInfo'
  ]),

  created () {
    // 系统相关参数
    const systemInfo = {
      innerHeight: window.innerHeight
    }

    this.$store.commit('initSystemInfo', systemInfo)

    // 欢迎语
    this.$store.dispatch('pushMessage', {
      type: 'bot',
      content: '我是可盐可甜的然然，我什么都知道，不信你可以问我世界首富是谁，还可以听一首追光者'
    })
  },

  methods: {
    handleClick () {
      document.querySelector('.inputarea').blur()
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
