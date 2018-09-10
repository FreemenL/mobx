import React,{Component} from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from "react-dom";


@observer
class Test extends Component{
	@observable count = 1;
	handlecut(){
		this.count--;
	}
	handleAdd(){
		this.count++;
	}
	render(){
		return(
			<div>
					<div>count:{this.count}</div>
					<button onClick ={this.handleAdd.bind(this)}>+</button>
					<button onClick = {this.handlecut.bind(this)}>-</button>
			</div>
		)
	}
}

ReactDOM.render(<Test/>,document.getElementById("root"));