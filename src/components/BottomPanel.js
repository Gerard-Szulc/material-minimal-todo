import AppBar from "@material-ui/core/AppBar";
import {
    AccordionDetails,
    Accordion,
    Fab,
    Toolbar,
    Typography,
    AccordionSummary
} from "@material-ui/core";
import {Add, Remove, ExpandMore} from '@material-ui/icons';

import AddTask from "./AddTask.js";
import {useState} from "react";

const BottomPanel = () => {

    const [addVisible, setAddVisibility] = useState(false)

    const handleFormVisibility = (ev) => {
        setAddVisibility(prevState => !prevState)
    }

    return (
        <footer>
                <AppBar component={"div"} position="fixed" color="primary" variant={"outlined"}  className={"app-bar"}>
                    <Toolbar>
                        <Fab color="secondary" aria-label="add" onClick={handleFormVisibility} className={addVisible ? 'default' : 'opened'}>
                            {addVisible ? <Remove/> : <Add />}
                        </Fab>
                    </Toolbar>
                </AppBar>
                <Accordion expanded={addVisible}  className={addVisible ? ".with-shadow" : "" } elevation={20}>
                    <AccordionSummary
                        onClick={handleFormVisibility}
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography onClick={handleFormVisibility}>Add Task</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AddTask/>
                    </AccordionDetails>
                </Accordion>
                {/*<Snackbar open={notificationVisible} autoHideDuration={2000} onClose={handleCloseNotification}>*/}
                {/*  <Alert onClose={handleCloseNotification} severity={notificationMode}>*/}
                {/*    {notificationText}*/}
                {/*  </Alert>*/}
                {/*</Snackbar>*/}
        </footer>
    )
}

export default BottomPanel
