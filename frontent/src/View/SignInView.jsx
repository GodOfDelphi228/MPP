import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
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
    "marginTop":"15px",
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


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null}
    }

    login = (event) => {
        event.preventDefault();
        const email = event.target.elements[0].value;
        const password = event.target.elements[2].value;
        let resultPromise = this.context.login(email, password);
        resultPromise.then(() => {
            this.props.history.push(Routes.dishes);
        }).catch(reason => {
            this.setState({error: reason.response.data.message})
        });
    };

    render() {
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                {this.state.error ? <Alert severity="error">{this.state.error}</Alert> : <></>}
                <div>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <form noValidate onSubmit={this.login}>
                        <TextField
                            variant="outlined"
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            InputProps={{
                                style: fieldStyle,
                            }}
                        />
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
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            //color='primary'
                            style={signInButtonStyle}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to={Routes.registration} variant='body2'>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

Login.contextType = AuthContext;
export default withRouter(Login)
