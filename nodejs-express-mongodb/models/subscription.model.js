module.exports = mongoose => {
    const Subscription = mongoose.model(
        "subscription",
        new mongoose.Schema(
            {
                id: Number,
                rank: String,
                apps_with_discount: [ 
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "discount"
                }
            ],
                free_apps: [{type: Number}],
                price: Number,
                quantity: {type: Number, min: 0}

            })
        );
        return Subscription;
    }