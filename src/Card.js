import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckList from './CheckList';
import marked from 'marked';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

let titlePropTypes = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName];
        if (typeof value !== 'string' || value.length > 80) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 characters.`
            );
        }
    }
};

class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        };
    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            bottom: 0,
            width: 7,
            backgroundColor: this.props.color


        };
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                <CheckList 
                        cardId={this.props.id} 
                        tasks={this.props.tasks}
                        taskCallbacks={this.props.taskCallbacks} />
                </div>
            );
        };

        return (
            <div className="card">
                <div style={sideColor} />
                <div className={this.state.showDetails? "card__title card__title--is-open": "card__title"} onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
                <ReactCSSTransitionGroup transitionName="toggle"
                                        transitionEnterTimeout={250}
                                        transitionLeaveTimeout={250}>
                    {cardDetails}
                </ ReactCSSTransitionGroup>
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropTypes,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.array,
    taskCallbacks: PropTypes.object,
}

export default Card;