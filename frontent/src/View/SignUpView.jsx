import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom';
import {Routes} from '../connection/routes';
import {AuthContext} from "../AuthProvider";
import Alert from "./Alert/Alert";

const backColor = "#E0E5EC";
const fieldStyle = {
    "borderRadius":"15px",
    "background":backColor,
    "boxShadow":"10px 10px 20px #bcbec4, " +
        "-10px -10px 20px #feffff",
};

const signInButtonStyle = {
    "borderRadius":"15px",
    "backgroundColor":backColor,
    "boxShadow":"10px 10px 12px #bcbec4, " +
        "-10px -10px 12px #feffff",
    "marginTop":"20px",
    "marginBottom":"20px",
    ":hover": {
        "backgroundColor": "red",
        "padding": "100px"
    }
};

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null}
    }

    registration = (event) => {
        event.preventDefault();

        const name = event.target.elements[0].value;
        const surname = event.target.elements[2].value;
        const email = event.target.elements[4].value;
        const password = event.target.elements[6].value;
        let resultPromise = this.context.registration(name,surname,email,password);
        resultPromise.then(() => {
            this.props.history.push(Routes.dishes);
        }).catch(reason => {
            this.setState({error: reason.response.data.message})
        });
    };
    render() {
        return (
            <Container component="main" maxWidth="xs">
                {this.state.error ? <Alert severity="error">{this.state.error}</Alert> : <></>}
                <div>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={this.registration}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    InputProps={{
                                        style: fieldStyle,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    InputProps={{
                                        style: fieldStyle,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    InputProps={{
                                        style: fieldStyle,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{
                                        style: fieldStyle,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                            style={signInButtonStyle}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to={Routes.login} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }

}
Registration.contextType = AuthContext;
export default withRouter(Registration)
