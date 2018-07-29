const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movieData: { type: Object, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

MovieSchema.methods.serialize = function() {
  return {
    id: this._id,
    moviesData: this.moviesData
  };
};

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = { Movie };
