export default class Dep{
	constructor(){
		this.subscribes = []//存放订阅者
	}

	addSub(sub){
		this.subscribes.push(sub)
	}
	//通知各个订阅者
	notify(){
		debugger
		this.subscribes.forEach((item)=>{
			item.update();
		})
	}
}