import TodoItem from "./TodoItem.js";
import {Container, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";


const selectNotDoneTodos = (filter) => createSelector(
    state => state.todos.todos,
    todos => todos.filter(todo => filter(todo))
)

function TodoList(props) {
    const dispatch = useDispatch()

    const todos = useSelector(selectNotDoneTodos(props.todosCompletionFilter))

    return (
        <div style={{maxWidth: "100vw"}}>
            <Container>
                <Grid container spacing={3}>
                    {todos.length !== 0 ? todos.map(todo => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={`todo-item-${todo.id}`}>
                            <TodoItem todoItem={todo} xs={3}/>
                        </Grid>
                    )) : <Container>No tasks</Container>}
                </Grid>
            </Container>

        </div>

    )
}
export default TodoList
