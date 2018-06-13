export default{
	bind(){
		let node =this.node
		// console.log(this.expression) item in items
		let expObj = this.expression.split('in')
		this.expression = expObj[1]
		this.item = expObj[0]
		let parentNode = this.parentNode = node.parentNode;
		let startNode = this.startNode = document.createTextNode('');
        let endNode = this.endNode = document.createTextNode('');

        parentNode.replaceChild(endNode, node); // 去掉最外层父级dom
        parentNode.insertBefore(startNode, endNode);//用两个空的text节点代替


		
	},
	update(value){
		// debugger
		//this.item  item variable this.expression books
		// console.log(this)
		// console.log(value)
		// console.log(this.node.childNodes)
		let node = this.node;//变量存储
		let scope = this.vm;

		/*

			Range 对象代表页面上一段连续的区域
		*/
		let range = document.createRange();
		range.setStart(this.startNode,0)
		range.setEnd(this.endNode,0)
		range.deleteContents()
		

		// debugger
		//循环问题
		//this.parentNode.insertBefore(clone2,this.endNode)

		// value.forEach((item,index)=>{
		// 	let clone = this.node.cloneNode(true)
		// 	let forscope = Object.create(scope)
		// 	forscope.$index = index;
		// 	forscope[this.item]= item
		// 	this.parentNode.insertBefore(clone,this.startNode)
		// 	new this.vm.$compiler({el:clone},forscope)

		// })
		let forscope = Object.create(scope);
		forscope[this.item] = value[0]
		let clone = this.node.cloneNode(true)
		this.parentNode.insertBefore(clone,this.startNode)
		new this.vm.$compiler({el:clone}, forscope);
	}
}