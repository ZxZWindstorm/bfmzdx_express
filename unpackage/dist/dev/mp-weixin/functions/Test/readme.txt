2020-8-23
更新调用如下：
{
  type: 'GET',
  url : 'http://localhost/tablename/data_id/view'
}
返回一个table 的视图信息

2020-8-24

更新调用如下：
{
  type: 'GET',
  url : 'http://localhost/tablename/search',
  data：{
    'phone_like': 0969
  }
}
返回一个table 的搜索过滤信息，其中，规则为  属性_规则
全部的规则如下:
_like  ：相似
_eq    : 相等
_neq   :不相等
_in    : 包含
_gt    : 大于
_lt    : 小于
_gte   : 大于等于
_lte   : 小于等于

在查询时候，可以给一个对象作为其分页排序的信息
desc 降序   asc 升序
condition:{
	sort:{attr:'_id',type:'desc'},
	page:1(从0开始的参数)
	size:10(页码大小)
}


db.collection('eorder')
  .where({
    
  })
  .('e_take_code','des')
  .skip(1)
  .limit(10)
  .get()



返回值为增加的数据的_id
{
  "type": "POST",
  "url": "http://localhost/address/create",
  "data": {
    "user_id": 11,
    "university_id": 13,
    "name": "cerate方法",
    "phone": "15624860182",
    "address": "8号公寓545",
    "detail": "测试增加信息"
  }
}
返回值为更新状态码值 正常为1
{
  "type": "PUT",
  "url": "http://localhost/address/update",
  "data": {
     "_id" :"data_id",
    "user_id": 11,
    "university_id": 13,
    "name": "up更新方法",
    "phone": "15624860182",
    "address": "8号公寓545",
    "detail": "测试增加信息"
  }
}
返回值为删除状态码值 正常为1
{
  "type": "DELETE",
  "url": "http://localhost/address/data_id/del"
}
返回值为删除状态码值 正常为1
{
  "type": "DELETE",
  "url": "http://localhost/address/delMore",
  "data":{
    "idList":["_id1","_id2"]
  }
}