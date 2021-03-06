const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

// path of link folder

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

// middleware

app.use((req, res, next) => {
    var now = new Date() .toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    
    fs.appendFile('server.log', log + '\n');
    next();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/private'));




app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        currentYear: new Date().getFullYear()
    });

});

    app.get('/about', (req, res) => {
     res.render('About.hbs', {
         pageTitle: 'About page',
         currentYear: new Date().getFullYear()
     });
});

    // bad - send back json with errorMesage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.get('/information', (req, res) => {
    res.send('Information about the page');
});

// app.get('/contact', (req, res) => {
//     res.send({
//             success: 'success about the page'
//     });
// });

app.listen(port, () => {
    console.log("listening on port 3000");
});