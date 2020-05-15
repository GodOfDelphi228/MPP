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
import {withRouter} from "react-router-dom";
import {Routes} from "../connection/routes";
import StartIcon from '@material-ui/icons/Star';
import DishPageView from "./DishPageView";
import {getRouteForUpdate} from "../connection/routes";

const backColor = "#E0E5EC";
const cardStyle = {
    "borderRadius":"7%",
    "background":backColor,
    "boxShadow":"10px 10px 30px #bcbec4, " +
        " -10px -10px 30px #feffff",
    "margin-top": "60px"
};

const removeButtonStyle = {
    "borderRadius":"15px",
    "background":"EC002B",
    "boxShadow":"10px 10px 30px #bcbec4, " +
        " -10px -10px 30px #feffff",
    "margin": "10px"
};

const likeStyle = {
    "color":"orange"
}

const buttonStyle = {
    "width":"30px",
    "height":"30px",
    "borderRadius":"15px",
    "background":"EC002B",
    "boxShadow":"10px 10px 30px #bcbec4, " +
        " -10px -10px 30px #feffff",
    "margin": "10px"
};

const imageStyle = {
    "maxWidth": "70%",
    "borderRadius":"15px",
    "background":backColor,
    "boxShadow":"15px 15px 30px #bcbec4, " +
        " -15px -15px 30px #feffff"
};

class DishView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dish: props.dish, goToDetail: false};
    }

    detail = () => {
        //this.setState({goToDetail: true});
        //navigation.navigate(Routes.dishDetail, {dish: this.props.dish});
        //this.props.push(Routes.dishes+"/"+this.props.dish['_id']);
        //this.props.history.push(Routes.dishDetail+"/"+this.props.dish['_id']);
        //this.props.navigation.navigate(Routes.dishDetail, {dish: this.props.dish});
        //return <DishPageView dish={this.props.dish} />
        console.log("dishView: "+this.props.dish._id);
        //this.props.history.push({pathname: Routes.dishDetail, state: {dish: this.props.dish}});

        this.props.history.push(getRouteForUpdate(Routes.dishDetail, this.props.dish._id));
    }

    delete = () => {
        /*RestRequest.delete(endpointsServer.deleteDish(this.props.dish['_id'])).then((response) => {
            this.props.deleteOne(this.props.dish);
        }).catch(reason => {
            if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
        });*/
        socket.on(endpointsClient.getDelete, (data) => {
            //console.log(data.payload);
           //this.setState({loading: false, dish: data.payload, order});
            this.props.deleteOne(this.props.dish);
        });
        let dish = this.props.dish;
        console.log(dish);
        socket.emit(endpointsServer.deleteDish, dish._id);
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

    render() {
        return (
            <Box m={1}>
                <Card style={cardStyle}>
                    <CardHeader title={this.props.dish.name} style={{"size": "32px", fontWeight: 'bold', "color": "#555555"}}/>
                    <CardContent>
                        <img style={imageStyle} src={this.props.dish.image_url ? this.props.dish.image_url:"https://static.vecteezy.com/system/resources/previews/000/129/724/non_2x/free-fast-food-vector.png"}
                        />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.dish.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.decreasePrice} aria-label="Minus">
                            -
                        </Button>
                        <Typography>
                            {this.props.dish.price}$
                        </Typography>
                        <Button onClick={this.increasePrice} aria-label="Plus">
                            +
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
                        {/*<DishPageView dish={this.props.dish} />*/}
                        {<Button onClick={this.detail} aria-label="Plus">
                            Detail
                        </Button>}
                        <Typography>
                            <StartIcon style={likeStyle}/>
                            {this.props.dish.rating }
                        </Typography>
                    </CardActions>
                </Card>
            </Box>

        )

    }
}

DishView.contextType = AuthContext;
export default withRouter(DishView);
