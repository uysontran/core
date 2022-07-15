module.exports.post = async function (req, res) {
  const { Protocol } = require("../database");
  try {
    await Protocol.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
