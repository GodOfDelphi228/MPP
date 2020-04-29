import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Routes} from "../connection/routes";

import {Link, withRouter} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {AuthContext} from "../AuthProvider";
import IconButton from "@material-ui/core/IconButton";
import {ExitToApp} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import clsx from 'clsx';

const backColor = "#E0E5EC";
const headerStyle = {
    "background":backColor,
    "boxShadow":"15px 15px 30px #bcbec4, " +
        " -15px -15px 30px #feffff"
};

const buttonStyle = {
    "borderRadius":"15px",
    "margin":"7px",
    "backgroundColor": backColor,
    "boxShadow":"9px 9px 15px #bcbec4, " +
        " -9px -9px 15px #feffff",
    "color":"gray",
    ":hover": {
        "backgroundColor": "red",
        "padding": "100px"
    }
}

const logoutButtonStyle = {
    "borderRadius":"15px",
    "margin":"7px",
    "padding": "4px",
    "backgroundColor": backColor,
    "boxShadow":"9px 9px 15px #bcbec4, " +
        " -9px -9px 15px #feffff",
    "color": 'secondary'
    ,
    ":hover": {
        "backgroundColor": "red",
        "padding": "1000px"
    }
}

class HeaderView extends React.Component {
    create = () => {
        this.props.history.push(Routes.newDish);
    };

    dishes = () => {
        this.props.history.push(Routes.dishes);
    };
    logout = () => this.context.logout();

    render() {
        return (
            <AppBar style={headerStyle} position='static'>
                <Toolbar style={{color: "white"}}>
                    <Button onClick={this.dishes} style={buttonStyle}>
                        Menu
                    </Button>
                    {this.context.currentUser ?
                        <>
                            <Button style={buttonStyle} onClick={this.create}>
                                Add dish
                            </Button>
                            <IconButton onClick={this.logout}>
                                <ExitToApp style={logoutButtonStyle} color='secondary' >
                                </ExitToApp>
                            </IconButton>
                            <Typography>
                                {this.context.currentUser.name}
                            </Typography>
                        </>
                        :
                        <Link to={Routes.login} style={buttonStyle}>
                            <IconButton style={buttonStyle}>
                                <ExitToApp color='action' style={buttonStyle}/>
                            </IconButton>
                        </Link>

                    }
                </Toolbar>
            </AppBar>)

    }

}

HeaderView.contextType = AuthContext;
export default withRouter(HeaderView)
