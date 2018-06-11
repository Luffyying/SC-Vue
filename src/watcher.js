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
		// debugger
		console.log(this)
		let newValue = this.get();
		let test = this.callback
		test(newValue)
	}

	get(){
		return this.scope[this.exp]
	}
}