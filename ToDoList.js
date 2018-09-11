import React, {Component} from 'react'

class TodoList extends Component {
    render() {
        return (
            <ul>
                {/*{this.props.items.map(item => (*/}
                {/*<li key={item.id}>{item.text}</li>*/}
                {/*))}*/}

                {this.props.data.map(item => (
                    <li key={item._id}>{item.todo}
                        <a onClick={() => { this.props.onUpdateComment(item._id); }}> (update or </a>
                        <a onClick={() => { this.props.onDeleteComment(item._id); }}> delete) </a>
                    </li>
                ))}
            </ul>
        );
    }
}

export default TodoList