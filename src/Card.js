import React, { Component } from 'react';
import CheckList from './CheckList';

class Card extends Component {

    render() {
        return (
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.description}</div>
                <CheckList cardId={this.props.id} tasks={this.props.tasks} />
            </div>
        );
    }
}

export default Card;