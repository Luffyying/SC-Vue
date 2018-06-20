import {nextTick} from '../../utils/env'

export default function (myVue){
	console.log(myVue)
	myVue.prototype.$nextTick = function(call){
		//call();//call就是调用的回调函数
		nextTick(call,this)
	}
	//myvue 是vue这个类，而非实例
}