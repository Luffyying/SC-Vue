let myvue = require("../dist/bundle.js");


//注册全局的API
myvue.directive('html',{
	update(value){
		this.node.innerHTML = value;
	}
})
window.op = new myvue({
	el:'#root',
	data:{
		sh:90,
		show:true,
		name:'luffy',
		age:10,
		hobby:{
			food:'apple',
			live:{
				key:89
			}
		},
		books:[{name:'js权威指南'},{name:'node.js实战'}],
		array:[1,2,3,4],
		array2:[[1,2],[3,4]],
		complexArray:[{name:'lala',age:8},{name:'kankan',age:9}]
	},
	computed:{
		cpt:{
			get(){
				return this.sh
			},
			set(val){
			}
		}
	},
	watch:{
		sh:function(newVal){
			this.name = newVal + 'watching'
		}
	},
	methods:{
		clickFun:function(){
			alert('i am here')
		},
		show:function(){
			alert('this is a method')
		}
	},
	created(){
		//alert('i am created')
		window.document.title = "素材";
	},
	mounted(){
		//alert('i am mounted')
	}
	
})

//修改data数据，不会立刻响应到el上，执行dom更新后的回调
op.age = 100
// alert(document.querySelector('.test').textContent)
op.$nextTick(function(){
	alert('这是nextTick的回调')
	alert(document.querySelector('.test').textContent)
})

// op.age = 200
