const db = require("../models");
const dateTime = require('node-datetime')
var ObjectId = require('mongodb').ObjectId;
const users = db.user;
const apps = db.apps;

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
            // console.log(data.cart);
            if (!data)
                res.status(404).send({ message: "Not found user with id " + id });
            else res.send(data.cart);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving user data with id:" + id + " err: " + err });
        });
}

// add to cart
exports.addItemToCart = (req, res) => {
    const appId = req.body.appID;
    
    users.updateOne(
        { _id: ObjectId(req.body.userID) }, // Find the user by their ObjectId
        { $addToSet: {cart: appId} }, // Add the new item to the cart array
      ).then(() => {
        console.log('Cart updated successfully ');
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
        { $pull: { cart: appId} }, // remove item from cart array
      ).then(() => {
        console.log('Cart updated successfully ');
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
}

// buy applications from cart
exports.buy = (req, res) => {
  buyApps(req.body.userID)
    .then(() => {
      // clear cart
      users.updateOne(
        { _id: ObjectId(req.body.userID) }, // Find the user by their ObjectId
        { $set: { cart: []} }, // remove item from cart array
      )
      .then(() => {
        console.log('Cart updated successfully ');})
      .catch(error => {
        console.error('Error updating cart:', error);});
    })
    .catch((error) => {
      console.error('Error in processAggCursor', error);
    });
}

async function buyApps(userID){
  var dt = dateTime.create().format('Y-m-d H:M:S');
  const pipeline = [
    {
      $match: { _id: ObjectId(userID)}
    },
    {
      $project: {
        _id: 0,
        cart: 1
      }
    },
    {
      $unwind: "$cart"
    },
    {
      $addFields: { _id: {$toObjectId: "$cart"}}
    },
    {
      $lookup: {
        from: "applications",
        localField: "_id",
        foreignField: "_id",
        as: "apps"
        }
    },
    {
      $unwind: "$apps"
    },
    {
      $replaceRoot: {
        newRoot: "$apps"
      }
    },
    {
      $addFields: {
        appID: { $toString: "$_id"},
        appName: "$name",
        purchaseDate: dt,
        paymentMethod: "card"
      }
    },
    {
      $project: {
        _id: 0,
        appID: 1,
        appName: 1,
        purchaseDate: 1,
        price: 1,
        paymentMethod: 1
      }
    },
  ]
  let aggCursor = users.aggregate(pipeline);

  for await (const app of aggCursor) {
    console.log(app);
    users.updateOne(
      { _id: ObjectId(userID) }, // Find the user by their ObjectId
      { $push: { listOfAps: app} }).then((data) => {
        console.log('Transaction sucessfull' + JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error doing transaction', error);
      });
    }

}