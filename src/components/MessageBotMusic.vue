<!-- 消息组件 机器人回复的音乐消息 -->
<template lang="html">
  <div class="">
    <div class="message-item">
      <img src="~@/assets/bot.png" alt="" class="avatar">
      <div class="content">
        {{ message.content }}
      </div>
    </div>
    <div class="message-item-music">
      <div class="top">
        <img class="cover" :src="message.music.pic_url" alt="">
        <div class="name">
          <div class="singer-name">{{ message.music.singer_name }}</div>
          <div class="song-name">{{ message.music.song_name }}</div>
        </div>
      </div>
      <div class="bottom">
        <i class="iconfont" :class="[isPlay ? 'icon-pause' : 'icon-play']" @click="handleControl" />
        <span class="time current">{{ currentTime | timeFormat }}</span>
        <div class="progress">
          <div class="indicator" :style="{ left: progress + '%' }"></div>
          <div class="front" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="time duration">{{ duration | timeFormat }}</span>
        <audio ref="audio" autoplay>
          <source :src="message.music.music_url" type="audio/ogg">
          <source :src="message.music.music_url" type="audio/mpeg">
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object
  },

  filters: {
    timeFormat: function (value) {
      const seconds = Math.ceil(value)
      let minute = Math.floor(seconds / 60)
      let second = seconds - minute * 60

      if (minute < 10) {
        minute = `0${minute}`
      } else {
        minute = String(minute)
      }

      if (second < 10) {
        second = `0${second}`
      } else {
        second = String(second)
      }

      return minute + ':' + second
    }
  },

  data () {
    return {
      audio: '', // audio 对象
      duration: 0, // 音频的长度（以秒计）
      currentTime: 0, // 音频中的当前播放位置（以秒计）
      playInterval: '', // 音频播放循环事件
      isPlay: true // 是否正在播放中
    }
  },

  computed: {
    // 播放进度，百分比
    progress () {
      return 100 * this.currentTime / this.duration
    }
  },

  mounted () {
    this.audio = this.$refs.audio

    // 音频加载需要一定的时间，在加载完成之前读取不到音频总长度
    // 开启 interval 读取音频 readyState，为 4 时清除 interval
    const interval = setInterval(() => {
      if (this.audio.readyState === 4) {
        this.duration = this.audio.duration
        this.startPlay()
        clearInterval(interval)
      }
    }, 100)
  },

  methods: {
    // 控制音频播放
    handleControl () {
      if (this.isPlay) {
        // 暂停播放，清除定时器
        this.audio.pause()
        clearInterval(this.playInterval)
      } else {
        // 继续播放，开启一个新的定时器
        this.startPlay()
      }

      this.isPlay = !this.isPlay
    },

    startPlay () {
      // 如果播放完了则重新播放
      if (this.currentTime === this.duration) {
        this.audio.currentTime = 0
      }

      this.audio.play()

      // 每隔 1 秒更新一次当前播放位置
      this.playInterval = setInterval(() => {
        this.currentTime = this.audio.currentTime

        // 当前播放位置和总时长相等时清空 interval
        if (this.currentTime === this.duration) {
          clearInterval(this.playInterval)
          this.isPlay = false
        }
      }, 1000)
    }
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

.message-item-music {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  margin-bottom: 20px;
  width: 100%;

  .top {
    display: flex;
    align-items: center;
    padding: 8px;
    background: #f9f9f9;
    border-radius: 12px 12px 0 0;
    color: #343434;

    .cover {
      display: inline-block;
      width: 64px;
      height: 64px;
      border-radius: 10px;
    }

    .name {
      margin-left: 12px;
    }

    .singer-name {
      font-size: 18px;
      margin-bottom: 4px;
    }

    .song-name {
      font-size: 14px;
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #efefef;
    border-radius: 0 0 12px 12px;

    .iconfont {
      color: #343434;
    }

    .time {
      font-size: 12px;
      color: #666;

      &.current {
        margin-left: 12px;
      }
    }

    .progress {
      width: 100%;
      height: 2px;
      background: #999;
      border-radius: 2px;
      margin: 0 12px;
      position: relative;

      .front {
        background: #3d82eb;
        height: 2px;
      }

      .indicator {
        height: 14px;
        width: 14px;
        border-radius: 50%;
        background: #3d82eb;
        position: absolute;
        transform: translateX(-50%);
        top: -6px;
      }
    }
  }
}
</style>
