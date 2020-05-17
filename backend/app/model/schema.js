const {buildSchema} = require('graphql');

const schema = buildSchema(`
 type Query {
  dishes: [Dish!]!
  oneDish(dishId: String!): Dish
 }
 type Mutation {
  createDish(name: String!, description: String!, image_url: String!, price: String!): Dish!
  updateDish(dishId: String!, name: String, description: String, image_url: String, price: String): Dish!
  deleteDish(dishId: String!):Dish
  addDishLike(dishId: String!): Dish!
  deleteDishLike(dishId: String!): Dish!
  }

    type Dish {
    id: ID!
    name: String!
    owner: User!
    description: String!
    image_url: String!
    price: String!
  }
  

type User {
    id: ID!
    name: String
    email: String
  }
`);

module.exports = schema;
