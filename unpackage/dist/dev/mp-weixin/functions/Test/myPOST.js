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
  // 如果数组最后一项是create，进入 create 查询
  if (url_array[url_array.length - 1] == "create") {
	  if(url_array[0]=='eorder'){
		  result = create_eorder(url_array[0], data)
	  }
	  else{
		  result = create(url_array[0], data)
	  }
    
  }
  // 如果数组最后一项是wxlogin，进入 wxlogin 查询
  if (url_array[url_array.length - 1] == "wxlogin") {
    result = wxlogin(data)
  }
  return result;
}


// 表信息的增加
async function create(eneity,data){
  console.log(eneity)
  console.log(data)
  var result = await db.collection(eneity).add({
    data: data
  })
  console.log(data)
  return result
}

// 以下是拓展接口，非通用
async function wxlogin(data){
	  const wxContext = cloud.getWXContext()
	  // 如果没有openid则在user表中进行注册，存在则直接返回id
	  // 根据openid 查询
	  var result = await db.collection('user').where({"openid":wxContext.OPENID}).get()
		
		if(result.data.length==0){
			addResult = await db.collection('user').add(
				{
					data: {
						openid:wxContext.OPENID,
						session_key:'',
						u_about:null,
						u_autograph:null,
						u_avatar:data.avatarUrl,
						u_birthday:null,
						u_email:null,
						u_gender:null,
						u_name:data.nickName,
						u_passwoed:null,
						is_permissions:false,
					}
				})
		}
	 result = await db.collection('user').where({"openid":wxContext.OPENID}).get()
				
		
	  return {
	    avatarUrl: result.data[0].u_avatar,
	    nickName:  result.data[0].u_name,
	    openid: result.data[0].openid,
		_id: result.data[0]._id,
	  }
}

// 重写了关于eorder 的create 方法
async function create_eorder(eneity,data){
  console.log(eneity)
  console.log(data)
  // 创建的时候，进行starttime的修改，
  date = new Date();
  data.e_start_time = date.getTime()
  // 检测重复
  var repetition  = await db.collection(eneity).where(
	{
		e_type:data.e_type,
		e_take_code:data.e_take_code
	}
	).get()
	if(repetition.data.length!=0)
	{
		return {
			_id:repetition.data[0]._id,
			errMsg:'repetition'
		}
	}
  var result = await db.collection(eneity).add({
    data: data
  })
  console.log(data)
  return result
}

// 外部导出
exports.init = init;