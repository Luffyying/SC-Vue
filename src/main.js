/*入口文件*/


import { observe } from './observer/observe.js'
import compile from './compile/compiler.js'
import directives from './directives/index.js'

import dataAPI from './instance/api/data'
export default class vue{
	constructor(option){
		// console.log('here is vue sample')
		// console.log(option)
		this.init(option)
	}
	init(option){
		this.$data = option.data
		let options = Object.assign({},{
			computed:{},
			methods:{},
			data:{},
			props:{}
		},
		option,
		{
			directives,
			components:{}
		})
		this.$option = options
		this.$compiler = compile
		// option.data['k'] = 0
		// option.data = {test:'ss'}  这是又换了新的地址,所以原来this.$data指向的原来的option.data 还是不变的
		//这就是为什么 挂载到vue上的属性也监听到了
		this._proxy(option)
		this._proxyMethods(option.methods)

		//添加watch功能
		this.initWatch();
		observe(this.$data)

		//编译html
		new compile(options,this)
 	}
 	//添加代理方法 this.show()
 	_proxyMethods(methods){
 		Object.keys(methods).forEach(method=>{
 			this[method] = this.$option.methods[method]
 		})
 	}
	//添加代理属性  this.name  挂载到vue上的属性也监听到了  
	_proxy(ops){
		let that = this;
		let d = ops.data;
		for(let key in d){
			Object.defineProperty(this,key,{
				configurable:false,
				enumerable:true,
				get(){
					return that.$data[key]
				},
				set(v) {
                    if (v ==that.$data[key]) {
                        return;
                    }
                    that.$data[key] = v;
                }
			})
		}
	}

	initWatch(){
		registerCallbacks(this,'$watch',this.$option.watch)
	}
}
dataAPI(vue);
function registerCallbacks(scope,action,hash){
	if(!hash){
		return 
	}
	let key;
	for(let key in hash){
		scope[action](key,hash[key].bind(scope))
	}
}