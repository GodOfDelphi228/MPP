import gql from 'graphql-tag';

export const GET_DISHES = gql`
    query {
        dishes {
            id
            name
            description
            owner {
            id
            }
            image_url
            price
        }
    }

`
export const GET_ONE_DISH = gql`
query updateDish($id:String! ) {
    oneDish(dishId:$id) {
        id
        name
        description
        image_url
        price
    }
}


`
