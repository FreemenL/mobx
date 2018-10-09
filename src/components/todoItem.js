import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';  

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer

export default class TodoItem extends React.Component{
	@observable editText = "";

	handleChange=(event)=>{
		this.editText = event.target.value;
	}

	handleKeyDown = (event)=> {

		let eventHandle = {
			[ESCAPE_KEY]:function(){
				this.editText = this.props.todo.title;
				this.props.viewStore.todoBeingEdited = null;
			},
			[ENTER_KEY]:function(){
				this.handleSubmit(event);
			}
		}
		eventHandle[event.witch]();

	}

	handleSubmit=(event)=>{
		const val = this.editText.trim();
		if(val){
			this.props.todo.setTitle(val);
			this.editText = val;
		}else{
			this.handleDestroy();
		}
		this.props.viewStore.todoBeingEdited = null;
	}

	handleDestroy=()=>{
		this.props.todo.destroy();
		this.props.viewStore.todoBeingEdited = null;
	}

	handleEdit = () =>{
		const todo = this.props.todo;
		this.props.viewStore.todoBeingEdited = todo;
		this.editText = todo.title;
	}

	handleToggle=()=>{
		this.props.todo.toggle();
	}

	render(){
		const { viewStore ,todo } = this.props;
		return(
			<li className={[
				todo.completed?"completed":"",
				todo === viewStore.todoBeingEdited ? "editing" : ""
				].join(" ")}>
				<div className="view">
					<input 
						type="checkbox"
						className="toggle"
						checked={todo.completed}
						onChange={this.handleToggle}
					/>
					<label onDoubleClick={this.handleEdit}>
						{todo.title}
					</label>
					<button className="destroy" onClick={this.handleDestroy}></button>
				</div>
				<input 
					type="text"
					ref="editField"
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					/>
			</li>
		)
	}
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	viewStore: PropTypes.object.isRequired
};




























