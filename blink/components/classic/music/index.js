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
    musicSrc: "https://dl.stream.qqmusic.qq.com/C400004cc3OU0GLJHb.m4a?guid=8247794097&vkey=13B492138E69021B804E55C8D4DAB26F77347A80E54C04C6BC9BD04DB8EFA218DB583BF129FBBA492CCC96AC040BB3F8EE255A2AC91A0918&uin=2461927976&fromtag=66"
  },

  lifetimes: {
    attached: function () {
      this._recoverStatus()
      this._monitorSwitch()
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