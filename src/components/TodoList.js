import TodoItem from "./TodoItem.js";
import {Container, Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import Skeleton from '@material-ui/lab/Skeleton';


const selectNotDoneTodos = (filter) => createSelector(
    state => state.todos.todos,
    todos => todos.filter(todo => filter(todo))
)

function TodoList(props) {
    const todos = useSelector(selectNotDoneTodos(props.todosCompletionFilter))

    return (
        <div style={{maxWidth: "100vw"}}>
            <Container>
                <Grid container spacing={3}>
                    {todos.length !== 0 ? todos.map(todo => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={`todo-item-${todo.id}`}>
                            <TodoItem todoItem={todo} xs={3}/>
                        </Grid>
                    )) :
                        [1,2,3,4].map(el => <Grid item xs={12} sm={6} md={4} lg={3} key={`todo-skeleton-item-${el}`}>
                            <Skeleton animation={false} variant="text" xs={12} sm={6} md={4} lg={3}/>
                            <Skeleton animation={false} variant="rect" height={118} xs={12} sm={6} md={4} lg={3}/>
                        </Grid>)

                    }
                </Grid>
            </Container>

        </div>

    )
}
export default TodoList
