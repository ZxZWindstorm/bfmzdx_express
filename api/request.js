//start微信云函数
let wxCloudUrl = 'http://localhost/'

//end微信云函数



// 公用测试地址
let urlTest = 'http://rap2.taobao.org:38080/app/mock/257699/'

//公用地址
let url = 'http://localhost:8090/'

 let getMyPublish= `${urlTest}getMyPublish`

//大学信息获取接口location
//通过接收经纬度来返回附近的大学信息
// let locationUni= `${url}position/location`
let locationUni= `${wxCloudUrl}university/search`

let searchUni= `${wxCloudUrl}university/search`
// let searchUni= `${url}position/search`
//获取常用位置
// let getAddress=`${url}address/getAddress`
let getAddress=`${wxCloudUrl}address/search`
//增加常用位置
// let addAddress=`${url}address/addAddress`
let addAddress=`${wxCloudUrl}address/create`
//删除常用位置
// let deleteAddress=`${url}address/deleteAddress`
let deleteAddress=`${wxCloudUrl}address/###/del`

//增加订单 /order/addOrder
// let addOrder=`${url}order/addOrder`
let addOrder=`${wxCloudUrl}eorder/create`
 // 获取列表
 // let getExpress = `${url}order/getExpress`
  let getExpress = `${wxCloudUrl}eorder/search`
 //我的发布
 // let getMyPublish= `${url}order/getMyPublish`
 
 //我接受的任务
 // let getMyRecive = `${url}order/getMyRecive`
  let getMyRecive = `${wxCloudUrl}eorder/search`
  
  // 修改订单支付状态为o已经支付
 let changeMyRecive = `${wxCloudUrl}eorder/update`
  
 //order/getOrderById
 //根据id 获取唯一订单
  // let getOrderById = `${url}order/getOrderById`
    let getOrderById = `${wxCloudUrl}eorder/###/view`
 ///order/removeOrderById 删除订单(不能删除已经支付的订单)
 // let removeOrderById = `${url}order/removeOrderById`
  let removeOrderById = `${wxCloudUrl}eorder/###/del`
//登陆
 //let wxloginurl = `http://meituan.thexxdd.cn/api/wxuser/wxlogin`
 // let wxloginurl = `${url}wxlogin`
let wxloginurl = `${wxCloudUrl}wxlogin`


//个人信息设置，
let getUser = `${wxCloudUrl}user/###/view`

export{
	removeOrderById,getOrderById,addOrder,getExpress,getMyPublish,getMyRecive,
	wxloginurl,searchUni,addAddress,getAddress,deleteAddress,locationUni,
	changeMyRecive,getUser
	}