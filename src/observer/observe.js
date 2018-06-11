//遇坑  在data中，既有单纯的一维数组，又存在非单纯的数组，故分情况讨论
// class Observe{

// }
import Dep from '../dep'
class Observe{
	constructor(value){
		this.value = value;
		// this.dep = new Dep()
		// let obj = value

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
// export function observe(option){
// 	// let obj = option.data
// 	let obj = option
// 	console.log(obj)
// 	Object.keys(obj).forEach((key) => {
// 		if(isArray(obj[key])){
// 			defineArrayProps(obj[key])
// 		}else{
// 			defineProps(obj, key, obj[key]);
// 		}
        
//     })

// }
// function defineArrayProps(val){
// 	//在vue中仅仅封装了这七种方法
// 	const proxyMethods = [
// 	    'pop',
// 	    'push',
// 	    'sort',
// 	    'shift',
// 	    'splice',
// 	    'unshift',
// 	    'reverse'
// 	];
// 	const arrayProto = Array.prototype;
// 	const newProxyMethod = Object.create(arrayProto)
// 	proxyMethods.forEach(method =>{
// 		const originMethod = arrayProto[method]//原型上的原始方法
// 		newProxyMethod[method] = function(){
// 			/*通过数组操作新加入的元素 ，也要监听*/
// 			let newProp = arguments,addProp
// 			console.log('visit array of method')
// 			switch(method){
// 				case 'push':
// 				case 'unshift':
// 					addProp = newProp;
// 					break;
// 				case 'splice':
// 					addProp = [].slice.call(newProp).slice(2)
// 			}
// 			if(addProp){
// 				observe([].slice.call(addProp))
// 			}
// 			return originMethod.apply(this,newProp)
// 		}

// 	})
// 	val.__proto__ = newProxyMethod
// 	val.forEach(item=>{
// 		observe(item)
// 	})

// }
// function defineProps(obj,key,val){
// 	let dep = new Dep();
// 	//监听孩子
// 	// defineProps(obj, key, obj[key]);
// 	Object.defineProperty(obj,key,{
// 		get(){
// 			dep
// 			console.log('visit prop')
// 			return val
// 		},
// 		set(newVal){
// 			if(val != newVal){
// 				val = newVal
// 			}
// 			//变量发生改变时，通知所有订阅者，执行更新函数，改变dom值
// 			dep.notify()
// 		}
// 	})
// }
export function observe(data){
	return new Observe(data)
}
const isArray = function(i){
	return Array.isArray(i)
}