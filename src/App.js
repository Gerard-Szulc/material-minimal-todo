import './App.css';
import React, {useState} from "react";
import BottomPanel from "./components/BottomPanel.js";
import {DrawerMenu} from "./components/DrawerMenu.js";

import {ThemeProvider} from "@material-ui/core/styles";
import {
    Button,
    Container,
    IconButton,
    Snackbar,
    Toolbar,
    Typography,
    AppBar,
    Select,
    MenuItem,
    useMediaQuery, CssBaseline
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import {themeObject} from "./theme/theme.js";
import {styles} from "./theme/customStyles/styles.js";

import {useDispatch, useSelector} from "react-redux";
import {toggleMenu} from "./store/actions/actions.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {SET_TODO_FETCH_REQUESTED} from "./store/actions/actionTypes.js";

import {isServiceWorkerUpdated, serviceWorkerRegistration} from "./store/selectors";

import {routes} from "./router/routes.js";
import {useTranslation} from 'react-i18next';


const useStyles = styles

function handlePermission() {
    if (navigator.hasOwnProperty('permissions')) {
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
}

function report(state) {
    console.log('Permission ' + state);
}

handlePermission();

function App() {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            themeObject({prefersDarkMode}),
        [prefersDarkMode],
    );

    const {t, i18n} = useTranslation();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const serviceWorkerRegistrationSelector = useSelector(serviceWorkerRegistration());
    const isServiceWorkerUpdatedSel = useSelector(isServiceWorkerUpdated());

    const classes = useStyles();
    dispatch({type: SET_TODO_FETCH_REQUESTED})

    const handleDrawerToggle = () => {
        dispatch(toggleMenu())
    }

    const handleUpdateSW = () => {
        const registrationWaiting = serviceWorkerRegistrationSelector.waiting;
        if (registrationWaiting) {
            registrationWaiting.postMessage({type: 'SKIP_WAITING'});
            registrationWaiting.addEventListener('statechange', e => {
                if (e.target.state === 'activated') {
                    window.location.reload();
                }
            });
        }
    }
    const handleCloseUpdateSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const handleChangeLang = async (e) => {
        console.log(e)
        e.preventDefault()
        try {
            await i18n.changeLanguage(e.target.value)

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline />
                <div className={classes.root}>
                    <DrawerMenu drawerPaper={classes.drawerPaper} drawerClass={classes.drawer}/>
                    <AppBar id={'appBar'} position="fixed" className={'main-app-bar'}>
                        <Toolbar className={classes.specialSuperToolbar}>
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
                            {
                                i18n && i18n.options && i18n.options.supportedLngs ? (<Select onChange={handleChangeLang} value={i18n.language}>
                                   {i18n.options.supportedLngs.length !== 0 ? i18n.options.supportedLngs.filter(el => !el.includes('cimode')).map(value => <MenuItem key={`lang-${value}`} value={value}>{value}</MenuItem>) : ''}
                               </Select>) : ''
                            }

                        </Toolbar>
                    </AppBar>
                    <main className={classes.appContent}>
                        <Switch>
                            {routes(t).map((route) => (
                                <Route
                                    key={`route-${route.name}`}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main/>}
                                />
                            ))}
                        </Switch>
                    </main>
                    <BottomPanel/>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={isServiceWorkerUpdatedSel && open}
                        onClose={handleCloseUpdateSnackBar}
                        message={t('pwaReadyToUpdate')}
                        action={
                            <React.Fragment>
                                <Button color="secondary" size="small" onClick={handleUpdateSW}>
                                    {t('pwaUpdateApp')}
                                </Button>
                                <IconButton size="small" aria-label="close" color="inherit"
                                            onClick={handleCloseUpdateSnackBar}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
