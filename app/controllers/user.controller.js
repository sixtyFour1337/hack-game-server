const db = require('../models');
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {

    // validate request
    if (!req.body.username) {
        return res.status(400).send({ message: 'Content can not be empty!' });
    }

    // create a user
    const user = new User({
        username: req.body.username
    });

    // save user to database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.massage || 'Some error occurred while creating the user.'
            });
        });
};

// Retrieve all Users from the database
exports.findAll = (req, res) => {
    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving all users.'
            })
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({message: 'Not found user with id ' + id});
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || 'Some error occurred while retrieving a specific user'});
        });
};

// Update a User by the specific id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update user can not be empty!' });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({message: `Cannot update user with id=${id}. Maybe user was not found`});
            } else {
                res.send({message: 'User was updated successfully.'});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while updating the user'
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    
    User.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found.`
                });
            } else {
                res.send({
                    message: 'User was deleted successfully.'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting a specific user'
            });
        });
};

// Delete all Users from the database
exports.deleteAll = (req, res) => {
    User.deletemany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully.`
            });
        })
        .catch(err => {
            res.send({
                message: err.message || 'Some error occurred while removing all users'
            });
        }); 
};