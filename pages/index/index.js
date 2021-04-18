// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    openid: '',
    token:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotomap(){
    wx.navigateTo({
      url: '../map/map'
    })

  },
  scancode(){
////////////////////////////////////////////
wx.scanCode({
  onlyFromCamera: false,   //值为 false  既可以使用相机也可以使用相册，  值为true 只能使用相机
  scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'], //分别对应 一维码  二维码  DataMatrix码 PDF417条码  
  success: async (res) => { //扫码成功后
       console.log(res.result)
      //res.result		所扫码的内容
      //res.scanType		所扫码的类型
      //res.charSet		所扫码的字符集
      //res.path			当所扫的码为当前小程序二维码时，会返回此字段，内容为二维码携带的 path
      //res.rawData		原始数据，base64编码
  },
  fail: (res) => {//扫码失败后
      wx.showToast({
          title: '扫码失败',
          icon: 'loading',
          duration: 1500
      })
  },
})



////////////////////////////////////////////////
  },
  onLoad() {
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  login(){
    ///////////////////////////////////////
    var that=this;
    wx.login({      
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://www.datun.com.cn/xcx/login.php',
            data: {
              code: res.code
            },
            success (res) {
              console.log(res.data);
              let openid=res.data.openid;
              that.setData({
                openid:"openid:\n"+ openid
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })



    ///////////////////////////////////////
     
   
  } , 
  gettoken(){
    ///////////////////////////////////////
    var that=this;
  
    wx.request({
      url: 'http://www.datun.com.cn/xcx/gettoken.php',
      
      success (res) {
        console.log(res.data);
        let token=res.data.access_token;
        that.setData({
          token:"token:\n"+ token
        })
      }
    })
       ///////////////////////////////////////
     
   
  }  

})
