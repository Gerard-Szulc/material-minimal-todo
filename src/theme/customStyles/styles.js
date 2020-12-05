import {makeStyles} from "@material-ui/core/styles";

const DRAWER_WIDTH = 240;

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    navHeader: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'center'
        }
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    appBar: {
        display: 'flex',
        flexDirection: "row",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },

    bottomPanel: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
        zIndex: 1001
    },
    accordion: {
        // minWidth: '270px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: "relative",
        bottom: '2em',
    },
    toolbar: theme.mixins.toolbar,
    locateButton: {
        zIndex: 9999,
        position: "relative",
        left: '90%'
    },
    appContent: {
        paddingTop: '70px',
        paddingBottom: '5em',
        [theme.breakpoints.up('sm')]: {
            width: `calc(95% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        }
    },
    todoListContainer: {
        width: '100%'
    },
    todoListElement: {
        width: '260px',
        padding: '5px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    todoListSkeleton: {
        width: "100%"
    },
    todoEmptyList: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        height: '200px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
        }
    }
}));

export {styles, DRAWER_WIDTH}
