export function observe(option){
	let obj = option.data
	console.log(obj)

	Object.keys(obj).forEach((key) => {
		if(isArray(obj[key])){
			defineArrayProps(obj,key,obj[key])
		}else{
			defineProps(obj, key, obj[key]);
		}
        
    })

}
function defineArrayProps(obj,key,val){
	//在vue中仅仅封装了这七种方法
	const proxyMethods = [
	    'pop',
	    'push',
	    'sort',
	    'shift',
	    'splice',
	    'unshift',
	    'reverse'
	];

}
function defineProps(obj,key,val){
	Object.defineProperty(obj,key,{
		get(){
			return val
		},
		set(newVal){
			if(val != newVal){
				val = newVal
			}
		}
	})
}
const isArray = function(i){
	return Array.isArray(i)
}