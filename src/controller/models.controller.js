module.exports.post = async function (req, res) {
  try {
    await require("../database").Models.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
module.exports.get = async function (req, res) {
  try {
    const { id } = req.query;
    const result = await require("../database").Models.get(id);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
module.exports.getAll = async function (req, res) {
  try {
    const result = await require("../database").Models.getAll();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
