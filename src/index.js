import React,{Component} from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from "react-dom";

const appState = observable({
	count:1,
	handlecut(){
		this.count--;
	},
	handleAdd(){
		this.count++;
	}
})

@observer
class Test extends Component{
	handlecut(){
		this.props.store.handlecut();
	}
	handleAdd(){
		this.props.store.handleAdd();
	}
	render(){
		return(
			<div>
				<div>count:{this.props.store.count}</div>
				<button onClick ={this.handleAdd.bind(this)}>+</button>
				<button onClick = {this.handlecut.bind(this)}>-</button>
			</div>
		)
	}
}

ReactDOM.render(<Test store={appState}/>,document.getElementById("root"));