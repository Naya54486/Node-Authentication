const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const router = require('./routes/router');

const PORT = process.env.PORT || 8000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

// set view engine
app.set('view engine', 'ejs')

// load static files
app.use('/css', express.static(path.join(__dirname,'public/css')))
app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.use(session({
    secret: uuidv4(), // '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbb4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

// home route
app.get('/', (req, res) => {
    res.render('index', {"title": "Login System"})
})


app.listen(PORT, () => {console.log("Listening to server on http://localhost:8000")})
