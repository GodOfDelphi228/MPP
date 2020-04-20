import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import HeaderView from "./View/HeaderView";
import DishList from "./View/DishList";
import {Routes} from "./connection/routes";
//import CreateNews from "./component/news/CreateNews";
import {AuthContext} from "./AuthProvider";
import SignIn from "./View/SignInView";
import SignUp from "./View/SignUpView";
import NewDish from "./View/NewDishView";
import DishPageView from "./View/DishPageView";


const port = 3003;
class App extends React.Component {
    render() {
        return (
            <div className="App" style={{backgroundColor: "#E0E5EC"}}>
                <BrowserRouter>
                    <HeaderView/>
                    {this.context.currentUser ?
                        <Switch>
                            <Route exact path={Routes.newDish} component={NewDish}/>
                            <Route exact path={Routes.dishes} component={DishList}/>
                            <Route exact path={Routes.login} component={SignIn}/>
                            <Route exact path={Routes.registration} component={SignUp}/>
                            <Redirect to={Routes.dishes}/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path={Routes.dishes} component={DishList}/>
                            <Route exact path={Routes.login} component={SignIn}/>
                            <Route exact path={Routes.registration} component={SignUp}/>
                            <Redirect to={Routes.login}/>
                        </Switch>
                    }
                </BrowserRouter>
            </div>
        );
    }
}
App.contextType = AuthContext;
export default App;

/*
/*
export class Main extends Component {
    mmm() {
        return (<>
                <div className="news-container" id="NewsContainer">
                    <a href="http://localhost:3003/url"> url </a>
                </div>
            </>
        );
    }
    render(){
        console.log("Main");
        ReactDOM.render((<>{this.mmm()}</>), document.getElementById("NewsBody"));
        console.log("Main2");
        //this.initListeners();
        //this.loadNews()
        return (
            <></>
        );
    }
}*/
/*
function App() {
    function getJson() {
        return <a href = "http://localhost:3003/dishes">Dishes</a>
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <Main />
    </div>
  );
}

export default App;


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <p>111111111</p>
                <BrowserRouter>
                    <Route exact path={Routes.dishes} component={DishList}/>
                    <Redirect to={Routes.dishes}/>
                </BrowserRouter>
            </div>
        );
    }
};
//App.contextType = AuthContext;
export default App;
*/