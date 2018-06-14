let myvue = require("../dist/bundle.js");

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
				return 8
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
})