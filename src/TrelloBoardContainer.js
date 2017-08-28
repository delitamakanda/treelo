import React, { Component } from 'react';
import TrelloBoard from './TrelloBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';
import { throttle } from './utils';
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

        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
    }

    componentDidMount() {
        fetch(`${API_URL}/cards`, {headers: API_HEADERS})
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                cards: responseData
            });

            window.state = this.state;
        })
        .catch((error) => {
            console.log('error fecthing data', error);
        })
    }

    addCard(card) {
        let prevState = this.state;
        
        if (card.id === null ) {
            let card = Object.assign({}, card, {id: Date.now()});
        }

        let nextState = update(this.state.cards, {$push: [card]});

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(card)
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Server response not okay")
            }
        })
        .then((responseData) => {
            card.id = responseData.id
            this.setState({cards: nextState});
        })
        .catch((error) => {
            this.setState(prevState);
        });
    }

    updateCard(card) {
        let prevState = this.state;

        let cardIndex = this.state.cards.findIndex((c) => c.id == card.id);

        let nextState = update(this.state.cards, {
            [cardIndex]: {$set: card}
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${card.id}`, {
            method: 'PUT',
            headers: API_HEADERS,
            body: JSON.stringify(card)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Server response not okay")
            }
        })
        .catch((error) => {
            console.log('fetch error', error)
            this.setState(prevState);
        });
    }

    addTask(cardId, taskName) {

        let prevState = this.state;

        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

        let newTask = {id: Date.now(), name: taskName, done: false};

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Server response not ok");
            }
        })
        .then((responseData) => {
            newTask.id = responseData.id
            this.setState({cards: nextState});
        })
        .catch((error) => {
            this.setState(prevState);
        });
    }

    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;

        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        });
        this.setState({cards: nextState})
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("server not ok")
            }
        })
        .catch((error) => {
            console.error("fetch error", error)
            this.setState(prevState);
        })
    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newDoneValue;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done) => {
                            newDoneValue = !done
                            return newDoneValue;
                        }}
                    }
                }
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("server not ok", error);
            }
        })
        .catch((error) => {
            console.error("fetch error", error)
            this.setState(prevState);
        });

    }

    updateCardStatus(cardId, listId) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

        let card = this.state.cards[cardIndex];
        
        if (card.status !== listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {$set: listId}
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId, afterId) {
        if (cardId !== afterId) {
            let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

            let card = this.state.cards[cardIndex];

            let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);

            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    persistCardDrag(cardId, status) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

        let card = this.state.cards[cardIndex];

        fetch(`${API_URL}/cards/${cardId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({status: card.status, row_order_position: cardIndex})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('server not ok', error)
            }
        })
        .catch((error) => {
            console.error('fetch error:', error);
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: status }
                    }
                }
            }));
        });

    }

    render() {
        let TrelloBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards,
            taskCallbacks: {
                toggle: this.toggleTask.bind(this),
                delete: this.deleteTask.bind(this),
                add: this.addTask.bind(this)
            },
            cardCallbacks: {
                addCard: this.addCard.bind(this),
                updateCard: this.updateCard.bind(this),
                updateStatus: this.updateCardStatus.bind(this),
                updatePosition: this.updateCardPosition.bind(this),
                persistCardDrag: this.persistCardDrag.bind(this)
            }
        });
        return TrelloBoard;

        {/*return (
            <TrelloBoard cards={this.state.cards}
                        taskCallbacks={{
                            toggle: this.toggleTask.bind(this),
                            delete: this.deleteTask.bind(this),
                            add: this.addTask.bind(this)}}
                            cardCallbacks={{
                                updateStatus: this.updateCardStatus,
                                updatePosition: this.updateCardPosition,
                                persistCardDrag: this.persistCardDrag.bind(this)
                            }} />
        )*/}
    }
}

export default TrelloBoardContainer;
