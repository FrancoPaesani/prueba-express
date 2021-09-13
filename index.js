const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');
require('dotenv').config();

const app = express();

//Init middleware
//app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Homepage Route
app.get('/', (req,res) => {
    res.render('index', {
        title: 'Member App Passing',
        members
    });
});

/*
// Set static folder
app.use(express.static(path.join(__dirname,'public')));
*/

//Members API Routes
app.use('/api/members',require('./routes/api/members'));

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log('Server is listening at ' + PORT));
