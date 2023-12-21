const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const films = [
    {
        "name":"Просто для проверки",
        "year":"4555"
    },
    {
        "name":"Просто для проверки",
        "year":"4555"
    },
    {
        "name":"Просто для проверки",
        "year":"4555"
    }
];
app.post('/films', (req, res) => {
    const { name, year, director } = req.body;
    const film = { name, year, director };
    films.push(film);
    res.json(film);
});
app.get('/films', (req, res) => {
    const { name, year } = req.query;

    let filteredFilms = films;

    if (name) {
        filteredFilms = movies.filter(film => film.name.includes(name));
    }

    if (year) {
        filteredFilms = movies.filter(film => film.year == year);
    }

    res.json(filteredFilms);
});
app.get('/films/:index', (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < films.length) {
        const film = films[index];
        res.json(film);
    } else {
        res.status(404).json({ error: 'Фильмы не найдены' });
    }
});
app.get('/directors', (req, res) => {
    const directors = Array.from(new Set(films.map(film => film.director)));
    res.json(directors);
});
app.delete('/films/:index', (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < films.length) {
        const deletedFilm = films.splice(index)[0];
        res.json(deletedFilm);
    } else {
        res.status(404).json({ error: 'Фильмы не найдены' });
    }
});

// добавлен Midlleware 
app.use((req, res, next) => {
    if (req.path.includes('/movies/') || req.path.includes('/movies')) {
        const index = req.params.index || req.query.index || -1;
        if (index < 0 || index >= movies.length) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
    }
    next();
});
app.listen(3000, () => {
    console.log(`сервер в порту 3000`);
});