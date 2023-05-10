module.exports = mongoose => {
    const Application = mongoose.model(
      "application",
      mongoose.Schema(
        {
          name: String,
          price: Number,
          download_size: Number,
          description: String,
          photos: String,
          number_of_downloads: Number
        },
        { timestamps: true }
      )
    );
  
    return Application;
  };