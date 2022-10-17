const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Contact {
    _id:ID!
    name: String!
    email: String!
    phone: String!
    description:String!
    image: String!

}

input ContactInput{
    name: String!
    email: String!
    phone: String!
    description:String!
    image: String!
}

type RootQuery{
    contacts:[Contact!]!
}

type RootMutation{
    createContact(contactInput:ContactInput):Contact
}

schema{
    query: RootQuery
    mutation: RootMutation
}

`);
