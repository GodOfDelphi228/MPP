import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {endpoints} from "../connection/endpoints";
import {RestRequest} from "../connection/requests";
import {AuthContext} from "../AuthProvider";
import {withRouter} from "react-router-dom";
import {Routes} from "../connection/routes";

const backColor = "#E0E5EC";
const cardStyle = {
    "borderRadius":"7%",
    "background":backColor,
    "boxShadow":"10px 10px 30px #bcbec4, " +
        " -10px -10px 30px #feffff",
    "margin-top": "60px"
};

const imageStyle = {
    "maxWidth": "70%",
    "borderRadius":"15px",
    "background":backColor,
    "boxShadow":"15px 15px 30px #bcbec4, " +
        " -15px -15px 30px #feffff"
};

class DishPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dish: props.dish};
    }

    delete = () => {
        RestRequest.delete(endpoints.deleteDish(this.props.dish['_id'])).then((response) => {
            this.props.deleteOne(this.props.dish);
        }).catch(reason => {
            if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
        });
    };

    increasePrice = () => {
        if (this.context.currentUser) {
            let dish = this.props.dish;
            dish.price++;
            RestRequest.put(endpoints.putDish(this.props.dish['_id']), {}, dish).then(response => {
                let dish = this.state.dish;
                dish.price = response.data.payload.price;
                this.setState(dish);
            }).catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
            });
        }

    };

    decreasePrice = () => {
        if (this.context.currentUser) {
            let dish = this.props.dish;
            dish.price--;
            RestRequest.put(endpoints.putDish(this.props.dish['_id']), {}, dish).then(response => {
                let dish = this.state.dish;
                dish.price = response.data.payload.price;
                this.setState(dish);
            }).catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
            });
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
                        <Button onClick={this.increasePrice} aria-label="Page">
                            +
                        </Button>
                        {
                            this.context.currentUser
                                ?
                                <Button onClick={this.delete} variant='contained' color='secondary'>
                                    Remove
                                </Button>
                                :
                                <></>
                        }

                    </CardActions>
                </Card>
            </Box>

        )

    }
}

DishPageView.contextType = AuthContext;
export default withRouter(DishPageView);
