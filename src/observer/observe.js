//遇坑  在data中，既有单纯的一维数组，又存在非单纯的数组，故分情况讨论
// class Observe{

// }
import Dep from '../dep'
class Observe{
	constructor(value){
		this.value = value;
	 	this.walk(value)

	}
	walk(obj){
		Object.keys(obj).forEach((key) => {
			if(isArray(obj[key])){
				this.defineArrayProps(obj[key])
			}else{
				this.defineProps(obj, key, obj[key]);
			}
	        
	    })
	}
	defineProps(obj,key,val){
		//解决只能监听一层的bug
		if(typeof val =='object'){
			observe(val)
		}
		//每一个变量拥有一个dep
		let dep = new Dep();
		//监听孩子
		Object.defineProperty(obj,key,{
			get(){
				if(Dep.target){
					//均为订阅者
					dep.addSub(Dep.target)
				}
				console.log('visit prop')
				return val
			},
			set(newVal){
				if(val != newVal){
					val = newVal
				}
				//变量发生改变时，通知所有订阅者，执行更新函数，改变dom值
				dep.notify()
			}
		})
	}

	defineArrayProps(val){

	}
}
export function observe(data){
	return new Observe(data)
}
const isArray = function(i){
	return Array.isArray(i)
}