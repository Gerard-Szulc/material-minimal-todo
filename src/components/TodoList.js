import TodoItem from "./TodoItem.js";
import {Container, Grid, Paper, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectFetchStatus, selectNotDoneTodos} from "../store/selectors";
import Masonry from "react-masonry-component";
import {styles} from "../theme/customStyles/styles.js";
import SkeletonArray from "./SkeletonArray.js";
import {FETCH_PENDING} from "../utils/fetchTypes.js";
import {useTranslation} from "react-i18next";

var masonryOptions = {
    transitionDuration: 200
};
const useStyles = styles

function TodoList(props) {
    const classes = useStyles();

    const todos = useSelector(selectNotDoneTodos(props.todosCompletionFilter))
    const fetchStatus = useSelector(selectFetchStatus())
    const { t } = useTranslation();

    return (
        <div>
            <Container>
                {fetchStatus !== FETCH_PENDING ? (
                        <Grid container spacing={3}>
                            {
                                Array.isArray(todos) && todos.length !== 0 ? (
                                        <Masonry
                                            className={classes.todoListContainer}
                                            elementType={'div'}
                                            options={masonryOptions}
                                        >
                                            {todos.map(todo => (

                                                <Grid xs={12} className={classes.todoListElement} item
                                                      key={`todo-item-${todo.id}`}>
                                                    <TodoItem todoItem={todo} xs={3}/>
                                                </Grid>

                                            ))
                                            }
                                        </Masonry>) :
                                    <Grid item xs={12}>
                                        <Paper elevation={1}>
                                        <Typography variant="h4" className={classes.todoEmptyList}>{t('listPlaceholder')}</Typography>
                                        </Paper>
                                    </Grid>
                            }
                        </Grid>
                    ) :
                    <SkeletonArray/>
                }

            </Container>
        </div>
    )
}

export default TodoList
