const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const alignmentMiddleware = require('./alignment');
const favoritesMiddleware = require('./favorites');
const insanityMiddleware = require('./insanity');
const port = 3030;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(alignmentMiddleware);
app.use(favoritesMiddleware);
app.use(insanityMiddleware);

app.get('/', (req, res) => {
    res.render('index', {
        alignment: req.alignment,
        pageText: req.pageText,
        food: req.favoriteFood,
        color: req.favoriteColor,
        insanity: req.insanity
    });
});

app.post("/update", (req, res) => {
    res.cookie("alignment", req.body.alignment);
    res.cookie("favoriteFood", req.body.favoriteFood);
    res.cookie("favoriteColor", req.body.favoriteColor);
    res.cookie("insanity", req.body.insanity);
    res.redirect("back");
});

app.listen(port, () => {
    console.log(`Currently listening on Port ${ port }`);
});

// To do
// Insanify: at level 5, zalgofy + rotate text
// lower levels, rotate, letter spacing, etc.
// 