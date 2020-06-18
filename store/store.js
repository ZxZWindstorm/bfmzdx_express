import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const university={
	name:'',
	id:''
}
const address={
	id:'',
	name:'',
	phone:'',
	university:'',
	address:'',
	university_id:''
}


// 数据仓库
const state = {
	university,
	address
}

export default new Vuex.Store({
	state,
	// 同步存储
	mutations:{
		UpdateUniversity(state,university){
			console.log(university)
			// 存储到数据仓库
			state.university.name = university.name;
			state.university.id = university.id;
		},
		UpdataAddress(state,address){
			state.address=address;
			console.log(address);
			console.log(state.address);
		}
	},
	
})