import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class TrelloBoard extends Component {

    render() {
        return (
            <div className="app">
                <List title='Todo' taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "todo")
                } />
                <List title='In Progress' taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "in-progress")
                } />
                <List title='Done' taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "done")
                } />
            </div>
        );
    }
}

TrelloBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
}

export default DragDropContext(HTML5Backend)(TrelloBoard);