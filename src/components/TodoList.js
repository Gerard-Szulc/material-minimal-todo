import TodoItem from "./TodoItem.js";
import {Grid} from "@material-ui/core";
import {connect} from "react-redux";

const mapStateToProps = state => {
    const { todos, ...rest } = state
    console.log(todos, rest)
    // const todos = getTodosByVisibilityFilter(state, visibilityFilter)
    return { todos }
}

function TodoList(props) {
    return (
        <Grid container spacing={3}>
            {props.todos.todos ? props.todos.todos.map(el => (
                <Grid item xs={3} key={`todo-item-${el.id}`}>
                    <TodoItem xs={3}>asd</TodoItem>
                </Grid>
            )) : <div>Wait a second</div>}
        </Grid>
    )
}
export default connect(mapStateToProps)(TodoList)
