import Watcher from './watcher.js'

export default class Directive{
	constructor(dir,vm,node){
		// console.log(dir)//指令信息
		// console.log(vm)//实例
		// console.log(node)//某一节点
		this.dir = dir;
		this.vm = vm;
		this.node = node;
		this.expression = dir.expression
		this.name = dir.name
		this._bind();

	}
	_bind(){
		let def =this.dir.def; 
		Object.assign(this,def)
		this.bind && this.bind()
		if(this.update){
			this._update = (val,oldVal) =>{
				this.update(val,oldVal)
			}
		}

		let watcher = new Watcher(this.expression,this.vm,this._update,this.bind)
	}
}