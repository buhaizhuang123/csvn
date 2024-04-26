<template>
  <div>
    <video
      id="my-video"
      class="video-js"
      controls
      preload="auto"
      width="640"
      height="264"
      :poster="videoTitleImg"
      data-setup="{}"
      ref="videoPlayer"

    >
      <source :src="videoSrc" type="video/mp4"/>
      <source src="MY_VIDEO.webm" type="video/webm"/>
      <div class="video-progress" @mousedown="onProgressMouseDown">
        <div class="video-played" ref="progressBar"></div>
      </div>
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a
        >
      </p>
    </video>


  </div>
</template>

<script>
import videoJs from 'video.js'

export default {
  props: {
    videoTitleImg: '',
    videoSrc: ''
  },
  data () {
    return {
      dragging: false
    }
  },
  methods: {
    // onProgressMouseDown (event) {
    //   this.dragging = true
    //   this.startX = event.clientX
    //   this.startTime = this.player.currentTime()
    //   document.addEventListener('mousemove', this.onProgressMouseMove)
    //   document.addEventListener('mouseup', this.onProgressMouseUp)
    // },
    // onProgressMouseMove (event) {
    //   if (this.dragging) {
    //     console.log('xxxxx', event, 'progressBar', this.$refs.progressBar.parentNode)
    //     const deltaX = event.clientX - this.startX
    //     const ratio = deltaX / this.$refs.progressBar.parentNode.offsetWidth
    //     const newTime = this.startTime + ratio * this.player.duration()
    //     this.player.currentTime(newTime)
    //   }
    // },
    // onProgressMouseUp () {
    //   this.dragging = false
    //   document.removeEventListener('mousemove', this.onProgressMouseMove)
    //   document.removeEventListener('mouseup', this.onProgressMouseUp)
    // }
  },
  mounted () {

    this.player = videoJs(this.$refs.videoPlayer)

    // 监听进度条拖动事件
    this.player.on('timeupdate', (time) => {
      if (this.player.userActive()) {
        // 用户正在拖动进度条
        // 可以在这里执行你需要的操作
      }
    })
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>
<style scoped>
.video-progress {
  position: relative;
  width: 100%;
  height: 5px;
  background-color: #e5e5e5;
  cursor: pointer;
}

.video-played {
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #3e8f3e;
}
</style>
