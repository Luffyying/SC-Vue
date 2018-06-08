/*入口文件*/


import { observe } from './observer/observe.js'
import compile from './compile/compiler.js'
export default class vue{
	constructor(option){
		// console.log('here is vue sample')
		// console.log(option)
		this.init(option)
	}
	init(option){
		this.$data = option.data
		// option.data['k'] = 0
		// option.data = {test:'ss'}  这是又换了新的地址,所以原来this.$data指向的原来的option.data 还是不变的
		//这就是为什么 挂载到vue上的属性也监听到了
		this._proxy(option)
		observe(this.$data)

		//编译html
		compile(option,this)
 	}
	//添加代理属性  this.name  挂载到vue上的属性也监听到了  疑问？
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
}