/*入口文件*/


import { observe } from './observer/observe.js'
import compile from './compile/compiler.js'
import directives from './directives/index.js'

import dataAPI from './instance/api/data'
import eventAPI from './instance/api/event'
import globalAPI from './globalApi.js'
export default class vue{
	constructor(option){
		// console.log('here is vue sample')
		// console.log(option)
		this.init(option)
	}
	init(options){
		options = Object.assign({},{
			computed:{},
			methods:{},
			data:{},
			props:{}
		},
		options,
		{
			directives,
			components:{}
		})
		this.$option = options
		this.$data = options.data
		this.$compiler = compile
		this.$children = [];
		this._events = {}//事件
		// option.data['k'] = 0
		// option.data = {test:'ss'}  这是又换了新的地址,所以原来this.$data指向的原来的option.data 还是不变的
		//这就是为什么 挂载到vue上的属性也监听到了
		observe(this.$data)

		this._proxy(options)
		this._proxyMethods(options.methods)

		this._proxyComputed(options)

		//添加watch功能
		this.initWatch()

		//注意加载顺序 深坑啊，observer(this.$data)的顺序要优先于代理属性的设置
		
		//生命周期
		this.initLifeCycle(options)
		//编译html
		new compile(options,this)

 	}
 	//生命周期
 	initLifeCycle(option){
 		// debugger
 		//分别在不同的时期调用不同的钩子函数
 		//beforeCreate() 在observe data之前
 		//created()  在initEvents initData之后
 		// 
 		console.log(option.created())
 	}
 	_proxyComputed(option){
 		const that = this;
 		const computes = option.computed
 		for(let c in option.computed){
 			console.log(typeof c)
 			console.log(computes[c])//get set
 			Object.defineProperty(that,c,{
 				enumerable:true,
 				configurable:false,
 				get(){
 					return computes[c].get.call(that)
 				},
 				set(val){
 					if(computes[c].set){
 						computes[c].set.call(that,val)
 					}
 				}
 			})

 		}
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
			Object.defineProperty(that,key,{
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
globalAPI(vue);
eventAPI(vue)
//创建实例的时候，可以直接访问options
vue.options = {
    directives,
    components:{},
};
window.vue = vue;
function registerCallbacks(scope,action,hash){
	if(!hash){
		return 
	}
	let key;
	for(let key in hash){
		scope[action](key,hash[key].bind(scope))
	}
}
