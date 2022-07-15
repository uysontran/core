module.exports = function (sequelize) {
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
  });
  ModelChannels.belongsToMany(RecurringTasks, {
    through: "RecurringChannels",
  });
};
