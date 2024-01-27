const express = require('express');
const app = express()

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.render('hello.ejs');
// });

app.get('/', (req, res) =>{
    res.render('index.ejs');
});

app.get('/list', (req, res) =>{
    res.render('list.ejs');
});

app.listen(3000);
