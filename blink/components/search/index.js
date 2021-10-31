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

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [{
      id: 1
    }],
    searching: false,
    q:""
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
        q:word
      })
      keywordModel.addToHistory(word)
    },
    onDelete(event) {
      this.setData({
        searching: false,
        q:''
      })
    }
  }
})