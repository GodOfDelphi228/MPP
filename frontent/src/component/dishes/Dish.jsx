import * as React from "react";
import {useContext} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {withRouter} from "react-router-dom";
import {useMutation} from '@apollo/react-hooks';
import {DELETE_DISH} from "../../constant/mutation";
import {AuthContext} from "../AuthProvider";
import {GET_DISHES} from "../../constant/query";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Routes} from "../../constant/Routes";
import {getRouteForUpdate} from "../../helper/routeHelper";

const Dishes = (props) => {
    const dish = props.dishes;

    const updateCache = (client, {data: {deleteDish: item}}) => {
        const data = client.readQuery({
            query: GET_DISHES,
        });
        const newData = {
            dishes: data.dishes.filter(t => t.id !== item.id)
        }
        client.writeQuery({
            query: GET_DISHES,
            data: newData
        });
    }

    //const [addLike, {loading: addLikeLoading}] = useMutation(LIKE);
    //const [removeLike, {loading: removeLikeLoading}] = useMutation(DIS_LIKE);
    const [deleteDish, {loading: deleting}] = useMutation(DELETE_DISH);

    const authContext = useContext(AuthContext);

    const remove = () => {
        if (deleting) return;
        deleteDish({
            variables: {id: dish.id},
            update: updateCache
        });
    };

    /*const like = () => {
        if (addLikeLoading) return;
        addLike({variables: {id: dishes.id}})
    }
    const unLike = () => {
        if (removeLikeLoading) return;
        removeLike({variables: {id: dishes.id}})
    }*/

    const onEdit = () => {
        props.history.push(getRouteForUpdate(Routes.editor, dish.id));
    }

    return (
        <Box m={1}>
            <Card>
                <CardHeader title={dish.name}/>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {dish.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        authContext.currentUser.id === dish.owner.id
                            ?
                            <React.Fragment>
                                <IconButton color='secondary' onClick={remove} aria-label="delete">
                                    <DeleteIcon fontSize="large"/>
                                </IconButton>
                                <IconButton color='primary' onClick={onEdit} aria-label="edit">
                                    <EditIcon fontSize="large"/>
                                </IconButton>
                            </React.Fragment>
                            : <React.Fragment/>
                    }

                </CardActions>
            </Card>
        </Box>

    )

}
export default withRouter(Dishes);
