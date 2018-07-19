"use strict";
const express = require("express");
const passport = require("passport");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { Movie } = require("./model");
// const jwtAuth = passport.authenticate("jwt", { session: false });

router.use(jsonParser);

// ============== GET endpoint ==============
router.get("/", (req, res) => {
  Movie.find()
    // call the `.serialize` instance method we've created in
    // models.js in order to only expose the data we want the API return.
    .then(movies => {
      res.json({
        movies: movies.map(movie => movie.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// ============== POST endpoint ==============
router.post("/", (req, res) => {
  const requiredFields = [
    "movieId"
  ];

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Movie.create({
    movieId: req.body.movieId
  })
    .then(movie => res.status(201).json(movie.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

// ============== DELETE endpoint ==============
router.delete("/:id", (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

module.exports = { router };
