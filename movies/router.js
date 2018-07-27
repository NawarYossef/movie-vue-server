"use strict";
const express = require("express");
const passport = require("passport");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { Movie } = require("./model");
const jwtAuth = passport.authenticate("jwt", { session: false });

router.use(jsonParser);

// ============== GET endpoint ==============
router.get("/", jwtAuth, (req, res) => {
  Movie.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// ============== POST endpoint ==============
router.post("/", jwtAuth, (req, res) => {
  const requiredFields = [
    "movieData"
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
    movieData: req.body.movieData,
  })
    .then(() => {
      Movie.find()
        .then(movies => res.status(201).json(movies))
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

// ============== DELETE endpoint ==============
router.delete("/:id", jwtAuth, (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

module.exports = { router };
