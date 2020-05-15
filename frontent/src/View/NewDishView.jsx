import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {endpointsClient, endpointsServer} from "../connection/endpoints";
import {withRouter} from 'react-router-dom';
import {Routes} from "../connection/routes";
import {RestRequest} from "../connection/requests";
import {getUserFromStorage} from "../connection/auth";
import {socket} from "../connection/requests";


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
    "marginTop":"10px",
    "marginBottom":"10px",
    ":hover": {
        "backgroundColor": "red",
        "padding": "100px"
    }
};

class NewDishView extends React.Component {

    onSubmit = event => {
        event.preventDefault();
        const name = event.target.elements[0].value;
        const description = event.target.elements[2].value;
        const image_url = event.target.elements[4].value;
        const price = event.target.elements[6].value;
        const restaurant_id = getUserFromStorage().id;
        console.log(getUserFromStorage());
        socket.on(endpointsClient.getNew,()=>{
            this.props.history.push({pathname: Routes.dishes});
            //this.props.history.push(Routes.dishes);
        });
        socket.emit(endpointsServer.postDish, {name, description, image_url, price, restaurant_id});
        /*RestRequest.post(endpointsServer.postDish, {}, {name, description, image_url, price, restaurant_id})
            .then((response) => {
                this.props.history.push(Routes.dishes);
            }).catch(reason => {
            if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
        });*/
    };

    render() {
        return (

            <Container>
                <form noValidate autoComplete='off' onSubmit={this.onSubmit}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Box m={4}>
                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    id='name'
                                    label='name'
                                    placeholder='name'
                                    InputProps={{
                                        style: fieldStyle,
                                    }}/>
                            </Grid>
                        </Box>
                        <Box m={4}>
                            <Grid>
                                <TextField
                                    variant="outlined"
                                    id='description' aria-label='empty textarea' placeholder='description'
                                                  InputProps={{
                                                      style: fieldStyle,
                                                  }}/>
                            </Grid>
                        </Box>
                        <Box m={4}>
                            <Grid>
                                <TextField variant="outlined" id='image_url' aria-label='empty textarea' placeholder='image url'
                                                  InputProps={{
                                                      style: fieldStyle,
                                                  }}/>
                            </Grid>
                        </Box>
                        <Box m={4}>
                            <Grid>
                                <TextField variant="outlined" id='price' aria-label='empty textarea' placeholder='price $'
                                           InputProps={{
                                               style: fieldStyle,
                                           }}/>
                            </Grid>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={signInButtonStyle}
                        >
                            Create
                        </Button>
                    </Grid>
                </form>
            </Container>

        )
    }
}

export default withRouter(NewDishView);
