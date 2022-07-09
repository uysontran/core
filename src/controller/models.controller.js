module.exports.post = async function (req, res) {
  try {
    await require("../dao").Models.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
