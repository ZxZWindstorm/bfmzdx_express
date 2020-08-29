// 所需引用
var myGET = require('./myGET')
var myPOST = require('./myPOST')
var myPUT = require('./myPUT')
var myDELETE = require('./myDELETE')
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  // 配置信息==>url 的前一部分，例如http://localhost/
  var url_title = "http://localhost/"
  var url = event.url

  // 去掉url 的头部
  url =  url.replace(url_title, "");
  data = event.data;
  switch(event.type){
    case "GET":
      result = myGET.init(url,data);
      break;
    case "POST": 
      result = myPOST.init(url,data)
      break;
    case "PUT":
      result = myPUT.init(url, data)
      break;
    case "DELETE": 
      result = myDELETE.init(url, data)
      break;
    case "UPDATE": break;
    default:return{
      code:-1
    }
  }

  return result
}