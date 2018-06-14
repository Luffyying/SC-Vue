
//全局API
export default function (myVue){
	//传入vue实例,给实例挂载API

	myVue.directive = function(dir,definition){
		console.log(this)
		this.options.directives[dir] = definition
	}

}