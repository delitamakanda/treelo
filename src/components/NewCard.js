import React, { Component } from 'react';
import CardForm from './CardForm';
import CardActionCreators from '../actions/CardActionCreators';
import DraftStore from '../store/DraftStore';
import { Container } from 'flux/utils';

class NewCard extends Component {

    componentDidMount() {
        setTimeout(() => CardActionCreators.createDraft(), 0)
    }

    handleChange(field, value) {
        CardActionCreators.updateDraft(field, value);
    }

    handleSubmit(e) {
        e.preventDefault();
        CardActionCreators.addCard(this.state.draft);
        this.props.history.pushState(null,'/');
    }

    handleClose(e) {
        this.props.history.pushState(null,'/');
    }


    render() {
        return (
            <CardForm draftCard={this.state.draft}
                        buttonLabel="Create Card"
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        handleClose={this.handleClose.bind(this)} />
        );
    }
}

NewCard.getStores = () => ([DraftStore]);
NewCard.calculateState = (prevState) => ({
    draft: DraftStore.getState()
});

export default Container.create(NewCard);
