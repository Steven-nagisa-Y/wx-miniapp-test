Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoList: [
      {
        id: "1",
        videoTitle: "【灵魂rap】如何让孩子爱上♂学习？",
        videoUrl: "https://dl.airocket.tech/files/【灵魂rap】如何让孩子爱上♂学习？.mp4"
      },
      {
        id: "2",
        videoTitle: "【名师rap】游戏不打不成才",
        videoUrl: "https://dl.airocket.tech/files/【名师rap】游戏不打不成才.mp4"
      }
    ],
    videoSrc: "", 
    danmuText: ""
  },

  playVideo: function(e) {
    this.videoCtx.stop();
    console.log(e.currentTarget.dataset.url);
    var url_ = e.currentTarget.dataset.url
    this.setData({
      videoSrc: url_,
    });
    this.videoCtx.play();
  },
  getDanmu: function(e) {
    console.log("video.js: 弹幕文字:" + e.detail.value);
    this.setData({
      danmuText: e.detail.value,
    });
  },
  sendDanmu: function(e) {
    let text = this.data.danmuText;
    this.videoCtx.sendDanmu({
      text: text,
      color: "yellow"
    });
    this.setData({
      danmuText: ""
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('videoPlay');
    this.setData({
      videoSrc: this.data.videoList[0].videoUrl,
    })
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
    console.log("video.js: onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("video.js: onHide");
    this.videoCtx.stop();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})