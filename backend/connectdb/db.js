const mongoose = require("mongoose")
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDb = (url)=>{
    return mongoose.connect(url)
}

module.exports = connectDb