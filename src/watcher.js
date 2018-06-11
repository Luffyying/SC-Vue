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
		//暂时仅仅解决简单的表达式
		let exp = 'scope.'+this.exp
		let a = new Function('scope','return '+exp)
		return a(this.scope)
	}
}