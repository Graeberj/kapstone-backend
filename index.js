const express = require("express");
const { nanoid } = require("nanoid");
const app = express();
const port = 3000;

const db = [
  {
    name: "terminator",

    id: "218-the-terminator",
    favorite: false,
    reviews: [
      { username: "onett", title: "sucks", review: "", id: "r1" },
      { username: "twoson", title: "amazing", review: "", id: "r2" },
      { username: "threed", title: "too many robots", review: "", id: "r3" },
    ],
  },
  {
    name: "karate kid",

    id: "1885-the-karate-kid",
    favorite: false,
    reviews: [],
  },
  {
    name: "terminator 2",

    id: "280-terminator-2-judgment-day",
    favorite: false,
    reviews: [],
  },
  {
    name: "karate kid 2",

    id: "8856-the-karate-kid-part-ii",
    favorite: false,
    reviews: [],
  },
];

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
app.get("/:movieId", (req, res) => {
  const selectedMovie = db.find((movie) => {
    if (movie.id === req.params.movieId) {
      return true;
    } else {
      return false;
    }
  });
  res.json(selectedMovie);
});
app.get("/:movieId/reviews", (req, res) => {
  const selectedMovie = db.find((movie) => {
    if (movie.id === req.params.movieId) {
      return true;
    } else {
      return false;
    }
  });
  res.json(selectedMovie.reviews);
});
//create post request for creating review about movie
app.post("/:movieId/reviews", (req, res) => {
  const selectedMovie = db.find((movie) => {
    if (movie.id === req.params.movieId) {
      return true;
    } else {
      return false;
    }
  });
  const newReview = {
    username: req.body.username,
    title: req.body.title,
    review: req.body.review,
    id: nanoid(),
  };

  selectedMovie.reviews.push(newReview);
  res.status(201).json(selectedMovie.reviews);
});
//get request for individual reviews on a movie
app.get("/:movieId/reviews/:reviewId", (req, res) => {
  const selectedMovie = db.find((movie) => {
    if (movie.id === req.params.movieId) {
      return true;
    } else {
      return false;
    }
  });
  const selectReview = selectedMovie.reviews.find((review) => {
    if (review.id === req.params.reviewId) {
      return true;
    } else {
      return false;
    }
  });
  res.json(selectReview);
});
//create patch request for updating review about movie
app.patch("/:movieId/reviews/:reviewId", (req, res) => {
  const selectedMovie = db.find((movie) => {
    if (movie.id === req.params.movieId) {
      return true;
    } else {
      return false;
    }
  });
  let selectReview = selectedMovie.reviews.find((review) => {
    if (review.id === req.params.reviewId) {
      return true;
    } else {
      return false;
    }
  });
  if (selectReview === false) {
    res.status(400).send("Bad request, review doesn't exist");
  }
  console.log(selectReview);
  selectReview = {
    ...req.body.selectReview,
    ...req.body,

    username: selectReview.username,
    id: req.params.reviewId,
  };
  res.send(selectReview);
});
//create delete request to remove review about movie
app.delete("/:movieId/reviews/:reviewId", (req, res) => {
  const selectedMovie = db.find((movie) => {
    if (movie.id === req.params.movieId) {
      return true;
    } else {
      return false;
    }
  });
  selectedMovie.reviews = selectedMovie.reviews.filter(
    (review) => review.id !== req.params.reviewId
  );

  res.send(selectedMovie.reviews);
});
//create post request to make movie favorite
app.post("/:movieId/favorite", (req, res) => {
  let favoriteMovie = db.find((movie) => {
    if (movie.id === req.params.movieId) {
      return true;
    } else {
      return false;
    }
  });
  favoriteMovie.favorite = !favoriteMovie.favorite;

  res.json(favoriteMovie);
});
app.listen(port, () => {
  console.log(`creating something at http://localhost:${port}`);
});
