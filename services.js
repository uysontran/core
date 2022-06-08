const axios = require("axios");
const services = require("./services.json");
setTimeout(() => {
  for (const service of services) {
    try {
      axios.post("http://localhost:33333/microservices", service);
    } catch (err) {
      console.log(err);
    }
  }
}, 5000);
