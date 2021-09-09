const ErrorHandler = require('../errors/ErrorHandler');
const { Film, User } = require('../database');
const { CREATED } = require('../configs/request_handler.enum');

module.exports = {
    getAllFilms: async (req, res, next) => {
        try {
            const films = await Film.find({ });
            await res.json(films);
        } catch (e) {
            next(e);
        }
    },
    getFilmById: async (req, res, next) => {
        try {
            const { film_id } = req.params;
            const film = await Film.findById({ _id: film_id });
            if (!film) {
                throw new ErrorHandler(404, 'НЕТ ТАКОГО ФИЛЬМА');
            }
            await res.json(film);
        } catch (e) {
            next(e);
        }
    },
    createFilm: async (req, res, next) => {
        try {
            const { currentUser } = req;
            const { filmName, filmType, userCreator } = req.body;
            if (currentUser._id.toString() !== userCreator) {
                throw new ErrorHandler(433, 'id не равні');
            }
            const film = await Film.create({ filmName, filmType, userCreator });
            if (!film) {
                throw new ErrorHandler(404, 'Не получилось фильм создать');
            }
            const userWhoCreated = await User.findById({ _id: userCreator });
            const updatedFilms = [
                ...userWhoCreated.films,
                { filmName, filmType }
            ];
            await User.findByIdAndUpdate(userWhoCreated, { films: updatedFilms }, {});

            await res.json({ message: 'Successful Film creation', data: film });
        } catch (e) {
            next(e);
        }
    },
    updateFilm: async (req, res, next) => {
        try {
            const { film_id } = req.params;
            const updatedField = req.body;
            const updatedFilm = await Film.findByIdAndUpdate({ _id: film_id }, { ...updatedField }, {});
            if (updatedFilm) {
                await res.json({ status: CREATED, message: 'знашли и змінили' });
            } else {
                throw new ErrorHandler(404, 'НЕТ Изменения в фильме');
            }
        } catch (e) {
            next(e);
        }
    },
    deleteFilm: async (req, res, next) => {
        try {
            const { film_id } = req.params;
            const deleteFilm = await Film.findByIdAndDelete({ _id: film_id });
            if (deleteFilm) {
                await res.json({ status: CREATED, message: 'знашли s видалили' });
            } else {
                throw new ErrorHandler(404, 'не змогли видалити');
            }
        } catch (e) {
            next(e);
        }
    }
};
