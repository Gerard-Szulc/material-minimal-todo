// import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from "@material-ui/core/styles";
import TodoList from "./components/TodoList.js";
import BottomPanel from "./components/BottomPanel.js";

// const MainAppScreen = styled.main`
// display: flex;
// justify-content: center;
// `
// const Footer = styled.footer`
// position: fixed;
// bottom: 0px;
// width: 100vw;
// `
// const FooterContent = styled.div`
// display: flex;
// justify-content: center;
// width: 100vw;
// `
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
    },
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
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <nav>
        <AppBar position="fixed" className={classes.appBar}>
            <h3 className={classes.navHeader}>Minimal-Todo</h3>
        </AppBar>
      </nav>
      <main className={classes.content}>
        <TodoList/>
      </main>
      <BottomPanel/>
    </div>
  );
}

export default App;
