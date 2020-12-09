import Drawer from '@material-ui/core/Drawer';
import {Divider, List, useTheme, ListItem, ListItemIcon, ListItemText, Hidden} from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {toggleMenu} from "../store/actions/actions.js";
import {useDispatch, useSelector} from "react-redux";
import {routes} from "../router/routes.js";
import {useHistory} from "react-router-dom";
import {styles} from "../theme/customStyles/styles.js";
import {mobileOpenSelect} from "../store/selectors";
import {useTranslation} from "react-i18next";


const useStyles = styles



export const DrawerMenu = (props) => {

    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const mobileOpen = useSelector(mobileOpenSelect())
    let history = useHistory()

    const handleDrawerToggle = () => {
        dispatch(toggleMenu())
    };

    const handleChangeRoute = ({path}) => {
        history.push(path);
        if (mobileOpen) {
            handleDrawerToggle()
        }
    }
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {routes(t).map((route, index) => (
                    <ListItem id={`route-button-${route.name}`} button  key={`${route.path}-${index}`} onClick={() => handleChangeRoute(route)}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={route.sidebar()}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={props.drawerClass} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: props.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: props.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}
