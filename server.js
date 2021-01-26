const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // req.body
const cors = require('cors');
const mongoose = require('mongoose'); //Database Configurations
const uriUtil = require('mongodb-uri');  //Database Configurations
let contacts = require('./data');
const contact = require('./api/contacts/routes/contacts');

const mongodbUri =`mongodb+srv://Opman129:Opemiposegun1997@node-mongo.i8cmj.mongodb.net/virtualfair?retryWrites=true&w=majority`;
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.use('/api/contacts', contact);

//GET ENDPOINT
app.get('/api/contacts', (req, res) => {
    if (!contacts) {
        res.status(404).json({ message: 'No contacts found' });
    }
    res.json(contacts);
});

//Filter api Id's //GET
app.get('/api/contacts/:id', (request, response) => {
    const requestId = request.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    });

    if (!contact) {
        response.status(404).json({ message: 'No contacts found' });
    }

    response.json(contact[0]);
});

//POST ENDPOINT
app.post('/api/contacts', (request, response) => {
    const contact = {
        id: contacts.length + 1,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        website: request.body.website
    }

    contacts.push(contact);

    response.json(contact);
});

//PUT OR UPDATE API
app.put('/api/contacts/:id', (request, response) => {
    const requestId = request.params.id;

    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    })[0];

    const index = contacts.indexOf(contact);
    const keys = Object.keys(request.body);

    keys.forEach(key => {
        contact[key] = request.body[key];
    });

    contacts[index] = contact;

    response.json(contacts[index]);
});

///DELETE API
app.delete('/api/contacts/:id', (request, response) => {
    const requestId = request.params.id;

    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    })[0];

    const index = contacts.indexOf(contact);

    contacts.splice(index, 1);

    response.json({message: 'User ${requestId} deleted'});
});

const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {
  mongoose.connect(mongooseUri, dbOptions, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB.."));
});
console.log(`Server is running at http://${hostname}:${port}`);