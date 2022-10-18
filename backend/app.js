const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { buildSchema } = require('graphql');
const Contact = require('./models/contact');
require ('dotenv').config()

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
  

});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
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
    
    `),
    rootValue: {
      contacts: () => {
       return Contact.find()
          .then(contacts => {
            return contacts.map(contact => {
              return { ...contact._doc,_id:contact.id};
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      createContact: (args) => {
        const contact = new Contact({
          name: args.contactInput.name,
          email: args.contactInput.email,
          phone: +args.contactInput.phone,
          description: args.contactInput.description,
          image: args.contactInput.image,
        });
        return contact
          .save()
          .then((result) => {
            console.log(result);
            return { ...result._doc,_id:result._doc._id.toString()};
          })
          .catch((error) => {
            console.log(error);
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wkaijzr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000);
    console.log('connect');
  })
  .catch((err) => {
    console.log(err);
  });
