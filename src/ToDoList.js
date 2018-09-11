import React, {Component} from 'react'

class TodoList extends Component {
    render() {
        //console.log(this.props.data);
        return (
            <ul>
                {/*{this.props.items.map(item => (*/}
                {/*<li key={item.id}>{item.text}</li>*/}
                {/*))}*/}
                
                {this.props.data.map((item, i) => {
                    return(
                    <li key={i + "top"}>{item.todo}
                        <a key={i + "update"} onClick={() => {
                            this.props.onUpdateComment(item._id);
                        }}> (update or </a>
                        <a key={i + "delete"} onClick={() => {
                            this.props.onDeleteComment(item._id);
                        }}> delete) </a>
                    </li>);
                })}
            </ul>
        );
    }
}

export default TodoList;