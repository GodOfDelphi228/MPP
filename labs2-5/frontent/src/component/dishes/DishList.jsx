import * as React from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {withRouter} from "react-router-dom";
import {useQuery} from "react-apollo";
import {GET_DISHES} from "../../constant/query";
import Dishes from "./Dish";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Alert from "../alert/Alert";

const DishList = () => {
    const {loading, error, data} = useQuery(GET_DISHES);

    let dishes = (loading || !data) ? [] : data.dishes.map(dishes => {
        return <Dishes key={dishes['id']} dishes={dishes}/>
    });

    return (
        <React.Fragment>
            {error ? <Alert severity="error">{error.message}</Alert> : <React.Fragment/>}
            <Container maxWidth="sm">
                <Box display="flex" justifyContent="center">
                    <IconButton>
                        <FavoriteIcon/>
                    </IconButton>
                </Box>
                <Box>
                    {loading || !data ? <LinearProgress/> : dishes}
                </Box>
            </Container>
        </React.Fragment>)
}
export default withRouter(DishList)
