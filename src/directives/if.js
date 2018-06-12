export default{
	bind(){
		let node = this.node
	    let scope = this.vm

        let refNode =  this.refNode = document.createTextNode('');
        // debugger
        // console.log(node.parentNode)
        node.parentNode.insertBefore(refNode, node);
        node.parentNode.removeChild(node);
	},

	update(value){
		// let node = this.node
		// let scope = Object.create(this.vm)
		 let refNode= this.refNode
		// console.log(refNode.parentNode)
		// //dom结构存在
		if(value){
			let clone = this.node = this.node.cloneNode(true);
			refNode.parentNode.insertBefore(clone,refNode)
			refNode.parentNode.removeChild(refNode)

		}
		else{
			// //dom结构不存在 
			// try{
			// 	this.node.parentNode.removeChild(this.node)
			// }catch(e){

			// }
			//refNode.parentNode.removeChild(refNode)
			
		}
	}
}
//首先移除 然后根据布尔值 添加还是删除