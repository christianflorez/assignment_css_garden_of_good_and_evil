const ALIGNMENT_DEFAULT = "evil";

// readfile is used instead of require in order to prevent
// the json from caching, which damages insanity module functionality
const _getPageText= (alignment) => {
  let json = JSON.parse(require('fs').readFileSync('./config.json', 'utf8'));
  return json[alignment];
};

const alignmentMiddleware = (req, res, next) => {
  const alignment = req.cookies.alignment || ALIGNMENT_DEFAULT;
  req.alignment = alignment;
  req.pageText = _getPageText(alignment);
  next();
};

module.exports = alignmentMiddleware;