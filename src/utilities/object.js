/**
 * filter object by keys with wildcard
 * @param {string} string
 * @param {object} object
 * @returns {object}
 */
module.exports.FilterbyKeys = function (string, object) {
  const matcher = require("matcher");

  /**
   * example
   * object = {ab:1,cd:2}
   * string = "a*"
   */
  const keys = Object.keys(object); // keys = ["ab","cd"]
  const matchKeys = matcher(keys, [string].flat()); // matchKeys = ["ab"]
  const output = matchKeys.reduce(
    (pre, curr) => ({ ...pre, [curr]: object[curr] }),
    {}
  );
  //output = {ab:1}
  return output;
};

module.exports.FilterbyValues = function (input, object) {
  let temp = input;
  if (!Array.isArray(temp)) {
    temp = [temp];
  }
  const filteredEntries = Object.entries(object).filter(([key, value]) =>
    temp.includes(value)
  );
  return Object.fromEntries(filteredEntries);
};

module.exports.flatObject = function (string, object) {
  const matcher = require("matcher");
  const keys = Object.keys(object);

  const matchKeys = matcher(keys, [string]);
  return matchKeys.reduce((pre, curr) => {
    //check if curr property is object or not
    if (
      (typeof object[curr] === "object" ||
        typeof object[curr] === "function") &&
      object[curr] !== null
    ) {
      //curr property is object -> return flated object
      const { [curr]: flat, ...keep } = pre;
      return { ...keep, ...flat };
    } else {
      //if not, return previous object
      return pre;
    }
  }, object);
};
