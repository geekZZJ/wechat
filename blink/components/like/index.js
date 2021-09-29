// components/like/index.js
Component({
  behaviors: [],

  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    }
  },

  data: {
    yesSrc: "../images/like.png",
    noSrc: "../images/like@dis.png"
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    onLike: function () {
      let like = this.properties.like
      let count = this.properties.count

      count = like ? count - 1 : count + 1
      this.setData({
        count,
        like: !like
      })

      // 自定义事件
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior
      }, {})
    },
  }
})