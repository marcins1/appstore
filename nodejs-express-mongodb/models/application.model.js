module.exports = mongoose => {
    const Application = mongoose.model(
      "application",
      mongoose.Schema(
        {
          appID: Number,
          name: String,
          price: Number,
          downloadSize: Number,
          description: String,
          photos: [String],
          numberOfDownloads: Number
        },
        { timestamps: true }
      )
    );
  
    return Application;
  };