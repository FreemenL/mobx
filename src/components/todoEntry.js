import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const ENTER_KEY = 13;

@observer 
export default class TodoEntry extends React.Component{
	constructor(props){
		super(props);
		this.textNode = React.createRef();
	}
	handleNewTodoKeyDown(event){
		if(event.keyCode!==ENTER_KEY){
			return ;
		}
		// console.log(this.mapNodes);
		event.preventDefault();

		let val = this.textNode.current.value.trim();

		if(val){
			this.props.todoStore.addTodo(val);
			this.textNode.current.value="";
		}

	}

	render(){
		return(
			<input type="text"
				ref={this.textNode}
				className="new-todo"
				placeholder="What needs to be done?"
				onKeyDown={ this.handleNewTodoKeyDown.bind(this) }
				autoFocus={true}
			/>
		)
	}
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired
};













