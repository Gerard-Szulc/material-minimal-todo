import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {toggleTodo, changeColor} from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";

const useStyles = makeStyles({
    root: {},
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
let timeoutId
const TodoItem = (props) => {
    const dispatch = useDispatch()

    const classes = useStyles();


    const handleColorChange = (color) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch(changeColor({id: props.todoItem.id, color}))
        }, 500)
    }
    return (
        <Paper elevation={5}>
            <Card className={classes.root} style={{backgroundColor: props.todoItem.color ? props.todoItem.color : '#ffffff'}}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.todoItem.text}
                    </Typography>
                    {/*<Typography className={classes.pos} color="textSecondary">*/}
                    {/*    adjective*/}
                    {/*</Typography>*/}
                </CardContent>
                <CardActions>
                    <Checkbox
                        checked={props.todoItem.completed}
                        onChange={() => dispatch(toggleTodo(props.todoItem.id))}
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                    <input
                        type={"color"}
                        value={props.todoItem.color ? props.todoItem.color : '#ffffff'}
                        onChange={(event) => handleColorChange(event.target.value)}/>
                    {/*<Button size="small">Learn More</Button>*/}
                </CardActions>
            </Card>
        </Paper>
    );
}
export default connect(null, {toggleTodo, changeColor})(TodoItem)
