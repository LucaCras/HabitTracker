const express = require('express');
var path = require('path');
var bp = require('body-parser');

const app = express();

const exphbs = require('express-handlebars');

var options = {
    dotfiles: 'ignore', etag: false,
    extensions: ['htm', 'html'],
    index: false
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'), options));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})



app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
})