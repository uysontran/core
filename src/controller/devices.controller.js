module.exports.post = async function (req, res) {
  try {
    await require("../database").Devices.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
// module.exports.get = async function (req, res) {
//   try {
//     const { id } = req.query;
//     const result = await require("../dao").Devices.get(id);
//     res.send(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
