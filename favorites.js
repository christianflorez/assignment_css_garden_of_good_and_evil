const FAVORITE_FOOD_DEFAULT = "Pizza";
const FAVORITE_COLOR_DEFAULT = "White";

const favoritesMiddleware = (req, res, next) => {
  const favoriteFood = req.cookies.favoriteFood || FAVORITE_FOOD_DEFAULT;
  const favoriteColor = req.cookies.favoriteColor || FAVORITE_COLOR_DEFAULT;

  req.favoriteFood = favoriteFood;
  req.favoriteColor = favoriteColor;

  if (req.alignment === "good") {
    req.pageText.likes.push(favoriteFood, favoriteColor);
  } else if (req.alignment === "evil") {
    req.pageText.dislikes.push(favoriteFood, `The Color ${ favoriteColor }`);
  }
  next();
};

module.exports = favoritesMiddleware;