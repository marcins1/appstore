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
        [authJwt.verifyToken, 
            // authJwt.isAdmin
        ],
        controller.adminBoard
    );

    router.get(
        "/cart", 
        [authJwt.verifyToken], 
        controller.userCart
    );
    
    router.post(
        "/cart/add", 
        [authJwt.verifyToken], 
        controller.addItemToCart
    );

    router.post(
        "/cart/remove", 
        [authJwt.verifyToken], 
        controller.removeItemFromCart
    );

    router.post(
        "/cart/buy",
        [authJwt.verifyToken],
        controller.buy
    )

    router.get(
        "/myapps",
        [authJwt.verifyToken],
        controller.myApps
    )

    app.use('/authorization', router);
};