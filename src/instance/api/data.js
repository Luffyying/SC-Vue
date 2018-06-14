import Watcher from "../../watcher";
export default function(vue) {
    vue.prototype.$watch = function(exp,cb) {
    	// console.log(myVue) //vue class
    	// console.log(exp) //sh
    	// console.log(this)// vue 实例
    	// console.log(cb)//f(newVal){thsi.name = newVal+'luffy'}
        let watcher = new Watcher( exp,this, cb);
    }

}



