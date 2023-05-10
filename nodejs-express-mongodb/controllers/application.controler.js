const db = require("../models");
const Application = db.applications;

// Create and Save a new Application
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Application
    const application = new Application({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        photos: req.body.photos,
        number_of_downloads: 0
    });

    // Save Application in the database
    Application.save(application)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Application."
            });
        });
};

// Retrieve all Applications from the database.
exports.findAll = (req, res) => {
    Application.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Application with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Application.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Application with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Application with id:" + id });
        });
};

// Update a Application by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
  
    const id = req.params.id;
  
    Application.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Application with id=${id}. Maybe Application was not found!`
                });
            } else res.send({ message: "Application was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Application with id:" + id
            });
        });
};

// Delete a Application with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Application.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Application with id=${id}. Maybe Application was not found!`
                });
            } else {
                res.send({
                    message: "Application was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Application with id:" + id
            });
        });
};

// Delete all Applications from the database.
exports.deleteAll = (req, res) => {
    Application.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Applications were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all applications."
            });
        });
};