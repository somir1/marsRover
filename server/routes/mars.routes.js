const MarsCon = require("../controllers/mars.controllers");

module.exports = app => {
    app.get("/api/curiosity/images", MarsCon.findAllImages);
}