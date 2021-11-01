// components/search/index.js
import {
  KeywordModel
} from "../../models/keyword"

const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    noneResult:false,
    historyWords: [],
    hotWords: [],
    dataArray: [{
        id: 1
      },
      {
        id: 2
      }, {
        id: 3
      }, {
        id: 4
      }, {
        id: 5
      },
      {
        id: 6
      },{
        id: 7
      }
    ],
    searching: false,
    q: ""
  },

  attached() {
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords,
      hotWords
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取更多数据
    loadMore() {
      console.log(1111)
    },
    onCancel(event) {
      this.triggerEvent("cancel", {}, {})
    },
    onConfirm(event) {
      const word = event.detail.value || event.detail.text
      if (!word) {
        return
      }
      this.setData({
        searching: true,
        q: word
      })
      keywordModel.addToHistory(word)
    },
    onDelete(event) {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})