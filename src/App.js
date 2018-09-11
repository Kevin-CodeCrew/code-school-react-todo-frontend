import React, {Component} from 'react'
// import DATA from './data';
import TodoList from "./ToDoList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/api/todos/test')
            .then(data => data.json())
            .then(response => this.setState({data: response}));
    }

    onUpdateComment = (id) => {
        // const oldComment = this.state.data.find(c => c._id === id);
        // if (!oldComment) return;
        // this.setState({ author: oldComment.author, text: oldComment.text, updateId: id });
        console.log("Update id: " + id);
    }

    onDeleteComment = (id) => {
        const i = this.state.data.findIndex(c => c._id === id);
        const data = [
            ...this.state.data.slice(0, i),
            ...this.state.data.slice(i + 1),
        ];
        this.setState({data});

        fetch("/api/todo/",
            {
                method: "DELETE",
                body: JSON.stringify({"id": id})
            })
            .then(data => data.json())
            .then((res) => {
                if (!res.success) this.setState({error: res.error});
            });
    };

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }

        const updatedData =
            {
                "username": "test",
                "todo": this.state.text,
                "isDone": "false"
            };
        const data = [...this.state.data, updatedData];
        this.setState({data});

        fetch('/api/todo/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData),
        })
            .then(data => data.json())
            .then((res) => {
                if (!res.success) this.setState({error: res.error});
            });

        // const newItem = {
        //     text: this.state.text,
        //     id: Date.now()
        // };
        //
        // this.setState(state => ({
        //     items: state.items.concat(newItem),
        //     text: ''
        // }));
    }

    render() {
        return (
            <div>
            <h3>TODO</h3>
            <TodoList data={this.state.data} onUpdateComment={this.onUpdateComment}
        onDeleteComment={this.onDeleteComment} key={this.state.data._id}/>
        {/*<TodoList data={DATA} items={this.state.items} />*/}
    <form onSubmit={this.handleSubmit}>
    <label htmlFor="new-todo">
            What needs to be done?
    </label>
        <input
        id="new-todo"
        onChange={this.handleChange}
        value={this.state.text}
        />
        <button>
        Add Task
        </button>
        </form>
        </div>
    );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }
}

export default App;