const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const expressHbs = require('express-handlebars');

const {PORT} = require('./configs/config');
const users = require('./database/ussers.json');
// коментарі для себе залишив)
const staticPath = path.join(__dirname, 'static')
// настройка express для чтения json
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// настройка express для чтения json

// конфиг render
app.use(express.static(staticPath))
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}))
app.set('views', staticPath)
// конфиг render

app.post('/auth', (req, res) => {
    const body = req.body
    console.log(body)
    const user = users.find(user => user.email === body.email)
    if (!user) {
        res.status(404).render('registration')
        return  // ВАЖЛИВО ПИСАТИ RETURN
    } else if (user && user.password !== body.password) {
        res.status(404).render('fail')
        return
    }
    console.log("body", body)
    res.render('user', {user, users})
})

app.post('/create', (req, res) => {
    const body = req.body
    console.log("body.email ---> ", body.email)
    const user = users.find(user => user.email !== body.email)
    if (body.email === user.email) {
        res.render('login')
        return
    }
    users.push(body)
    res.render('users', {users})
    fs.writeFileSync('./database/ussers.json', JSON.stringify(users));
})

app.get('/', (req, res) => {
    res.render('startPage')
})
app.get('/registration', (req, res) => {
    res.render('registration')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/users', (req, res) => {
    res.render('users', {users})
})
app.get('/users/:user_id', (req, res) => {
    const {user_id} = req.params
    const user = users.find(user => user.email === user_id)
    res.render('user', {user, users})
})
app.listen(PORT, () => {
    console.log("PORT PORT PORT")
})


