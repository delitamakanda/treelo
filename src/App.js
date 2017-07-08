import React, { Component } from 'react';
import {render} from 'react-dom';

class App extends Component {

    render() {
        let divStyle = {
            width: 100,
            height: 100,
            padding: 5,
            backgroundColor: '#ee9900'
        }
        return (
            <div style={divStyle}>
                <h1>hello world</h1>
            </div>
        );
    }
}

export default App;