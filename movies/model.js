const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movieId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

MovieSchema.methods.serialize = function() {
  return {
    id: this._id,
    movieId: this.movieId,
  };
};

const Job = mongoose.model("Movie", MovieSchema);
module.exports = { Movie };
