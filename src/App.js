import './App.css';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from "@material-ui/core/styles";
import BottomPanel from "./components/BottomPanel.js";
import {DrawerMenu} from "./components/DrawerMenu.js";
import {Container, IconButton, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {toggleMenu} from "./store/actions/actions.js";
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {routes} from "./router/routes.js";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    navHeader: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'center'
        }
    },
    content: {
        paddingTop: '70px',
        paddingBottom: '5em',
        [theme.breakpoints.up('sm')]: {
            width: `calc(95% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        display: 'flex',
        flexDirection: "row",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    bottomPanel: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    }
}));

function handlePermission() {
    navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state === 'granted') {
            report(result.state);
            // geoBtn.style.display = 'none';
        } else if (result.state === 'prompt') {
            report(result.state);
            // geoBtn.style.display = 'none';
            navigator.geolocation.getCurrentPosition((loc) => console.log('perm allowed', loc));
        } else if (result.state === 'denied') {
            report(result.state);
            // geoBtn.style.display = 'inline';
        }
        result.onchange = function() {
            report(result.state);
        }

    });
    navigator.permissions.query({ name: 'push', userVisibleOnly:true }).then(function(result) { /* ... */ });

}

function report(state) {
    console.log('Permission ' + state);
}

handlePermission();

function App() {
    const dispatch = useDispatch()

    const classes = useStyles();
    dispatch({type: 'TODO_FETCH_REQUESTED'})

    const handleDrawerToggle = () => {
        dispatch(toggleMenu())
    }
    return (
        <BrowserRouter>
            <div className="App">
                <DrawerMenu drawerPaper={classes.drawerPaper} drawerClass={classes.drawer}/>
                <AppBar position="fixed" className={classes.appBar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <h3 className={classes.navHeader}><Container><Typography>Minimal-Todo</Typography></Container></h3>
                </AppBar>
                <main className={classes.content}>
                    <Switch>
                    {routes.map((route, index) => (
                        // Render more <Route>s with the same paths as
                        // above, but different components this time.
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            children={<route.main />}
                        />
                    ))}
                    </Switch>
                </main>
                <BottomPanel drawerWidth={drawerWidth}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
