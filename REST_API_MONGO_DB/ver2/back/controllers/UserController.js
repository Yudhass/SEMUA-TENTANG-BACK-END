// UserController.js
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const saveUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const insertUser = await user.save();
        res.status(201).json(insertUser);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            {
                _id: req.params.id
            }, {
            $set: req.body
        });
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne(
            {
                _id: req.params.id
            }
        );
        
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}