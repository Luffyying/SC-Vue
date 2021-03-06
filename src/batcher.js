import {nextTick} from  './utils/env'
/**
 * 批处理构造函数
*/

class Batcher{
	constructor(){
		this.has = {};
		this.queue = [];
		this.waiting = false;
	}
	reset(){
		this.has = {};
		this.queue = [];
		this.waiting = false;
	}

	pushWatcher(watch) {
	    if (!this.has[watch.id]) {
	        this.queue.push(watch);
	        this.has[watch.id] = watch;
	        if (!this.waiting) {
	            this.waiting = true;
	            nextTick(this.flush,this);
	            /*
					当我们修改了data中的一个值的时候，并不会立即反应到该el中，

	            */
	        }
	    }
	}
	flush() {
		let queue = this.queue;
		let watcher;
		for(let i=0;i<queue.length;i++){
			watcher = queue[i];
			watcher.callback(watcher.value);
		};
		this.reset();
	}
}

export default function batcher(){
	return new Batcher();
}
