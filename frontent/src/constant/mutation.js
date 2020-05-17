import gql from 'graphql-tag';

export const LIKE = gql`
   mutation AddDishLike($id: String!) {
     addDishLike(dishId: $id) {
     id
      likes {
      id
      }
    }
  }
`;
export const DIS_LIKE = gql`
   mutation DeleteDishLike($id: String!) {
     deleteDishLike(dishId: $id) {
     id
      likes {
      id
      }
    }
  }
`;
export const DELETE_DISH = gql`
    mutation DeleteDish($id: String!) {
      deleteDish (dishId:$id) {
          id
          name
          description
          image_url
          price
          owner {
            id
          }
       
    }
    }
    `;
export const CREATE_DISH = gql`
mutation CreateDish($name: String!,$description: String!,$image_url: String!,$price: String!) {
       createDish(name:$name,description:$description,image_url:$image_url,price:$price) {
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
`;
export const UPDATE_DISH = gql`
   mutation UpdateDish($id: String!, $name: String!, $description: String!, $image_url: String!, $price: String!) {
    updateDish(dishId:$id,name:$name,description:$description,image_url:$image_url,price:$price) {
        id
        name
        description
        image_url
        price
    }
   }
    `;
