import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {toggleTodo, changeColor, changeText, saveTodos} from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import {ViewOnlyMap} from "./ViewOnlyMap.js";

const useStyles = makeStyles({
    root: {},
});
let timeoutId
const TodoItem = (props) => {
    const dispatch = useDispatch()

    const classes = useStyles();

    const [text, setText] = useState('')
    const [color, setColor] = useState('')

    const [textValidationVisible, setTextValidationVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)


    const handleColorChange = (colorValue) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            setColor(colorValue)
        }, 500)
    }

    const handleTextChange = (text) => {
        if (text.length > 0) {
            setTextValidationVisible(false)
        }
        setText(text)
    }
    const handleEditVisible = () => {
        setText(props.todoItem.text)
        setColor(props.todoItem.color)
        setEditVisible(true)
    }
    const handleSaveChanges = () => {
        if (text.length === 0) {
            setTextValidationVisible(true)
            return
        }
        dispatch(changeText({id: props.todoItem.id, text}))
        dispatch(changeColor({id: props.todoItem.id, color}))
        dispatch(saveTodos())
        setText('')
        setColor('')
        setEditVisible(false)
    }
    const handleToggleTodo = () => {
        dispatch(toggleTodo(props.todoItem.id))
        dispatch(saveTodos())
    }
    return (
        <Paper elevation={5}>
            <Card className={classes.root}
                  style={{backgroundColor: props.todoItem.color ? props.todoItem.color : '#ffffff'}}>
                <CardContent>
                    {editVisible ? <FormControl error={textValidationVisible}>
                            <InputLabel htmlFor="add-task-text">Text</InputLabel>
                            <Input
                                id="add-task-text"
                                variant="outlined"
                                multiline
                                value={text}
                                onChange={(event) => handleTextChange(event.target.value)}
                                aria-describedby="add-task-error-text"
                            />
                            {textValidationVisible ?
                                <FormHelperText id="add-task-error-text">Some text is required</FormHelperText> : ''}
                            <input
                                type={"color"}
                                value={color}
                                onChange={(event) => handleColorChange(event.target.value)}/>
                            <Button size="small" onClick={handleSaveChanges}>Save</Button>
                        </FormControl> :
                        <Typography title={"Double click to edit"} onDoubleClick={handleEditVisible} variant="h5" component="h2" style={{
                            wordBreak: "break-word", whiteSpace: "pre-wrap"
                        }}>
                            {props.todoItem.text}
                            <br/>
                            {props.todoItem.position ? <ViewOnlyMap position={props.todoItem.position}/>  : ''}
                        </Typography>
                    }
                </CardContent>
                <CardActions>
                    <Checkbox
                        checked={props.todoItem.completed}
                        onChange={() => handleToggleTodo()}
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                </CardActions>
            </Card>
        </Paper>
    );
}
export default connect(null, {toggleTodo, changeColor})(TodoItem)
