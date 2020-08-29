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
  url_array = url.split("/");
  // 如果数组最后一项是update，进入 update 查询
  if (url_array[url_array.length - 1] == "update") {
    result = update(url_array[0], data)
  }
  return result;
}


// 表信息的更新
async function update(eneity,data){
  id =data._id
  delete data._id
  console.log(eneity)
  console.log(data)
  var result = await db.collection(eneity).where({
    _id: id
  }).update({
    data:data
  })
  console.log(data)
  return result
}



// 外部导出
exports.init = init;