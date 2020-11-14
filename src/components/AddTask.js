import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {toggleTodo, changeColor, addTodo} from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";
import {Button} from "@material-ui/core";

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
const AddTask = (props) => {
    const [text, setText] = useState('')
    const [color, setColor] = useState('#ffffff')
    const dispatch = useDispatch()

    const classes = useStyles();


    const handleColorChange = (changedColor) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            setColor(changedColor)
        }, 100)
    }
    const handleTextChange = (text) => {
       setText(text)
    }
    const handleAddTask = () => {
        dispatch(addTodo({text, color}))
        setText('')
        setColor('#ffffff')
    }
    return (
        <Paper elevation={5}>
            <Card className={classes.root}>
                <CardContent>
                </CardContent>
                <CardActions>
                    <input
                        type={"text"}
                        value={text}
                        onChange={(event) => handleTextChange(event.target.value)}/>
                    <input
                        type={"color"}
                        value={color}
                        onChange={(event) => handleColorChange(event.target.value)}/>
                    <Button size="small" onClick={handleAddTask}>Add</Button>
                </CardActions>
            </Card>
        </Paper>
    );
}
export default connect(null, {addTodo})(AddTask)
