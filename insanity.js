const zalgo = require('zalgolize');
const INSANITY_DEFAULT = 4;

const _zalgoifyPage = (req) => {
  req.pageText.likes = req.pageText.likes.map((text) => {
    return zalgo(text);
  });

  req.pageText.dislikes = req.pageText.dislikes.map((text) => {
    return zalgo(text);
  });

  for (let p in req.pageText.biography) {
    req.pageText.biography[p] = zalgo(req.pageText.biography[p]); 
  }

  for (let p in req.pageText.resume.positions) {
    req.pageText.resume.positions[p] = req.pageText.resume.positions[p].map((text) => {
      return zalgo(text);
    });
  }
};

const insanityMiddleware = (req, res, next) => {
  const insanity = req.cookies.insanity || INSANITY_DEFAULT;

  if (insanity >= 3) {
    _zalgoifyPage(req);
  }
  req.insanity = insanity;
  next();
};

module.exports = insanityMiddleware;