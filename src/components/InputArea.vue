<!-- 输入框组件 -->
<template lang="html">
  <div class="inputarea" :class="{ focus: focus }" ref="inputarea">
    <input
      v-model="question"
      type="text"
      class="input"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter.prevent="handleSend"
    >
    <img @click="handleSend" class="send" :src="sendImage" alt="">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { translate } from '@/api'
import { pageScrollToBottom } from '@/utils/util'

export default {
  data () {
    return {
      question: '', // 用户问题
      focus: false
    }
  },

  computed: mapState({
    systemInfo: 'systemInfo',
    sendImage () {
      if (this.question.trim()) {
        return require('../assets/send-active.png')
      } else {
        return require('../assets/send.png')
      }
    }
  }),

  methods: {
    // 输入框聚焦
    async handleFocus () {
      // 解决在 iPhone 上第三方输入法键盘遮挡输入框的问题
      setTimeout(function () {
        document.querySelector('.inputarea').scrollIntoView(true)
      }, 200)

      this.focus = true

      pageScrollToBottom()
    },

    // 输入框失焦
    handleBlur () {
      this.focus = false

      pageScrollToBottom()
    },

    // 点击发送按钮
    async handleSend () {
      const question = this.question.trim()

      // 问题为空不发送
      if (!question) {
        return
      }

      // 软键盘弹起时可视区域高度小于初始可视区域高度，激活输入框保持键盘弹起状态
      if (window.innerHeight < this.systemInfo.innerHeight) {
        document.querySelector('.input').focus()
      }

      // 清空输入框
      this.question = ''

      // 问题显示在页面中
      this.$store.dispatch('pushMessage', {
        type: 'user',
        content: question
      })

      const res = await translate({ msg: question })
      if (res.status === 200) {
        if (res.data.answer_type === 'music') {
          this.$store.dispatch('pushMessage', {
            type: 'botMusic',
            content: res.data.answer,
            music: res.data.msg[0]
          })
        } else if (res.data.answer_type === 'text') {
          this.$store.dispatch('pushMessage', {
            type: 'bot',
            content: res.data.answer
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inputarea {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  padding: 10px 12px;
  display: flex;
  height: 56px;
  height: calc(56px + env(safe-area-inset-bottom));
  height: calc(56px + constant(safe-area-inset-bottom));

  &.focus {
    height: 56px !important;
  }
}

.input {
  height: 36px;
  width: 100%;
  border-radius: 36px;
  outline: none;
  border: none;
  background: #E8EBED;
  padding: 0 18px;
  font-size: 15px;
}

.send {
  display: inline-block;
  min-width: 36px;
  height: 36px;
  margin-left: 8px;
}
</style>
