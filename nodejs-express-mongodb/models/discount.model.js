module.exports = mongoose => {
    const Discount = mongoose.model(
        "discount",
        new mongoose.Schema({
            app_id: Number,
            discount_value: Number
        })
    );
    return Discount;
};
