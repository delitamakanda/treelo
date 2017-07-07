import React, { Component } from 'react';

class GroceryList extends Component {

    render() {
        return (
            <ul>
                <ListItem quantity="1" name="Macbook" />
                <ListItem quantity="2" name="Cafe" />
                <ListItem quantity="320" name="Video Youtube" />
            </ul>
        );
    }
}

class ListItem extends Component {
    render() {
        return (
            <li>
            { this.props.quantity } x { this.props.name }
            </li>
        );
    }
}

export default GroceryList;