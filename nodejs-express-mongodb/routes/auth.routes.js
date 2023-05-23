module.exports = app => {
    const { verifySignUp } = require("../middlewares");
    const controller = require("../controllers/auth.controller");
  
    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    router.post(
        "/register",
        [
            verifySignUp.checkIfUserExists,
            verifySignUp.checkIfRolesExist
        ],
        controller.register
    );

    router.post("/login", controller.login);

    router.post("/logout", controller.logout);

    app.use('/authentication', router);
};