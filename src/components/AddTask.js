import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {addTodo, saveTodos} from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";
import {Button, FormControl, FormHelperText, Input, InputLabel, FormControlLabel} from "@material-ui/core";
import {LMap} from "./LMap.js";
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    root: {},
    addTaskForm: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    textValidationError: {
        color: "red",
    },
});
const getLocation = (setPosition) => {
    console.log('test')
    navigator.geolocation.getCurrentPosition((location) => {
        setPosition({lat: location.coords.latitude, lng:location.coords.longitude})
    })
}
let timeoutId
const AddTask = (props) => {
    const [text, setText] = useState('')
    const [textValidationVisible, setTextValidationVisible] = useState(false)
    const [color, setColor] = useState('#ffffff')
    const [includePosition, setIncludePosition] = useState(false)
    const [position, setPosition] = useState(null)
    const dispatch = useDispatch()
    const classes = useStyles();
    //
    // useEffect(() => {
    //     getLocation(setPosition)
    // }, [])


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
        dispatch(addTodo({text, color, position}))
        dispatch(saveTodos())
        setText('')
        setColor('#ffffff')
        closeBottom()
    }

    const handleSetIncludePositon = () => {
        if (includePosition) {
            setPosition(null)
        } else {
            getLocation(setPosition)
        }
        setIncludePosition(!includePosition)

    }
    return (
        <form
            className={classes.addTaskForm}
            onSubmit={(e) => {
                e.preventDefault()
                handleAddTask(props.closeFooter)
            }}>
            <FormControl error={textValidationVisible} style={{width: "90%"}}>
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

            </FormControl>
            <InputLabel htmlFor={"add-task-color"}>Color</InputLabel>
            <input
                id={"add-task-color"}
                type={"color"}
                value={color}
                onChange={(event) => handleColorChange(event.target.value)}/>
            <FormControl
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includePosition}
                            onChange={handleSetIncludePositon}
                            name="includePosition"
                            color="primary"
                        />
                    }
                    label="Include location"
                />
            </FormControl>

            {includePosition ? <LMap position={position} handleChangeMarkerPos={(pos) => setPosition(pos)}/> : ''}

            <Button size="small" onClick={() => handleAddTask(props.closeFooter)}>Add</Button>
        </form>
    );
}
export default connect(null, {addTodo})(AddTask)
