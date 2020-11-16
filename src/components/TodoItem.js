import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {toggleTodo, changeColor, addTodo, changeText} from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";

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
        setText('')
        setColor('')
        setEditVisible(false)
    }
    return (
        <Paper elevation={5}>
            <Card className={classes.root} style={{backgroundColor: props.todoItem.color ? props.todoItem.color : '#ffffff'}}>
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
                        {textValidationVisible ? <FormHelperText id="add-task-error-text">Error</FormHelperText> : ''}
                        <input
                            type={"color"}
                            value={color}
                            onChange={(event) => handleColorChange(event.target.value)}/>
                        <Button size="small" onClick={handleSaveChanges}>Save</Button>
                    </FormControl> : <Typography onDoubleClick={handleEditVisible} variant="h5" component="h2" style={{wordBreak: "break-word", whiteSpace: "pre-wrap"
                    }}>
                        {props.todoItem.text}
                    </Typography>
                    }
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
                </CardActions>
            </Card>
        </Paper>
    );
}
export default connect(null, {toggleTodo, changeColor})(TodoItem)
