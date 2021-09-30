// components/classic/music/index.js
import {
  classicBeh
} from "../classic-beh"
const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: "../../images/player@play.png",
    pauseSrc: "../../images/player@pause.png",
    playing: false,
    musicSrc: "https://dl.stream.qqmusic.qq.com/C400003LnSNo1ecdc3.m4a?guid=2741606664&vkey=0102E6D967AC7E262E17B9B819AE8D6A69DEFC2B57E69F065A81C672589EB0E26659C7AD24BA3E767BAADEA7B4958F164D85EC55353F2A00&uin=2461927976&fromtag=66"
  },

  lifetimes: {
    attached: function () {
      this._recoverStatus()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function () {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.title = "试听音效"
        mMgr.src = this.data.musicSrc
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.data.musicSrc) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})