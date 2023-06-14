module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        new mongoose.Schema({
            username: String,
            email: String,
            password: String,
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "role"
                }
            ],
            subscriptions: [{type: Number}]
        })
    );

    return User;
};