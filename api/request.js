// 公用测试地址
let urlTest = 'http://rap2.taobao.org:38080/app/mock/257699/'

//公用地址
let url = 'http://localhost:8090/'
// 获取列表
let getExpress = `${urlTest}getExpress`
//我的发布
let getMyPublish= `${urlTest}getMyPublish`
//我接受的任务
let getMyRecive = `${urlTest}getMyRecive`

//大学信息获取接口location
//通过接收经纬度来返回附近的大学信息
let locationUni= `${url}position/location`

let searchUni= `${urlTest}position/search`
//获取常用位置
let getAddress=`${urlTest}position/getAddress`
//增加常用位置
let addAddress=`${urlTest}position/addAddress`
//删除常用位置
let deleteAddress=`${urlTest}position/deleteAddress`

//登陆
// let wxloginurl = `http://meituan.thexxdd.cn/api/wxuser/wxlogin`
let wxloginurl = `${url}wxlogin`

export{getExpress,getMyPublish,getMyRecive,wxloginurl,searchUni,addAddress,getAddress,deleteAddress,locationUni}