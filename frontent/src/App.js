import React from 'react';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import Navbar from "./component/navbar/Navbar";
import DishList from "./component/dishes/DishList";
import {Routes} from "./constant/Routes";
import CreateDish from "./component/dishes/Editor";
import Registration from "./component/registration/Registration";
import {AuthContext} from "./component/AuthProvider";
import Login from "./component/login/Login";
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {endpoints} from "./constant/endpoints";
import {OnlyGuestRoute} from "./route/OnlyGuestRoute";
import {PrivateRoute} from "./route/PrivateRoute";
import {createHttpLink} from "apollo-link-http";
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: endpoints.graphql,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('Jwt token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Navbar/>
                    <Switch>
                        <OnlyGuestRoute exact path={Routes.login} component={Login}/>
                        <OnlyGuestRoute exact path={Routes.registration} component={Registration}/>
                        <PrivateRoute exact path={Routes.editor} component={CreateDish}/>
                        <PrivateRoute exact path={Routes.dishes} component={DishList}/>
                        <Redirect to={Routes.dishes}/>
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

App.contextType = AuthContext;
export default App;
