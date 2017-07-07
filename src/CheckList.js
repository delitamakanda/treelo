import React, { Component } from 'react';

class CheckList extends Component {

    render() {
        let tasks = this.props.tasks.map((task) =>(
            <li>
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href=""></a>
            </li>
        ));

        return (
            <div>
                <ul>
                    {tasks}
                </ul>
            </div>
        );
    }
}

export default CheckList;