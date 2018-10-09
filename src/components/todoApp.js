import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';


import TodoEntry from './TodoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import DevTool from 'mobx-react-devtools';

@observer // 它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。
export default class TodoApp extends React.Component{

	componentDidMount(){
		if(__CLIENT__){
			const options = {
				before:function(){
					console.log("test");
				}
			}
			let { Router } = require('director/build/director');
			let viewStore = this.props.viewStore;
			let router = Router({
				'/': function() { viewStore.todoFilter = ALL_TODOS; },
				'/active': function() { viewStore.todoFilter = ACTIVE_TODOS;},
				'/completed': function() { viewStore.todoFilter = COMPLETED_TODOS; }
			})
			router.configure(options)
			router.init('/');
		}
	}

	render(){
		const { todoStore , viewStore } = this.props;
		return(
			<div>
				<DevTool/>
				<header className="header">
					<h1>todos</h1>
					<TodoEntry todoStore={todoStore}/>
				</header>
				<TodoOverview todoStore={todoStore} viewStore={viewStore} />
				<TodoFooter todoStore={todoStore} viewStore={viewStore}/>
			</div>
		)
	}
}

TodoApp.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
};



























































