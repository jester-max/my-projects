const express = require('express');
const cors = require('cors');
var morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config({
  path: './.env',
});


app.use('/', express.static('public/assets'))

// Import router manager
const connectRouters = require('./routers/manage.router');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('tiny'))
app.use(cookieParser());

const corsOptions = {
  origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_TWO],
  credentials: true,
};

app.use(cors(corsOptions));

require('./databases/testing/mongodb').mongodbConn();

app.use(function (req, res, next) {
    console.log(req.url)
    next()
})

// Connect all routers through the router manager
connectRouters(app);

/* exports app object */
module.exports = app;

// http://localhost:4200/landing-page/mahesh/sale-quotation/mahesh

// http://localhost:4200/mainModules/mahesh




