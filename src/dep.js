export default class Dep{
	constructor(){
		this.subscribes = []//存放订阅者
	}

	addSub(sub){
		this.subscribes.push(sub)
	}
	//通知各个订阅者 一个变量被用在多个地方,就相当于多个订阅者
	notify(){
		
		this.subscribes.forEach((item)=>{
			item.update();
		})
	}
}