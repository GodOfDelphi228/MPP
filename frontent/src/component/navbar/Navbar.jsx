import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Routes} from "../../constant/Routes";

import {Link, withRouter} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {AuthContext} from "../AuthProvider";
import IconButton from "@material-ui/core/IconButton";
import {ExitToApp} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {getRouteForCreate} from "../../helper/routeHelper";

class Navbar extends React.Component {
    create = () => {
        this.props.history.push(getRouteForCreate(Routes.editor));
    };

    dishes = () => {
        this.props.history.push(Routes.dishes);
    };
    logout = () => this.context.logout();

    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    {this.context.currentUser ?
                        <>
                            <Button onClick={this.dishes}>
                                Menu
                            </Button>
                            <Button onClick={this.create}>
                                Add dish to menu
                            </Button>
                            <IconButton onClick={this.logout}>
                                <ExitToApp color='secondary'>
                                </ExitToApp>
                            </IconButton>
                        </>
                        :
                        <Link to={Routes.login}>
                            <IconButton>
                                <ExitToApp color='action'/>
                            </IconButton>
                        </Link>

                    }
                </Toolbar>
            </AppBar>)

    }

}

Navbar.contextType = AuthContext;
export default withRouter(Navbar)
