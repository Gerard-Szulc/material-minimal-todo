import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { toggleTodo } from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";
import store from '../store/reducer.js'
const useStyles = makeStyles({
    root: {
    },
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

 const TodoItem = (props) => {
     const dispatch = useDispatch()

     console.log('item', props)
    const classes = useStyles();
    return (
        <Paper elevation={5}>
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.todoItem.text}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                </Typography>
            </CardContent>
            <CardActions>
                <Checkbox
                    checked={props.todoItem.completed}
                    onChange={() => dispatch(toggleTodo(props.todoItem.id))}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                {/*<Button size="small">Learn More</Button>*/}
            </CardActions>
        </Card>
        </Paper>
    );
}
export default connect(null, { toggleTodo })(TodoItem)
