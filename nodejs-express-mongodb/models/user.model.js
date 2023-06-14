module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        new mongoose.Schema({
            userID: String,
            username: String,
            email: String,
            password: String,
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "role"
                }
            ],
            listOfAps: [
                {
                    appID: String,
                    appName: String,
                    purchaseDate: Date,
                    price: Number,
                    paymentMethod: String
                }
            ],
            premiumSubscriptions: [
                {
                    subscriptionID: String,
                    dateFrom: Date,
                    dateTo: Date
                }
            ],
            cart: [String]
        })
    );

    return User;
};