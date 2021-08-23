const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const expressHbs = require('express-handlebars');

const {PORT} = require('./configs/config');
const users = require('./database/ussers.json');
// коментарі для себе залишив)
const staticPath = path.join(__dirname,'static')
// настройка express для чтения json
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// настройка express для чтения json

// конфиг render
app.use(express.static(staticPath))
app.set('view engine','.hbs');
app.engine('.hbs',expressHbs({ defaultLayout: false }))
app.set('views',staticPath)
// конфиг render

app.post('/auth',(req,res) => {
    const body = req.body
    console.log(body)
    const user = users.find(user => user.email === body.email)
    const password = users.find(user => user.password === body.password)
    console.log("password-- password",password)
    if(!user) {
        res.status(404).render('registration')
        return  // ВАЖНО ПИСАТИ RETURN
    }
    else if (user && user.password !== body.password) {
        res.status(404).render('fail')
        return
    }
    console.log("body", body)
    res.render('user',{user,users})
})

app.post('/create',(req,res) => {
    const body = req.body
    console.log("body ---> ",body)
    const user = users.find(user => user.email === body.email)
    if (body.email === user.email) {
        res.render('login',)
        return
    }
    users.push(body)
    res.render('users',{users})
    fs.writeFileSync('./database/ussers.json', JSON.stringify(users));
})

app.get('/',(req, res)=>{
    res.render('startPage')
})
app.get('/registration',(req, res)=>{
    res.render('registration')
})
app.get('/login',( req, res )=>{
    res.render('login')
})
app.get('/users',(req, res)=> {
    res.render('users',{users})
})
app.get('/users/:user_id',(req, res)=> {
    const {user_id} = req.params
    console.log("user_id",user_id)
    // const query = req.query
    const user = users.find(user => user.email === user_id)
    console.log("query ---> ",user)
    res.render('user',{user,users})
})
app.listen(PORT,()=> {
    console.log("PORT PORT PORT")
})


