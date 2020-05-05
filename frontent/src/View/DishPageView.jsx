import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {endpointsClient, endpointsServer} from "../connection/endpoints";
import {RestRequest, socket} from "../connection/requests";
import {AuthContext} from "../AuthProvider";
import { withRouter } from "react-router-dom";
import {Routes} from "../connection/routes";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import {getUserFromStorage} from "../connection/auth";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

const backColor = "#E0E5EC";
const fieldStyle = {
    "borderRadius":"15px",
    "background":backColor,
    "boxShadow":"10px 10px 20px #bcbec4, " +
        "-10px -10px 20px #feffff",
};

const progressBarStyle = {
    "borderRadius":"7%",
    "background": "#EC8800",
    "boxShadow":"inline 5px 5px 10px #bcbec4, " +
        "inline -5px -5px 10px #feffff"
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

const removeButtonStyle = {
    "borderRadius":"15px",
    "background":"EC002B",
    "boxShadow":"10px 10px 30px #bcbec4, " +
        " -10px -10px 30px #feffff",
    "margin": "10px"
};

const cardStyle = {
    "borderRadius":"7%",
    "background":backColor,
    "boxShadow":"10px 10px 30px #bcbec4, " +
        " -10px -10px 30px #feffff",
    "marginTop": "60px"
};

const imageStyle = {
    "maxWidth": "70%",
    "borderRadius":"15px",
    "background":backColor,
    "boxShadow":"15px 15px 30px #bcbec4, " +
        " -15px -15px 30px #feffff"
};

const no_url_placeholder = "no_image_url";

class DishPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, dish: {}};
        //console.log(this.state);
        //this.state = {dish: props.dish};
        //const xui = this.props.match.params;
        //console.log("xxx" + this.props.match.params.dish);
        //this.state = {dish: this.props.match.params.dish };;
    }

    componentDidMount() {
        this._isMounted = true;
        const id = this.props.match.params.id;
        console.log("Mounting dish page view: " + id);
        if (id) {
            this.getDish(id);
        }
    }

    getDish = (id) => {
        //let params = {
        //    id: getUserFromStorage().id
        //};
        socket.on(endpointsClient.getDelete, (data) => {
            console.log(data.payload);
            this.setState({loading: false, dish: data.payload});
        });
        socket.emit(endpointsServer.getDish, id);
        /*RestRequest.get(endpoints.getSensor(id), {}, {}).then((response) => {
            if (this._isMounted) {
                this.setState({sensor: response.data, isValid: this.getAllValid(true)})
            }
        });*/
    }

    onSubmit = event => {
        event.preventDefault();
        let dish = this.state.dish;
        const name = event.target.elements[0].value;
        const description = event.target.elements[2].value;
        console.log(event.target.elements[4].value === no_url_placeholder);
        const image_url = (event.target.elements[4].value === no_url_placeholder) ? ""
            : event.target.elements[4].value;
        const price = event.target.elements[6].value;
        const restaurant_id = getUserFromStorage().id;
        dish.name = name;
        dish.description = description;
        dish.image_url = image_url;
        dish.price = price;
        dish.restaurant_id = restaurant_id;
        console.log(dish);
        socket.on(endpointsClient.updated, (data) => {
            this.props.history.push({pathname: Routes.dishes});
        });
        socket.emit(endpointsServer.putDish,dish);

        /*RestRequest.post(endpointsServer.postDish, {}, {name, description, image_url, price, restaurant_id})
            .then((response) => {
                this.props.history.push(Routes.dishes);
            }).catch(reason => {
            if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
        });*/
    };

    delete = () => {
        if (this.context.currentUser) {
            socket.on(endpointsClient.getDelete, (data) => {
                //console.log(data.payload);
                //this.setState({loading: false, dish: data.payload, order});
                this.props.history.push({pathname: Routes.dishes});
            });
            let dish = this.state.dish;
            console.log(dish);
            socket.emit(endpointsServer.deleteDish, dish._id);
        }
    };

    increasePrice = () => {
        if (this.context.currentUser) {
            let dish = this.props.dish;
            dish.price++;
            /*RestRequest.put(endpointsServer.putDish(this.props.dish['_id']), {}, dish).then(response => {
                let dish = this.state.dish;
                dish.price = response.data.payload.price;
                this.setState({dish: dish});
            }).catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
            });*/
            socket.on(endpointsClient.updated, (data) => {
                console.log(data);
                if (data.status === 401 || data.status === 403) this.props.history.push(Routes.login);
                dish.likes = data.payload.likes;
                this.setState(dish);
            });
            socket.emit(endpointsServer.putDish,dish);
        }

    };

    decreasePrice = () => {
        if (this.context.currentUser) {
            let dish = this.props.dish;
            dish.price--;
            /*RestRequest.put(endpointsServer.putDish(this.props.dish['_id']), {}, dish).then(response => {
                let dish = this.state.dish;
                dish.price = response.data.payload.price;
                this.setState({dish: dish});
            }).catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
            });*/
            socket.on(endpointsClient.updated, (data) => {
                console.log(data);
                if (data.status === 401 || data.status === 403) this.props.history.push(Routes.login);
                dish.likes = data.payload.likes;
                this.setState(dish);
            });
            socket.emit(endpointsServer.putDish,dish);
        }

    };

    backTap = () => {
        this.props.history.push({pathname: Routes.dishes});
    }

    render() {
        let loading = this.state.loading;
        let dish = this.state.dish;
        return (

            <Box m={1}>
                <Toolbar style={{color: "white"}}>
                    <Button onClick={this.backTap}>
                        Back
                    </Button>
                </Toolbar>
                <Container maxWidth={"sm"} style={{columnCount: 1}}>
                    <Box>
                        <Container>
                            {loading ? <LinearProgress style={progressBarStyle}/> :
                                <form noValidate autoComplete='on' onSubmit={this.onSubmit}>
                                <Card style={cardStyle}>
                                    <CardHeader title="Edit" style={{"size": "32px", fontWeight: 'bold', "color": "#555555"}}/>
                                    <CardContent>
                                        <Box m={2}>
                                            <Grid>
                                                <TextField
                                                    onChange={ event => {
                                                        console.log(event.target.value);
                                                        dish.name = event.target.value;
                                                        this.setState({dish: dish })
                                                    }
                                                    }
                                                    variant="outlined"
                                                    id='name'
                                                    label='name'
                                                    value={dish ? dish.name : 'no_name'}
                                                    placeholder={dish ? dish.name : 'no_name'}
                                                    InputProps={{
                                                        style: fieldStyle,
                                                    }}
                                                />
                                            </Grid>
                                        </Box>

                                        <Box m={2}>
                                            <Grid>
                                                <TextField
                                                    onChange={ event => {
                                                        console.log(event.target.value);
                                                        dish.description = event.target.value;
                                                        this.setState({dish: dish })
                                                    }
                                                    }
                                                    variant="outlined"
                                                    id='description'
                                                    label='description'
                                                    value={dish ? dish.description : 'no_description'}
                                                    InputProps={{
                                                        style: fieldStyle,
                                                    }}
                                                />
                                            </Grid>
                                        </Box>

                                        <Box m={2}>
                                            <Grid>
                                                <TextField
                                                    onChange={ event => {
                                                        console.log(event.target.value);
                                                        dish.image_url = event.target.value;
                                                        this.setState({dish: dish })
                                                    }
                                                    }
                                                    variant="outlined"
                                                    id='image_url'
                                                    label='image url'
                                                    value={dish.image_url ? dish.image_url : no_url_placeholder}
                                                    InputProps={{
                                                        style: fieldStyle,
                                                    }}
                                                />
                                            </Grid>
                                        </Box>
                                        <Box m={2}>
                                            <Grid>
                                                <TextField
                                                    onChange={ event => {
                                                        console.log(event.target.value);
                                                        dish.price = event.target.value;
                                                        this.setState({dish: dish })
                                                    }
                                                    }
                                                    variant="outlined"
                                                    id='price'
                                                    label='price'
                                                    value={dish ? dish.price : 'no_price'}
                                                    InputProps={{
                                                        style: fieldStyle,
                                                    }}
                                                />
                                            </Grid>
                                        </Box>
                                        <img style={imageStyle}
                                             src={(dish.image_url && !(dish.image_url === no_url_placeholder)) ? dish.image_url :
                                                 "https://static.vecteezy.com/system/resources/previews/000/129/724/non_2x/free-fast-food-vector.png"}
                                        />
                                        {/*<Typography variant="body2" color="textSecondary" component="p">
                                        {this.props.dish ? this.props.dish.description : "description"}
                                    </Typography>*/}
                                    </CardContent>
                                    <CardActions>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            style={signInButtonStyle}
                                        >
                                            Save
                                        </Button>
                                        {
                                            this.context.currentUser
                                                ?
                                                <Button onClick={this.delete} style={removeButtonStyle} color='secondary'>
                                                    Remove
                                                </Button>
                                                :
                                                <></>
                                        }

                                    </CardActions>
                                </Card>
                                </form>
                            }
                        </Container>
                    </Box>
                </Container>
            </Box>

        )

    }
}

DishPageView.contextType = AuthContext;
export default withRouter(DishPageView);
