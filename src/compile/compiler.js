import Directive from '../directive'
export default class Compiler{
	constructor(option,v){
		let $el = v.$el = initElement(option)//获得DOM结构
	 	let $fragment = nodeToFragment($el)//将待编译的HTML存放在代码片段中,此时真实的dom内容已经不存在了
	 	//$fragment 没有挂载变量内容的空壳
	 	this.compiler($fragment,v)
	 	//最终将编译好的结果插入真实的DOM ,完成编译
	 	v.$el.appendChild($fragment)
	 	//dom 已经渲染
	}
	compiler(node,v){
		if(node.hasChildNodes()){
			this.compilerNodeList(node.childNodes,v)
		}
	}
	compilerNodeList(nodeList,v){
		let el;
		for(let i=0;i<nodeList.length;i++){
			el = nodeList[i]
			//分析节点类型
			if(el){
				switch (el.nodeType){
					case 1:
						this.compileElement(el,v)
						break;
					case 3:
						this.compileTextNode(el,v)
						break;
					default:
						break;
				}
			}
		}
	}

    compileElement(node,vm){
		//元素节点
		console.log(node)
		console.log(vm)
		let attrs = [].slice.call(node.attributes)
		//获得属性节点
		if(attrs.length){
			//获得到带编译的节点，给其添加订阅 
			//let token = getDirective(node,vm)
			attrs.forEach((item,index)=>{
				let token = getDirective(item,vm.$option)
				if(token){
					new Directive(token,vm,node)
				}
			})

		}

	}

	compileTextNode(node,vm){
	}




}
function getDirective(node,option){
	// node.attributes[0].nodeType 属性节点 2
	let token = null,attrName =node.name
	//attrName : v-text、 class   
	if(attrName.indexOf('v-') > -1){
		//v-on:click
		let parse = attrName.slice(2).split(":")
		token = {
			expression:node.value,
			name:parse[0],
			prop:parse[1],
			def:option.directives[parse[0]]
		}
		console.log(token)
	}
	return token
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