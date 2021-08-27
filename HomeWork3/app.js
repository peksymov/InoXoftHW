const express = require('express');

const path = require('path');

const app = express();
const expressHbs = require('express-handlebars');

const { PORT } = require('./configs/config');
// коментарі для себе залишив)
const staticPath = path.join(__dirname, 'static');
// настройка express для чтения json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// настройка express для чтения json

// конфиг render
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

const { userRouter, navigationRoutes, userAuth } = require('./routes');

app.use('/users', userRouter);
app.use('/auth', userAuth);
app.use('/', navigationRoutes);

app.listen(PORT, () => {
    // console.log('PORT PORT PORT');
});
