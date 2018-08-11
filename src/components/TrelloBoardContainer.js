import React, { Component } from 'react';
import TrelloBoard from './TrelloBoard';
import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../store/CardStore';


class TrelloBoardContainer extends Component {
    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    render() {
        let trelloBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards
        });

        return trelloBoard;
    }
}

TrelloBoardContainer.getStores = () => ([CardStore]);
TrelloBoardContainer.calculateState = (prevState) => ({
    cards: CardStore.getState()
});

export default Container.create(TrelloBoardContainer);
