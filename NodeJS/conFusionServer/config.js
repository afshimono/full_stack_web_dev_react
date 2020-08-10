require("dotenv").config();
module.exports = {
    secretKey: "12345-67890-09876-54321",
    mongoUrl:
        "mongodb+srv://" +
        process.env.MONGO_LOGIN +
        ":" +
        process.env.MONGO_PWD +
        "@sandbox.oxqrh.gcp.mongodb.net/coursera",
};
