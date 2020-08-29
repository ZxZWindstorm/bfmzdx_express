// 封装请求：get post
// 面向对象es6 promise  等等。。。

// 引进提示
//import {errdata} from 'api/errdata.js'

// GET
let listing = function(urling){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'GET',
		})
		.then((res)=>{
			// console.log(res[1])
			resolve(res[1])
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			//errdata.errlist(errs)
			reject(err)
		})
	})
}

// POST请求
let publicing = function(urling,shopdata){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'POST',
			data:shopdata
		})
		.then((res)=>{
			// console.log(res[1])
			resolve(res[1])
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			//errdata.errlist(errs)
			reject(err)
		})
	})
}

// 以下为云接口
// GET

let myGET = function(url,data){
	return new Promise((resolve,reject)=>{
		// start 云函数测试
		wx.cloud.init()
		wx.cloud.callFunction({
		  // 云函数名称
		  name: 'Test',
		  // 传给云函数的参数,如果为view，修改url，否则就
		  data: {
		    'url':url,
			'type':'GET',
			'data':data
		  },
		})
		.then(res => {
		   resolve(res.result)
		})
		.catch((err)=>{
			 reject(err)
		})
		
	})
}

// GET

let myPOST = function(url,data){
	return new Promise((resolve,reject)=>{
		// start 云函数测试
		wx.cloud.init()
		wx.cloud.callFunction({
		  // 云函数名称
		  name: 'Test',
		  // 传给云函数的参数,如果为view，修改url，否则就
		  data: {
		    'url':url,
			'type':'POST',
			'data':data
		  },
		})
		.then(res => {
		   resolve(res.result)
		})
		.catch((err)=>{
			 reject(err)
		})
		
	})
}

let myDELETE = function(url,data){
	return new Promise((resolve,reject)=>{
		// start 云函数测试
		wx.cloud.init()
		wx.cloud.callFunction({
		  // 云函数名称
		  name: 'Test',
		  // 传给云函数的参数,如果为view，修改url，否则就
		  data: {
		    'url':url,
			'type':'DELETE',
			'data':data
		  },
		})
		.then(res => {
		   resolve(res.result)
		})
		.catch((err)=>{
			 reject(err)
		})
		
	})
}



let myPUT = function(url,data){
	return new Promise((resolve,reject)=>{
		// start 云函数测试
		wx.cloud.init()
		wx.cloud.callFunction({
		  // 云函数名称
		  name: 'Test',
		  // 传给云函数的参数,如果为view，修改url，否则就
		  data: {
		    'url':url,
			'type':'PUT',
			'data':data
		  },
		})
		.then(res => {
		   resolve(res.result)
		})
		.catch((err)=>{
			 reject(err)
		})
		
	})
}
export{myGET,myPOST,myDELETE,myPUT,listing,publicing}