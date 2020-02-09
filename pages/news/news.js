// pages/news/news.js
var news = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperImg: [
      {
        id: "1",
        pic: "/images/fake.png",
        title: "1"
      },
      {
        id: "2",
        pic: "/images/fake.png",
        title: "2"
      },
      {
        id: "3",
        pic: "/images/fake.png",
        title: "3"
      },
      {
        id: "4",
        pic: "/images/fake.png",
        title: "4"
      }
    ],
    newsList: []
  },

  getNews: function() {
    news = [];
    var that = this;
    wx.showLoading({
      title: '正在获取新闻',
    });
    wx.request({
      url: 'https://api.jisuapi.com/news/get?',
      data: {
        channel: "头条",
        start: "0",
        num: "50",
        appkey: "a2c51ac0c802dbf3"
      },
      success: function (res) {
        var newsArray = res.data.result.list;
        // console.log(newsArray);
        newsArray.forEach(function (item) {
          news.push({
            title: item.title,
            time: item.time,
            pic: item.pic,
            src: item.src,
            url: item.weburl,
            content: item.content
          });
        });
        console.log(news);
        that.setData({
          newsList: news,
          swiperImg: news.slice(0, 4)
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
      },
      fail: function (res) {
        console.log(res.errMsg);
        wx.hideLoading();
        wx.showToast({
          title: '无法加载新闻',
          icon: "none",
          duration: 1000
        })
      }
    })
  },
  showDetail: function(e) {
    let id = e.currentTarget.id;
    console.log(id);
    // console.log(news[id].content);
    wx.setStorage({
      key: id,
      data: news[id].content,
    });
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("news.js: onLoad");
    this.getNews();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("news.js: onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("news.js: onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("news.js: Refreash")
    this.getNews();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("news.js: onReachBottom");
    wx.showToast({
      title: '没有更多啦',
      icon: "none",
      duration: 500
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})