import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import TrelloBoardContainer from './TrelloBoardContainer';
import TrelloBoard from './TrelloBoard';
import EditCard from './EditCard';
import NewCard from './NewCard';

const history = createBrowserHistory();

/*
let cardsList = [
    {
        id: 1,
        title: "Always stay update",
        description: "i want to be *stay update*",
        status: "in-progress",
        color: "#bd8d31",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code anytime everywhere",
        status: "todo",
        color: "#3a7e28",
        tasks: [
            {
                id: 1,
                name: "Trello Example",
                done: true
            },
            {
                id: 2,
                name: "Trello Example",
                done: false
            },
            {
                id: 3,
                name: "A component",
                done: false
            }
        ]
    },
    {
        id: 3,
        title: "New card very very very very long to show the Proptypes validation.",
        description: "Text Example",
        status: "done",
        color: "#bbdd77",
        tasks: []
    },
];


ReactDOM.render(<TrelloBoardContainer />, document.getElementById('root'));*/

render((
    <Router history={ history }>
        <Route component={TrelloBoardContainer}>
            <Route path="/" component={TrelloBoard}>
                <Route path="new" component={NewCard} />
                <Route path="edit/:card_id" component={EditCard} />
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));
