import Watcher from "../../watcher";
export default function(myVue) {
    myVue.prototype.$watch = function(exp,cb) {
    	debugger
        let watcher = new Watcher( exp,this, cb);
    }

}
