const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const users = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public content");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("Content for users");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Content for admins");
};

exports.userCart = (req, res) => {
    const id = req.query.id;
    const o_id = new ObjectId(id);
    users.findById(o_id)
        .then(data => {
            console.log(data.cart);
            if (!data)
                res.status(404).send({ message: "Not found user with id " + id });
            else res.send(data.cart);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving user data with id:" + id });
        });
}

// add to cart
exports.addItemToCart = (req, res) => {
    console.log("user: " + req.body.userID +" app: " + req.body.appID);
    const id = req.body.id;
    const o_id = new ObjectId(id);
    const appId = req.body.appID;
    users.findOne(
        { _id: o_id }, // Find the user by their ObjectId
        { $push: { cart: appId} }, // Add the new item to the cart array
        { new: true } // Return the updated document
      ).then(data => console.log(data));
}
// remove item from cart
exports.removeItemFromCart = (req, res) => {
    console.log("data: "+ req.body);
    const id = req.body.userID;
    const o_id = new ObjectId(id);
    const appId = req.body.appID;
    users.findOne({_id:o_id}, (err, user) => {
        if(err) {
            console.log(err);
            return;
        }

        if(!user) {
            console.log('User not found');
            return;
        }

        user.cart.pull(appId);

        user.save((err) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log('Item removed from cart successfully');
        });
    });
}