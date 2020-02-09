// pages/detial/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes: "",
    content: ""
  },

  saveData: function(id) {
    var that = this;
    wx.getStorage({
      key: id,
      success: function (res) {
        var content = res.data;
        content = content.replace(/\<img/gi, '<img style="max-width:96%;display:block;height:auto;margin:0.4rem 2%;"');
        console.log(content);
        that.setData({
          content: content
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("detail.js: onLoad.");
    var id = options.id;
    this.saveData(id);
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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