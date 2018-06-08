let myvue = require("../dist/bundle.js");


window.vue = new myvue({
	data:{
		name:'luffy',
		age:10,
		array:[1,2,3,4]
	},
	methods:{
		show:function(){
			alert('this is a method')
		}
	},
})