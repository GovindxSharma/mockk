const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const app = express();
const port = 8080;
const db = require('./config/mongoose');
const MongoStore=require('connect-mongo');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/css', express.static('assets/css', { type: 'text/css' }));
app.use('/js', express.static('assets/js', { type: 'text/javascript' }));

app.use(expressLayouts);
app.set('layout extractStyles', true);

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },store:new MongoStore({
        mongoUrl:"mongodb+srv://user:harder@projects.wxafwea.mongodb.net/?retryWrites=true&w=majority",
        autoRemove:'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.listen(port, () => console.log(`Server is running at port : ${port} `));
