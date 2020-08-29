// var result;
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({ env: 'xian-electric-powe-ab6c75' })

// 正常应该拿到的是绝对路径的url
function init(url,data){
  var result = dispose(url,data)
  return result;
}

function dispose(url,data){
  var result =null;
  // 进行对url的处理
  // 直接用get 请求的url 作为参数传递处理
  url_array = url.split("/");
  // 如果数组最后一项是del进入del 查询
  if (url_array[url_array.length - 1] == "del") {
    result = del(url_array[0], url_array[1])
  }
   // 如果数组最后一项是delMore进入delMore 删除
  if (url_array[url_array.length - 1] == "delMore") {
    result = delMore(url_array[0], data.idList)
  }
  return result;
}
// 单个删除
 async function del(eneity,id){
   var result = await db.collection(eneity).where({
     _id  : id
   }).remove()
   return result
}

// 多个删除
async function delMore(eneity, idList) {
  resultList =[]
  for (var id = 0; id < idList.length; id++) {
    r = await del(eneity, idList[id])
    resultList.push(r)
  }
  return resultList
}
// function getResult(){
//   return result
// }


// 外部导出
exports.init = init;
// exports.getResult = getResult;