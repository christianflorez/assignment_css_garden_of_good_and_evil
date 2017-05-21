const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
// const alignmentMiddleware = require('./alignment');
const port = 3030;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
// app.use(alignmentMiddleware);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Currently listening on Port ${ port }`);
});