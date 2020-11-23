import {
    ClickAwayListener,
    Accordion,
    Fab,
    Grid
} from "@material-ui/core";
import {Add, Remove} from '@material-ui/icons';

import AddTask from "./AddTask.js";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    accordion: {

        // minWidth: '270px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: "relative",
        bottom: '2em',
    },
    bottomPanel: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        zIndex: 1001

    }
}));


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
                                <Fab color="secondary" aria-label="add" onClick={handleFormVisibility}
                                     className={addVisible ? 'default' : 'opened'}>
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
