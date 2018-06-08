let myvue = require("../dist/bundle.js");


window.vue = new myvue({
	data:{
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
	methods:{
		show:function(){
			alert('this is a method')
		}
	},
})