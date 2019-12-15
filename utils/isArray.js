const isArray = (arr) => {
  // from jQuery
  return Object.prototype.toString.call(arr) === '[object Array]'
}

module.exports = isArray
