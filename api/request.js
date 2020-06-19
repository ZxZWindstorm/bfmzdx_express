// 公用测试地址
let urlTest = 'http://rap2.taobao.org:38080/app/mock/257699/'

//公用地址
let url = 'http://localhost:8090/'




//大学信息获取接口location
//通过接收经纬度来返回附近的大学信息
let locationUni= `${url}position/location`

let searchUni= `${url}position/search`
//获取常用位置
let getAddress=`${url}address/getAddress`
//增加常用位置
let addAddress=`${url}address/addAddress`
//删除常用位置
let deleteAddress=`${url}address/deleteAddress`

//增加订单 /order/addOrder
let addOrder=`${url}order/addOrder`
 // 获取列表
 let getExpress = `${url}order/getExpress`
 //我的发布
 let getMyPublish= `${url}order/getMyPublish`
 
 //我接受的任务
 let getMyRecive = `${url}order/getMyRecive`
 
//登陆
 //let wxloginurl = `http://meituan.thexxdd.cn/api/wxuser/wxlogin`
 let wxloginurl = `${url}wxlogin`


export{addOrder,getExpress,getMyPublish,getMyRecive,wxloginurl,searchUni,addAddress,getAddress,deleteAddress,locationUni}