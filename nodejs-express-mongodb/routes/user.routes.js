module.exports = app => {
    const { authJwt } = require("../middlewares");
    const controller = require("../controllers/user.controller");
  
    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/all", controller.allAccess);

    router.get("/user", [authJwt.verifyToken], controller.userBoard);
  
    router.get(
        "/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.use('/authorization', router);
};