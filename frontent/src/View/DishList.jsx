import * as React from "react";
import DishView from "./DishView";
import {endpoints} from "../connection/endpoints";
import Container from "@material-ui/core/Container";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {RestRequest} from "../connection/requests";
import {Routes} from "../connection/routes";
import {withRouter} from "react-router-dom";

const progressBarStyle = {
    "borderRadius":"7%",
    "background": "#EC8800",
    "boxShadow":"inline 5px 5px 10px #bcbec4, " +
        "inline -5px -5px 10px #feffff"
};

class DishList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dish: [], loading: false, order: true};
    }

    deleteDish = (element) => {
        let dish = this.state.dish;
        let newDishList = dish.filter((dish) => !(dish['_id'] === element['_id']));
        this.setState({dish: newDishList});
    };

    componentDidMount() {
        this.load(this.state.order);
    }

    load = (order) => {
        this.setState({loading: true});
        debugger
        RestRequest.get(endpoints.getDishList + `?sort=likes&order=${order ? 1 : -1}`)
            .then((response) => {
                debugger
                const dish = response.data.payload;
                this.setState({loading: false, dish, order});
            }).catch(error => {
                console.log(error.response);
            if (error.response.status === 401 || error.response.status === 403) this.props.history.push(Routes.login);
        });
    };
    topLike = () => {
        this.load(!this.state.order);
    };

    render() {
        let loading = this.state.loading;
        let dish = this.state.dish.map((dish) => {
            return <DishView deleteOne={this.deleteDish} key={dish['_id']} dish={dish}/>
        });
        return (
            <React.Fragment>
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
