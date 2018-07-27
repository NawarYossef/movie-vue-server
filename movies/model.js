const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movieData: { type: Object, required: true }
});

MovieSchema.methods.serialize = function() {
  return {
    id: this._id,
    moviesData: this.moviesData
  };
};

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = { Movie };
