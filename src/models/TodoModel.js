import { observable } from 'mobx';

export default class TodoModel{
	store;
	id;
	/**
	 * title 和  completed 属性变为 可观察属性 
	 */
	@observable title;
	@observable completed;

	constructor(store ,id ,title, completed){
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
	}

	toggle(){
		this.completed =!this.completed
	}

	destory(){
		//remove方法为 observable 对象所提供 
		this.store.todos.remove(this);
	}

	setTitle(title){
		this.title = title;
	}

	toJS(){
		return{
			id:this.id,
			title:this.title,
			completed:this.completed
		}
	}
	
	static fromJS(store ,object){
		const { id ,title, completed } = object;
		return new TodoModel(store,id ,title, completed);
	}

}