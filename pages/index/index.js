// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["北京市", "北京市", "朝阳区"],
    weatherImag: "/images/999.png",
    temper: "-",
    shiDu: "-",
    qiYa: "-",
    nengJianDu: "-",
    fengSu: "-",
    fengXiang: "-",
    fengLi: "-",
    updateTime: "",
    code: "100"
  },

  regionChanged: function(e) {
    console.log(e.detail.value);
    let regionTmp = e.detail.value;
    this.setData({
      region: regionTmp,
    });
    this.getWeather(0, 0);
  },

  getWeather: function(lat, lon) {
    var that = this;
    if (lat != 0 && lon != 0) {
      var locationDetail = lat+','+lon;
    } else {
      var locationDetail = that.data.region[1];
    }
    console.log('Location Data: ' + locationDetail)
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        location: locationDetail,
        key: "2ef71f1c0aec4e2a85927faf3a664b4c",
      },
      success: function(res) {
        console.log(res.data);
        console.log(res.data.HeWeather6[0].update.loc);
        var nowWeather = res.data.HeWeather6[0].now;
        if (res.data.HeWeather6[0].basic.parent_city == res.data.HeWeather6[0].basic.location) {
          var regionDetail = [res.data.HeWeather6[0].basic.admin_area, res.data.HeWeather6[0].basic.parent_city];
        } else {
          var regionDetail = [res.data.HeWeather6[0].basic.admin_area, res.data.HeWeather6[0].basic.parent_city, res.data.HeWeather6[0].basic.location];
        }
        that.setData({
          code: nowWeather.cond_code,
          weatherImag: "/images/"+nowWeather.cond_code+".png",
          temper: nowWeather.tmp+'˚C '+nowWeather.cond_txt,
          shiDu: nowWeather.hum,
          qiYa: nowWeather.pres / 10,
          nengJianDu: nowWeather.vis,
          fengSu: nowWeather.wind_spd,
          fengXiang: nowWeather.wind_dir,
          fengLi: nowWeather.wind_sc,
          updateTime: "更新时间："+res.data.HeWeather6[0].update.loc,
          region: regionDetail
        })
        that.changeColor(that.data.code);
      },
      fail: function(res) {
        console.log(res.errMsg);
        console.log(res.statusCode);
      }
    });
  },

  getLocation: function() {
    var that = this;
    wx.getLocation({
      success: function(res) {
        console.log(res)
        var lat = res.latitude;
        var lon = res.longitude;
        that.getWeather(lat, lon);
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },

  changeColor: function(code) {
    console.log("changeColor Code:" + code);
    var that = this;
    var now_color;
    if (code == 100) {
      now_color = '#66ccff';
    } else if (code > 100 && code < 200) {
      now_color = '#999999';
    } else if (code >= 200 && code < 300) {
      now_color = '#11ff11';
    } else if (code >= 300 && code < 400) {
      now_color = '#3300ff';
    } else if (code >= 400 && code < 500) {
      now_color = '#ffffff';
    } else if (code >= 500 && code < 600) {
      now_color = '#cc0000';
    } else {
      now_color = '#eeeeee';
    }
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: now_color,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("index.js: onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("index.js: onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.showToast({
      title: '感谢使用',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getLocation();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("User shared.")
  }

})