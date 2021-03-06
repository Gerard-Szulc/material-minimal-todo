import React, {useState} from 'react';
import {toggleTodo, changeColor, changeText, saveTodos} from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";
import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Card,
    Paper,
    Checkbox,
    CardActions,
    CardContent,
    Typography,
    Fab
} from "@material-ui/core";
import {ViewOnlyMap} from "./ViewOnlyMap.js";
import { useTranslation } from 'react-i18next';

let timeoutId
const TodoItem = (props) => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [color, setColor] = useState('')

    const [textValidationVisible, setTextValidationVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const {t} = useTranslation()

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

    const calculateColorBrightness = (itemColor) => {
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        const rgb = hexToRgb(itemColor)
        return rgb !== null ? (Object.values(rgb).reduce((prev, next) => prev + next, 0) > (220 * 3) ? 'black' : 'white') : 'black'
    }

    let isBright = React.useMemo(
        () => calculateColorBrightness(props.todoItem.color),
        [props.todoItem.color]
    )
    return (
        <Paper elevation={5}>
            <Card
                  style={{backgroundColor: props.todoItem.color ? props.todoItem.color : 'default'}}>
                <CardContent>
                    {editVisible ? <FormControl error={textValidationVisible}>
                            <InputLabel htmlFor="add-task-text">{t("addTaskText")}</InputLabel>
                            <Input
                                id="add-task-text"
                                variant="outlined"
                                multiline
                                value={text}
                                onChange={(event) => handleTextChange(event.target.value)}
                                aria-describedby="add-task-error-text"
                            />
                            {textValidationVisible ?
                            <FormHelperText id="add-task-error-text">{t("addTaskTextRequired")}</FormHelperText> : ''}
                            <input
                                type={"color"}
                                value={color}
                                onChange={(event) => handleColorChange(event.target.value)}/>
                        <Button size="small" onClick={handleSaveChanges}>{t('editTaskSave')}</Button>
                        </FormControl> :
                        <Typography title={"Double click to edit"} onDoubleClick={handleEditVisible} variant="h5" component="h2" style={{
                            wordBreak: "break-word", whiteSpace: "pre-wrap", color: isBright
                        }}>
                            {props.todoItem.text}
                            <br/>
                            {props.todoItem.position ? <ViewOnlyMap position={props.todoItem.position}/>  : ''}
                        </Typography>
                    }
                </CardContent>
                <CardActions>
                    <Fab
                        color={"default"}
                        size={"medium"}
                    >
                        <Checkbox
                            checked={props.todoItem.completed}
                            onChange={() => handleToggleTodo()}
                            color={"default"}
                        />
                    </Fab>

                </CardActions>
            </Card>
        </Paper>
    );
}
export default connect(null, {toggleTodo, changeColor})(TodoItem)
