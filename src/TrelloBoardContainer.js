import React, { Component } from 'react';
import TrelloBoard from './TrelloBoard';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'connard'
};

class TrelloBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({cards: responseData});
        })
        .catch((error) => {
            console.log('error fecthing data', error);
        })
    }

    addTask(cardId, taskName) {

    }

    deleteTask(cardId, taskId, taskIndex) {

    }

    toggleTask(cardId, taskId, taskIndex) {

    }

    render() {
        return (
            <TrelloBoard cards={this.state.cards}
                        taskCallbacks={{
                            toggle: this.toggleTask.bind(this),
                            delete: this.deleteTask.bind(this),
                            add: this.addTask.bind(this)}} />
        )
    }
}

export default TrelloBoardContainer;
