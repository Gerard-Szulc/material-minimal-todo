// import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from "@material-ui/core/styles";
import TodoList from "./components/TodoList.js";

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
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      <main className={classes.content}>
        <TodoList></TodoList>
      </main>
    </div>
  );
}

export default App;
