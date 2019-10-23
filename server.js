const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const food = require('./controllers/food');
const apparel = require('./controllers/apparel');
const object = require('./controllers/object');

// const db = knex({
//     client: 'pg',
//     connection: {
//       connectionString : process.env.DATABASE_URL,
//       ssl : true,
//     }
//   });

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'postgres'
  }
});

db.select('*').from('users');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) => { res.send('it is working!') })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister (req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet (req, res, db )})

app.put('/image', (req, res) => { image.handleImage (req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall (req, res)})

app.put('/food', (req, res) => { food.handleImage (req, res, db)})

app.post('/foodurl', (req, res) => { food.handleApiCall (req, res)})

app.put('/apparel', (req, res) => { apparel.handleImage (req, res, db)})

app.post('/apparelurl', (req, res) => { apparel.handleApiCall (req, res)})

app.put('/object', (req, res) => { object.handleImage (req, res, db)})

app.post('/objecturl', (req, res) => { object.handleApiCall (req, res)})

app.listen(process.env.PORT || 3000, () => {
     console.log(`app is running on port 3000`);
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/