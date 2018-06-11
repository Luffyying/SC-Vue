export default{
	bind(){
		let node = this.node
	    let scope = this.vm
        let refNode =  this.refNode = document.createTextNode('');
        node.parentNode.insertBefore(refNode, node);
        node.parentNode.removeChild(node);
	},

	update(value){
		let node = this.node
		let scope = Object.create(this.vm)
		let refNode= this.refNode
		console.log(refNode.parentNode)
		//dom结构存在
		if(value){
			let clone = this.node = this.node.cloneNode(true);
			refNode.parentNode.insertBefore(clone,refNode)

		}else{
			//dom结构不存在 
			// console.log(node.parentNode)
			// console.log(refNode.parentNode)
			// refNode.parentNode.removeChild(node)
		}
	}
}
//首先移除 然后根据布尔值 添加还是删除