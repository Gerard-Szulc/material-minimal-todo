import {
    ClickAwayListener,
    Accordion,
    Fab,
    Grid
} from "@material-ui/core";
import {Add, Remove} from '@material-ui/icons';

import AddTask from "./AddTask.js";
import {useState} from "react";
import {styles} from "../theme/customStyles/styles.js";



const useStyles = styles


const BottomPanel = (props) => {
    const classes = useStyles();

    const [addVisible, setAddVisibility] = useState(false)

    const handleFormVisibility = (ev) => {
        setAddVisibility(prevState => !prevState)
    }

    const handleFooterClose = () => {
        setAddVisibility(false)
    }

    return (
        <footer className={classes.bottomPanel}>
            <ClickAwayListener onClickAway={(event) => handleFooterClose()}>
                <Grid container spacing={3}
                      style={{display: "flex", justifyContent: "center"}}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>

                        <Accordion expanded={addVisible} className={addVisible ? ".with-shadow" : ""} elevation={20}>
                            <div className={classes.accordion}>
                                <Fab id={"add-task-form--show-button"} color="secondary" aria-label="add" onClick={handleFormVisibility}
                                     className={addVisible ? 'opened' : 'default'}>
                                    {addVisible ? <Remove/> : <Add/>}
                                </Fab>
                            </div>
                            <AddTask closeFooter={handleFooterClose}/>
                        </Accordion>
                    </Grid>
                </Grid>
            </ClickAwayListener>
        </footer>
    )
}

export default BottomPanel
