export default function compile(option,v){

 	let $el = v.$el = initElement(option)//获得DOM结构
 	let $fragment = nodeToFragment($el)//将待编译的HTML存放在代码片段中
 	//最终将编译好的结果插入真实的DOM ,完成编译
 	compiler($fragment,v)
    
 	v.$el.appendChild($fragment)
 	//dom 已经渲染

}
function compiler(node,v){
	if(node.hasChildNodes()){

		compilerNodeList(node.childNodes,v)
	}
}
//分析节点
function compilerNodeList(nodeList,v){
	let el;
	for(let i=0,len = nodeList.length;i<len;i++){
		el = nodeList[i]
		//分析节点类型
		switch (el.nodeType){
			case 1:
				compileElement(el,v)
				break;
			case 3:
				compileTextNode(el,v)
				break;
			default:
				break;
		}
	}
}
function compileElement(node,vm){
	//元素节点
	console.log(node)
	console.log(vm)
}
function compileTextNode(node,vm){
	//文本节点
}
function initElement(option){
	return option.el && typeof option.el ==='string'?document.querySelector(option.el):document.body
}
function nodeToFragment(node){
	let fragment = document.createDocumentFragment(),child;
	while(child = node.firstChild){
		if(isIgnorable(child)){
			node.removeChild(child)
		}else{
			fragment.append(child)
		}
	}
	return fragment
}
function isIgnorable(node){
	let reg = /^[\t\n\r]+$/
	return node.nodeType==3 && reg.test(node.textContent)
}