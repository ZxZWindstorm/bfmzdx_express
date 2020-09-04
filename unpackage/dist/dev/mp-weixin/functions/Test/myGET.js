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
  // 如果数组最后一项是view，进入view 查询
  if (url_array[url_array.length - 1] == "view") {
    if(url_array[0] == 'eorder')
	{
		result = view_eorder(url_array[0], url_array[1])
	}else if(url_array[0] == 'user'){
		result = view_user(url_array[0], url_array[1])
	}else{
		result = view(url_array[0], url_array[1])
	}
  }
  // 如果数组最后一项是search，进入 search 查询
  if (url_array[url_array.length - 1] == "search") {
	  if(url_array[0] == 'eorder')
	  {
	  	result =  search_order(url_array[0],data)
	  }else{
	  	result =  search(url_array[0],data)
	  }
    
  }
  return result;
}
// 视图的处理，对数据进行查询，拿到指定的id 的信息,eneity直接对应的数据库中的表名称
 async function view(eneity,id){
   var result = await db.collection(eneity).doc(id).get()
   return result
}

// 搜索的处理，对数据进行查询，拿到指定的data过滤的信息,eneity直接对应的数据库中的表名称
async function search(eneity, data) {
  var selectObj = {}
  // 将分页信息取出来，如果存在
  if(data.condition){
	  var condition = data.condition
	  
	  delete data.condition
	  for (let key in data) {
	    // 取到最后一个操作的样式以及需要操作的字段
	    index = key.lastIndexOf("_");  
	    ope = key.substring(index + 1, key.length);
	    attr = key.substring(0, index);
	    console.log(attr)
	    switch(ope){
	      case "eq": selectObj[attr] = db.command.eq(data[key]);break;
	      case "neq": selectObj[attr] = db.command.neq(data[key]); break;
	      case "lt": selectObj[attr] = db.command.lt(data[key]); break;
	      case "lte": selectObj[attr] = db.command.lte(data[key]); break;
	      case "gt": selectObj[attr] = db.command.gt(data[key]); break;
	      case "gte": selectObj[attr] = db.command.gte(data[key]); break;
	      // 查询的值要在给定的数组内
	      case "in": selectObj[attr] = db.command.in(data[key]); break;
	      case "nin": selectObj[attr] = db.command.nin(data[key]); break;
	  
	      // 正则
	      case "like": selectObj[attr] = db.RegExp({
	        regexp: data[key],
	        //从搜索栏中获取的value作为规则进行匹配。
	        options: 'i',
	        //大小写不区分
	      }); break;
	      default:break;
	    }
	  }
	  var result = await db.collection(eneity).where(
	      selectObj
	  ).orderBy(condition.sort.attr,condition.sort.type)
	  .skip(parseInt(condition.page)*parseInt(condition.size))
	  .limit(parseInt(condition.size))
	  .get()

	  return result
  }
  else{
	  for (let key in data) {
	    // 取到最后一个操作的样式以及需要操作的字段
	    index = key.lastIndexOf("_");  
	    ope = key.substring(index + 1, key.length);
	    attr = key.substring(0, index);
	    console.log(attr)
	    switch(ope){
	      case "eq": selectObj[attr] = db.command.eq(data[key]);break;
	      case "neq": selectObj[attr] = db.command.neq(data[key]); break;
	      case "lt": selectObj[attr] = db.command.lt(data[key]); break;
	      case "lte": selectObj[attr] = db.command.lte(data[key]); break;
	      case "gt": selectObj[attr] = db.command.gt(data[key]); break;
	      case "gte": selectObj[attr] = db.command.gte(data[key]); break;
	      // 查询的值要在给定的数组内
	      case "in": selectObj[attr] = db.command.in(data[key]); break;
	      case "nin": selectObj[attr] = db.command.nin(data[key]); break;
	  
	      // 正则
	      case "like": selectObj[attr] = db.RegExp({
	        regexp: data[key],
	        //从搜索栏中获取的value作为规则进行匹配。
	        options: 'i',
	        //大小写不区分
	      }); break;
	      default:break;
	    }
	  }
	  var result = await db.collection(eneity).where(
	      selectObj
	  ).get()
	  
	  return result
  }
  
}




// function getResult(){
//   return result
// }

// 以下为扩展写法
 async function view_user(eneity,_id){
	//var result = await db.collection(eneity).doc(_id).get()
   
	var result = await db.collection(eneity).doc(_id).field({
			  openid:false,
			  session_key:false,
			  u_passwoed:false
	})
	.get()
   return result
}



 async function view_eorder(eneity,_id){
	//var result = await db.collection(eneity).doc(_id).get()
   
	   // var e_init = await db.collection('user').doc(result.data.e_initId).get()
	   // var e_reci = await db.collection('user').doc(result.data.e_reciId).get()
	   // var e_address = await db.collection('address').doc(result.data.e_addressId).get()
	   
	   // result.data.e_initId = e_init;
	   // result.data.e_reciId = e_reci;
	   // result.data.e_addressId = e_address;
	var result = await db.collection(eneity).aggregate()
	  .match({
	    _id :_id
	  })
	.lookup({
		from: 'user',
		localField: 'e_initId',
		foreignField: '_id',
		as: 'e_init',
	}).lookup({
		from: 'user',
		localField: 'e_reciId',
		foreignField: '_id',
		as: 'e_reci',
	}).lookup({
		from: 'address',
		localField: 'e_addressId',
		foreignField: '_id',
		as: 'e_address',
	}).end()
   return result.list[0]
}

// search_order
async function search_order(eneity, data) {
  var selectObj = {}
  // 将分页信息取出来，如果存在
  // 仅仅在查看全部时候分页，所以这个时候进行字段的视图修改
  if(data.condition){
	  var condition = data.condition
	  
	  delete data.condition
	  for (let key in data) {
	    // 取到最后一个操作的样式以及需要操作的字段
	    index = key.lastIndexOf("_");  
	    ope = key.substring(index + 1, key.length);
	    attr = key.substring(0, index);
	    console.log(attr)
	    switch(ope){
	      case "eq": selectObj[attr] = db.command.eq(data[key]);break;
	      case "neq": selectObj[attr] = db.command.neq(data[key]); break;
	      case "lt": selectObj[attr] = db.command.lt(data[key]); break;
	      case "lte": selectObj[attr] = db.command.lte(data[key]); break;
	      case "gt": selectObj[attr] = db.command.gt(data[key]); break;
	      case "gte": selectObj[attr] = db.command.gte(data[key]); break;
	      // 查询的值要在给定的数组内
	      case "in": selectObj[attr] = db.command.in(data[key]); break;
	      case "nin": selectObj[attr] = db.command.nin(data[key]); break;
	  
	      // 正则
	      case "like": selectObj[attr] = db.RegExp({
	        regexp: data[key],
	        //从搜索栏中获取的value作为规则进行匹配。
	        options: 'i',
	        //大小写不区分
	      }); break;
	      default:break;
	    }
	  }
	  var result = await db.collection(eneity).where(
	      selectObj
	  ).field({
		  _id:true,
		  e_addressId:true,
		  e_end_time:true,
		  e_initId:true,
		  e_money:true,
		  e_reciId:true,
		  e_recive_time:true,
		  e_start_time:true,
		  e_state:true,
		  // e_take_code:true,
		  e_type:true,
		  e_address:true,
	  })
	  .orderBy(condition.sort.attr,condition.sort.type)
	  .skip(parseInt(condition.page)*parseInt(condition.size))
	  .limit(parseInt(condition.size))
	  .get()

	  return result
  }
  else{
	  selectObj = data
	  var result = await db.collection(eneity).aggregate()
	  .match(
	    selectObj
	  )
	.lookup({
		from: 'user',
		localField: 'e_initId',
		foreignField: '_id',
		as: 'e_init',
	}).lookup({
		from: 'user',
		localField: 'e_reciId',
		foreignField: '_id',
		as: 'e_reci',
	}).lookup({
		from: 'address',
		localField: 'e_addressId',
		foreignField: '_id',
		as: 'e_addressItem',
	}).end()
	  
	  return result
  }
  
}

// 外部导出
exports.init = init;
// exports.getResult = getResult;