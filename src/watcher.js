export default class Watcher{
	constructor(exp,scope,callback){
		this.exp = exp;
		this.scope = scope,
		this.callback = callback

		this.update()
	}

	update(){
		let test = this.callback
		test.bind();
		// this.callback().update()
	}
}