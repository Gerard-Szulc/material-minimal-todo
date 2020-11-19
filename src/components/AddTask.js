import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {addTodo, saveTodos} from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";

const useStyles = makeStyles({
    root: {},
    addTaskForm: {
        width: "100%",
        display:"flex",
        flexDirection: "column",
        alignItems: "center"
    },
    textValidationError: {
        color: "red",
    },
});
let timeoutId
const AddTask = (props) => {
    const [text, setText] = useState('')
    const [textValidationVisible, setTextValidationVisible] = useState(false)
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
        if (text.length > 0) {
            setTextValidationVisible(false)
        }
        setText(text)
    }
    const handleAddTask = (closeBottom) => {
        if (text.length === 0) {
            setTextValidationVisible(true)
            return
        }
        dispatch(addTodo({text, color}))
        dispatch(saveTodos())
        setText('')
        setColor('#ffffff')
        closeBottom()
    }

    return (
        <form
            className={classes.addTaskForm}
            onSubmit={(e) => {
            e.preventDefault()
            handleAddTask(props.closeFooter)
        }}>
            <FormControl error={textValidationVisible}>
                <InputLabel htmlFor="add-task-text">Text</InputLabel>
                <Input
                    id="add-task-text"
                    variant="outlined"
                    multiline
                    value={text}
                    onChange={(event) => handleTextChange(event.target.value)}
                    aria-describedby="add-task-error-text"
                />
                {textValidationVisible ? <FormHelperText id="add-task-error-text">Some text is required</FormHelperText> : ''}

            </FormControl>
            <label htmlFor={"add-task-text"}>Color</label>
            <input
                id={"add-task-color"}
                type={"color"}
                value={color}
                onChange={(event) => handleColorChange(event.target.value)}/>
            <Button size="small" onClick={() => handleAddTask(props.closeFooter)}>Add</Button>
        </form>
    );
}
export default connect(null, {addTodo})(AddTask)
