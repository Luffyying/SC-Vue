let myvue = require("../dist/bundle.js");


window.vue = new myvue({
	el:'#root',
	data:{
		show:true,
		name:'luffy',
		age:10,
		hobby:{
			food:'apple',
			live:{
				key:89
			}
		},
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
	methods:{
		clickFun:function(){
			alert('i am here')
		},
		show:function(){
			alert('this is a method')
		}
	},
})