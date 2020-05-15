import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router-dom';
import {Routes} from "../../constant/Routes";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {CREATE_DISH, UPDATE_DISH} from "../../constant/mutation";
import {GET_DISHES, GET_ONE_DISH} from "../../constant/query";

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

const Editor = (props) => {

    const updateCache = (client, {data: {createNews: item}}) => {
        const data = client.readQuery({
            query: GET_DISHES,
        });
        const newData = {
            news: data.news.concat([item])
        }
        client.writeQuery({
            query: GET_DISHES,
            data: newData
        });
    }

    const [updateDish] = useMutation(UPDATE_DISH);
    const [createDish] = useMutation(CREATE_DISH);
    const id = props.match.params.id;
    const {loading, data} = useQuery(GET_ONE_DISH, {
        variables: {id},
        skip: !id,
    });
    const dish = data ? data.oneDish : null;

    const onSubmit = event => {
        event.preventDefault();
        //const title = event.target.elements[0].value;
        //const body = event.target.elements[3].value;
        const name = event.target.elements[0].value;
        const description = event.target.elements[2].value;
        const image_url = (event.target.elements[4].value === no_url_placeholder) ? ""
            : event.target.elements[4].value;
        const price = event.target.elements[6].value;
        !id ?
        createDish({
            variables: {
                name, description, image_url, price
            }, update: updateCache
        }).then((res) => props.history.push(Routes.dishes))
            :
            updateDish({
                variables:{
                    id, name, description, image_url, price
                }
            }).then((res) => props.history.push(Routes.dishes))
    };

    return (
        <Container>
            <form noValidate autoComplete='off' onSubmit={onSubmit}>
                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Box m={4}>
                        <h2>{id ? 'Edit' : 'Create'}</h2>
                    </Box>
                    {/*<Box m={4}>
                        <Grid spacing={2}
                              container
                              direction="row"
                              justify="space-between"
                              alignItems="center">
                            <Grid item>
                                Title:
                            </Grid>
                            <Grid item>
                                <TextField
                                    defaultValue={id && !loading ? dishes.name : ''}
                                    variant="outlined"
                                    id='title'
                                    placeholder='title'
                                    multiline rowsMax={5}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box m={4}>
                        <Grid spacing={2}
                              container
                              direction="row"
                              justify="space-between"
                              alignItems="center">
                            <Grid item>
                                Body:
                            </Grid>
                            <Grid item>
                                <TextField defaultValue={id && !loading ? dishes.body : ''} placeholder="body"
                                           variant="outlined" id="body" multiline rowsMax={5}/>
                            </Grid>
                        </Grid>
                    </Box>*/}
                    <Box m={2}>
                        <Grid>
                            <TextField
                                variant="outlined"
                                id='name'
                                label='name'
                                defaultValue={id && !loading ? dish.name : ''}
                                placeholder={dish ? dish.name : ''}
                                InputProps={{
                                    style: fieldStyle,
                                }}
                            />
                        </Grid>
                    </Box>

                    <Box m={2}>
                        <Grid>
                            <TextField
                                variant="outlined"
                                id='description'
                                label='description'
                                defaultValue={id && !loading ? dish.description : ''}
                                InputProps={{
                                    style: fieldStyle,
                                }}
                            />
                        </Grid>
                    </Box>

                    <Box m={2}>
                        <Grid>
                            <TextField
                                variant="outlined"
                                id='image_url'
                                label='image url'
                                defaultValue={id && !loading ? dish.image_url : ''}
                                InputProps={{
                                    style: fieldStyle,
                                }}
                            />
                        </Grid>
                    </Box>
                    <Box m={2}>
                        <Grid>
                            <TextField
                                variant="outlined"
                                id='price'
                                label='price'
                                defaultValue={id && !loading ? dish.price : ''}
                                InputProps={{
                                    style: fieldStyle,
                                }}
                            />
                        </Grid>
                    </Box>
                    <img style={imageStyle}
                         src={(dish && dish.image_url && !(dish.image_url === no_url_placeholder)) ? dish.image_url :
                             "https://static.vecteezy.com/system/resources/previews/000/129/724/non_2x/free-fast-food-vector.png"}
                    />
                    <Box m={4}>
                        <Grid justify="space-between" container spacing={5}>
                            <Grid item>
                                <Button style={{marginLeft: '4em'}}
                                        variant="contained"
                                        color="primary" onClick={() => props.history.goBack()}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </form>
        </Container>

    )
}

export default withRouter(Editor);
