import TodoItem from "./TodoItem.js";
import {Grid} from "@material-ui/core";
import {connect} from "react-redux";

const mapStateToProps = state => {
    const { todos } = state
    return { todos }
}

function TodoList(props) {
    return (
        <Grid container spacing={3}>
            {props.todos.todos ? props.todos.todos.map(todo => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={`todo-item-${todo.id}`}>
                    <TodoItem todoItem={todo} xs={3}/>
                </Grid>
            )) : <div>Wait a second</div>}
        </Grid>
    )
}
export default connect(mapStateToProps)(TodoList)
