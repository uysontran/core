module.exports = (socket) => {
  const intervals = [];
  socket.on("MSPerformance", () => {
    intervals.push(
      setInterval(() => {
        const pm2 = require("pm2");
        pm2.connect((err) => {
          if (err) {
          }
          pm2.list((err, list) => {
            socket.emit("MSPerformance", list);
          });
        });
      }, 1000)
    );
  });
  socket.on("disconnect", () => {
    intervals.forEach((interval) => {
      clearInterval(interval);
    });
  });
};
