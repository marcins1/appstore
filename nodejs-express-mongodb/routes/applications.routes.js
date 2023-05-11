module.exports = app => {
    const applications = require("../controllers/application.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Application
    router.post("/", applications.create);
  
    // Retrieve all Applications
    router.get("/", applications.findAll);
  
    // Retrieve a single Application with id
    router.get("/:id", applications.findOne);
  
    // Update a Application with id
    router.put("/:id", applications.update);
  
    // Delete a Application with id
    router.delete("/:id", applications.delete);
  
    // Delete all Applications
    router.delete("/", applications.deleteAll);
  
    app.use('/applications', router);
  };