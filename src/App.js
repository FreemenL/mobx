import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { observable, autorun ,reaction } from 'mobx';
// import { keepAlive } from 'mobx-utils';


import {observer ,Provider } from "mobx-react";

var timerData = observable({
    secondsPassed: 0
});

setInterval(() => {
  console.log(timerData);
}, 1000);

@observer 
class Timer extends React.Component {
    render() {
      console.log(this.props);
        return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
    }
};

class App extends Component{
  render(){
    return(
      <Timer timerData={timerData}/>
    )
  }
}


export default App;
