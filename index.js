const express = require("express");
const { nanoid } = require("nanoid");
const app = express();
const port = 3000;

const db = {
  reviews: [
    {
      username: "onett",
      title: "sucks",
      review: "",
      id: "r1",
      movieId: "32302",
    },
    {
      username: "twoson",
      title: "amazing",
      review: "",
      id: "r2",
      movieId: "32302",
    },
    {
      username: "threed",
      title: "too many robots",
      review: "",
      id: "r3",
      movieId: "32302",
    },
  ],
  favorites: [],
};

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  next();
});

app.get("/", (req, res) => {
  res.send(db);
});

//Get Reviews for each Movie
app.get("/:movieId/reviews", (req, res) => {
  const movieReviews = db.reviews.filter(
    (review) => review.movieId === req.params.movieId
  );
  if (movieReviews.length === 0) {
    res.status(404).send("No Reviews Found For This Movie!");
  }
  res.json(movieReviews);
});

//get request for individual reviews on a movie
app.get("/:movieId/reviews/:reviewId", (req, res) => {
  const selectReview = db.reviews.find(
    (review) => review.id === req.params.reviewId
  );
  if (selectReview === undefined) {
    res
      .status(404)
      .send("This Review Doesn't Exist - Perhaps you should write one");
  }
  res.json(selectReview);
});

//create patch request for updating review about movie
app.put("/:movieId/reviews/create", (req, res) => {
  const { username, title, review } = req.body;

  if (!username || !title || !review) {
    res
      .status(400)
      .send("Missing required field. Please check username, title and review.");
  }

  const newReview = {
    username,
    title,
    review,
    id: nanoid(),
    movieId: req.params.movieId,
  };
  db.reviews.push(newReview);
  res.send(db.reviews[db.reviews.length - 1]);
});

// //create delete request to remove review about movie
// app.delete("/:movieId/reviews/:reviewId", (req, res) => {
//   const selectedMovie = db.find((movie) => {
//     if (movie.id === req.params.movieId) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   selectedMovie.reviews = selectedMovie.reviews.filter(
//     (review) => review.id !== req.params.reviewId
//   );

//   res.send(selectedMovie.reviews);
// });

//create post request to make movie favorite
app.post("/:movieId/favorite", (req, res) => {
  const checkFavorites = db.favorites.find(
    (movie) => movie === req.params.movieId
  );
  if (checkFavorites !== undefined) {
    res.status(400).send("Movie is already favorited!");
  }
  db.favorites.push(req.params.movieId);
  res.send(db.favorites);
});

//Remove movie from favorites list
app.delete("/:movieId/favorite", (req, res) => {
  const toDelete = db.favorites.findIndex(
    (movie) => movie === req.params.movieId
  );
  if (toDelete === -1) {
    res.status(400).send("Movie is not favorited!");
  }
  db.favorites.splice(toDelete, 1);
  res.send(db.favorites);
});

app.listen(port, () => {
  console.log(`creating something at http://localhost:${port}`);
});
