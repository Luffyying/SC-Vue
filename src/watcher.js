import Dep from './dep'

export default class Watcher{
	constructor(exp,scope,callback){
		this.exp = exp;
		this.scope = scope,
		this.callback = callback
		Dep.target = this;
		this.update()
		Dep.target = null;
	}

	update(){
		console.log(this)
		let newValue = this.get();
		let test = this.callback
		test(newValue)
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