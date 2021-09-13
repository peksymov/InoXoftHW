const router = require('express').Router();

const {
    getAllFilms, createFilm, getFilmById, updateFilm, deleteFilm
} = require('../controllers/film.controller');
const { checkAccessTokenMiddleware } = require('../middlewares/token.middleware');

router.get('/', getAllFilms);

router.post('/create', checkAccessTokenMiddleware, createFilm);

router.get('/:film_id', getFilmById);
router.put('/:film_id', checkAccessTokenMiddleware, updateFilm);
router.delete('/:film_id', checkAccessTokenMiddleware, deleteFilm);

module.exports = router;
