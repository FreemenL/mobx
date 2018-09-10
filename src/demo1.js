import React,{Component} from 'react';
import { observable ,action } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from "react-dom";

var appState = observable({
    timer: 0
});

@observer
class TimerView extends Component {
    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>);
    }

    onReset () {
        this.props.appState.resetTimer();
    }
};

appState.resetTimer = action(function reset() {
    appState.timer = 0;
});

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);

ReactDOM.render(<TimerView appState={appState}/>,document.getElementById("root"));