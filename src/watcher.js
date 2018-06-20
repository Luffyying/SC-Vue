import Dep from './dep'
import Batcher from './batcher'
const batcher = Batcher();
let id = 0;
export default class Watcher{
	//watch 监听的对象改变时的回调 callback
	constructor(exp,scope,callback){
		this.value = null;
		this.exp = exp;
		this.scope = scope,
		this.callback = callback
		this.id = id++
		Dep.target = this;
		this.update()
		Dep.target = null;
	}

	update(){
		let newValue = this.get()
		this.value = newValue
		batcher.pushWatcher(this);
	}

	get(){
		// 仅仅是简单表达式的情况
		let exp = 'scope.'+this.exp
		// let reg = /\(([^*]+)\)/g
		// if (reg.test(this.exp)) {
		// 	//暂且当做v-for解析
		// 	return this.exp
		// }else{
		// 	let a = new Function('scope','return '+exp)
		// 	return a(this.scope)
		// }
		
		//console.log(this.exp) //'item in books'
		let a = new Function('scope','return '+exp)
		return a(this.scope)
	}
}