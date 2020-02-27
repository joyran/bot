<!-- 消息组件 用户发送的消息 -->
<template lang="html">
  <div class="message-item">
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
  flex-direction: row-reverse;

  .content {
    border-radius: 10px 2px 10px 10px;
    padding: 12px 16px;
    max-width: 70vw;
    background: #3d82eb;
    font-size: 15px;
    line-height: 23px;
    color: #FFFFFF;
  }
}
</style>
