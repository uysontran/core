module.exports.post = async function (req, res) {
  const { Protocol } = require("../dao");
  try {
    await Protocol.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
