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
    const appId = req.body.appID;
    
    users.updateOne(
        { _id: ObjectId(req.body.userID) }, // Find the user by their ObjectId
        { $push: {cart: appId} }, // Add the new item to the cart array
      ).then((data) => {
        console.log('Cart updated successfully ' + JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
}
// remove item from cart
exports.removeItemFromCart = (req, res) => {
    const appId = req.body.appID;
    users.updateOne(
        { _id: ObjectId(req.body.userID) }, // Find the user by their ObjectId
        { $pull: { cart: appId} }, // Add the new item to the cart array
      ).then((data) => {
        console.log('Cart updated successfully ' + data);
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
}