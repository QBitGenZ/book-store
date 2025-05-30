const User = require('../models/User')
const {getAllDocuments} = require('../utils/querryDocument');
const bcrypt = require('bcryptjs');
const Address = require("../models/Address");

exports.getAllCustomer = async (req, res) => {

    const query = {
        $or: [
            {isAdmin: {$exists: false}},
            {isAdmin: false},
        ],
    };

    if (req.query.search)
        query.fullname = {$regex: req.query.search, $options: 'i'};

    const defaultField = 'fullname';
    getAllDocuments(User, query, defaultField, req, res);
}

exports.getAllAdmin = async (req, res) => {

    const query = {
        isAdmin: true,
    };

    if (req.query.search)
        query.fullname = {$regex: req.query.search, $options: 'i'};

    const defaultField = 'fullname';
    getAllDocuments(User, query, defaultField, req, res);
}

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id

        const object = await User.findById(id)

        res.status(200).json({
            data: object
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
}

exports.createOne = async (req, res) => {
    const {username, fullname, birthday, phone, address, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({error: 'User already exists'});
        }

        const newAddress = new Address({fullname, phone, address});
        const savedAddress = await newAddress.save();


        const newAdmin = new User({
            username,
            fullname,
            birthday,
            phone,
            address: [savedAddress._id],
            email,
            password,
            isAdmin: true
        });


        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(password, salt);

        await newAdmin.save();
        res.status(201).json({data: newAdmin});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
};

exports.updateOne = async (req, res) => {
    try {
        const {isAdmin} = req.body;
        const id = req.params.id;


        const object = await User.findById(id);

        if (!object) {
            return res.status(404).json({error: 'Not found'});
        }

        object.isAdmin = isAdmin

        await object.save();

        res.status(200).json({data: object});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
}

exports.deleteOne = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id)

        res.status(204).send()
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
}