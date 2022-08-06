const Scheduler = require(".");
Scheduler.addTask(() => {
  console.log(Date.now());
}, 1000);
