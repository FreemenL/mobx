import { observable ,computed, reaction } from 'mobx';
import TodoModel from '../models/TodoModel';
import * as Utils from '../utils';

export default class TodoStore{
	/**
	 *observable 相当于订阅发布模式中的任务队列
	*/
	@observable todos = [];

	@computed get activeTodoCount(){
		return this.todos.reduce(
			(sum,todo)=>sum+(todo.computed?0:1),
			0
		)
	}

	@computed get computedCount(){
		return this.todos.length - this.activeTodoCount;
	}

	subscribeServerToStore(){
		reaction(//autorun的变种 不同于 autorun 的是当创建时效果 函数不会直接运行，只有在数据表达式首次返回一个新值后才会运行。
			()=>this.toJS(),
			todos => window.fetch&&fetch("/api/todos",{
				method:"post",
				body:JSON.stringify({ todos }),
				headers: new Headers({'Content-Type': 'application/json'})
			})
		)
	}

	subscribeLocalstorageToStore(){
		reaction(
			()=>this.toJS(),
			todos => localStorage.setItem("mobx-react-todomvc-todos",JSON.stringify(todos))
		)
	}

	addTodo(todo){
		this.todos.push(TodoModel.fromJS(this,{id:Utils.uuid(),title:todo,completed:false}))
	}

	toggleAll(checked){
		this.todos.forEach(
			todo =>todo.completed = checked
		)
	}
	
	clearCompleted () {
		this.todos = this.todos.filter(
			todo => !todo.completed
		);
	}

	toJS(){
		return this.todos.map(todo => todo.toJS());
	}
	
	/**
	 * [fromJS description]
	 * 1.初始化操作 把初始数据变成observable 对象 
	 * 2.todos中每一项都有 todomodel 中的方法  
	*/
	static fromJS(array){	 
		const todoStore = new TodoStore();
		todoStore.todos = array.map(item => TodoModel.fromJS(todoStore,item))
		return todoStore;
	}

}





































