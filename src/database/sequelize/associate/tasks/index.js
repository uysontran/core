module.exports = async function (sequelize) {
  const { RecurringTasks, Devices, ModelChannels } = sequelize.models;
  Devices.hasOne(RecurringTasks, {
    foreignKey: "DeviceID",
    onDelete: "CASCADE",
  });
  RecurringTasks.belongsTo(Devices, {
    foreignKey: "DeviceID",
    onDelete: "CASCADE",
  });
  RecurringTasks.belongsToMany(ModelChannels, {
    through: "RecurringChannels",
    onDelete: "CASCADE",
  });
  ModelChannels.belongsToMany(RecurringTasks, {
    through: "RecurringChannels",
    onDelete: "CASCADE",
  });

  await RecurringTasks.sync();
  await Devices.sync();
  await ModelChannels.sync();
};
