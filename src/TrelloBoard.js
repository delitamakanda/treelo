import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';

class TrelloBoard extends Component {

    render() {
        return (
            <div className="app">
                <List title='Todo' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "todo")
                } />
                <List title='In Progress' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "in-progress")
                } />
                <List title='Done' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "done")
                } />
            </div>
        );
    }
}

TrelloBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
}

export default TrelloBoard;