import * as React from "react";
import DishView from "./DishView";
import Container from "@material-ui/core/Container";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {RestRequest} from "../connection/requests";
import {Routes} from "../connection/routes";
import {withRouter} from "react-router-dom";
import {socket} from "../connection/requests";
import {endpointsClient, endpointsServer} from "../connection/endpoints";
import {getUserFromStorage} from "../connection/auth";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

const progressBarStyle = {
    "borderRadius":"7%",
    "background": "#EC8800",
    "boxShadow":"inline 5px 5px 10px #bcbec4, " +
        "inline -5px -5px 10px #feffff"
};

class DishList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dish: [], loading: false, orderKind: 0, order: true};
    }

    deleteDish = (element) => {
        let dish = this.state.dish;
        console.log(dish);
        let newDishList = dish.filter((dish) => !(dish['_id'] === element['_id']));
        this.setState({dish: newDishList});
    };

    componentDidMount() {
        this.load(this.state.order);
    }

    load = (kind, order) => {
        /*this.setState({loading: true});
        debugger
        RestRequest.get(endpointsServer.getDishList + `?sort=likes&order=${order ? 1 : -1}`)
            .then((response) => {
                debugger
                const dish = response.data.payload;
                this.setState({loading: false, dish, order});
            }).catch(error => {
                console.log(error.response);
            if (error.response.status === 401 || error.response.status === 403) this.props.history.push(Routes.login);
        });*/
        if (getUserFromStorage() == null) {
            this.props.navigation.navigate("SignIn");
        } else {
            this.setState({loading: true});
            let params = {
                restaurant_id: getUserFromStorage().id,
                sort: kind == 0 ? 'rating' : 'price',
                order: order ? 1 : -1
            };
            socket.on(endpointsClient.getAll, (data) => {
                console.log(data.payload);
                this.setState({loading: false, dish: data.payload, order});
            });
            socket.emit(endpointsServer.getDishList, params);
        }
    };

    sortByRating = () => {
        this.load(0, !this.state.order);
    };

    sortByPrice = () => {
        this.load(1, !this.state.order);
    };

    render() {
        let loading = this.state.loading;
        let dish = this.state.dish.map((dish) => {
            return <DishView deleteOne={this.deleteDish} key={dish['_id']} dish={dish}/>
        });
        return (
            <React.Fragment>
                <Toolbar style={{color: "white"}}>
                    <Button onClick={this.sortByPrice}>
                        Sort price
                    </Button>
                    <Button onClick={this.sortByRating}>
                        Sort rating
                    </Button>
                </Toolbar>
                <Container maxWidth={"sm"} style={{columnCount: 1}}>
                    <Box>
                        <Container>
                            {loading ? <LinearProgress style={progressBarStyle}/> : dish}
                        </Container>
                    </Box>
                </Container>
            </React.Fragment>)
    }

}

export default withRouter(DishList)
