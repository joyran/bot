<!-- 消息组件 机器人回复的文本消息 -->
<template lang="html">
  <div class="message-item">
    <img src="~@/assets/bot.png" alt="" class="avatar">
    <div class="content">
      {{ message.content }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object
  }
}
</script>

<style lang="less" scoped>
.message-item {
  padding: 0 12px;
  margin-bottom: 20px;
  display: flex;

  .avatar {
    min-width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .content {
    border-radius: 2px 10px 10px 10px;
    padding: 12px 16px;
    max-width: 70vw;
    background: #fff;
    font-size: 15px;
    line-height: 23px;
    color: #333;
  }
}
</style>
