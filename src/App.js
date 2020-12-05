import './App.css';
import AppBar from '@material-ui/core/AppBar';
import {ThemeProvider } from "@material-ui/core/styles";
import BottomPanel from "./components/BottomPanel.js";
import {DrawerMenu} from "./components/DrawerMenu.js";
import {Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {toggleMenu} from "./store/actions/actions.js";
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {routes} from "./router/routes.js";
import {SET_TODO_FETCH_REQUESTED} from "./store/actions/actionTypes.js";
import {themeObject} from "./theme/theme.js";
import {styles} from "./theme/customStyles/styles.js";


const useStyles = styles

function handlePermission() {
    navigator.permissions.query({name: 'geolocation'}).then(function (result) {
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
        result.onchange = function () {
            report(result.state);
        }

    });
    navigator.permissions.query({name: 'push', userVisibleOnly: true}).then(function (result) { /* ... */
    });

}

function report(state) {
    console.log('Permission ' + state);
}

handlePermission();

function App() {
    const dispatch = useDispatch()

    const classes = useStyles();
    dispatch({type: SET_TODO_FETCH_REQUESTED})

    const handleDrawerToggle = () => {
        dispatch(toggleMenu())
    }
    return (
        <ThemeProvider theme={themeObject}>
            <BrowserRouter>
                <div className="App">
                    <DrawerMenu drawerPaper={classes.drawerPaper} drawerClass={classes.drawer}/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <h3 className={classes.navHeader}>
                                <Container><Typography>Minimal-Todo</Typography></Container></h3>
                        </Toolbar>
                    </AppBar>
                    <main className={classes.appContent}>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main/>}
                                />
                            ))}
                        </Switch>
                    </main>
                    <BottomPanel/>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
