import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router';

class TrelloBoard extends Component {

    render() {
        let cardModal = this.props.children && React.cloneElement(this.props.children, {
            cards: this.props.cards,
            cardCallbacks: this.props.cardCallbacks
        });
        return (
            <div className="app">
                <Link className="float-button" to="/new">+</Link>
                <List title='Todo' taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "todo")
                } />
                <List title='In Progress' taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "in-progress")
                } />
                <List title='Done' taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks} cards={
                    this.props.cards.filter((card)=> card.status === "done")
                } />
                { cardModal }
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