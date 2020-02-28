<!-- 消息组件 -->
<template lang="html">
  <div class="messages">
    <div v-for="(message, index) in messages" :key="index">
      <MessageBot v-if="message.type === 'bot'" :message="message" />
      <MessageUser v-if="message.type === 'user'" :message="message" />
      <MessageBotMusic v-if="message.type === 'botMusic'" :message="message" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageBot from './MessageBot'
import MessageUser from './MessageUser'
import MessageBotMusic from './MessageBotMusic'

export default {
  computed: mapState([
    'messages'
  ]),

  components: {
    MessageBot,
    MessageUser,
    MessageBotMusic
  }
}
</script>

<style lang="less" scoped>
.messages {
  background: #E8EBED;
  overflow-y: auto;
  padding-top: 20px;
  padding-bottom: 56px;
  padding-bottom: calc(56px + env(safe-area-inset-bottom));
  padding-bottom: calc(56px + constant(safe-area-inset-bottom));
}
</style>
