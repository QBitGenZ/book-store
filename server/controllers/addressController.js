const Address = require('../models/Address');
const User = require('../models/User');
const {getAllDocuments} = require('../utils/querryDocument');

exports.getAllAddress = async (req, res) => {
    let query;

    if (req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'};
    }

    const defaultField = 'address';
    getAllDocuments(Address, query, defaultField, req, res);
};

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const object = await Address.findById(id);
        res.status(200).json({
            data: object
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
};

exports.createAddress = async (req, res) => {
    try {
        const {name, phone, addressDetail} = req.body;
        const userID = req.user.id;
        const newAddress = new Address({name, phone, addressDetail});
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        await newAddress.save();
        user.address = [...user.address, newAddress._id];
        await user.save();
        res.status(201).json({data: newAddress});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const {name, phone, addressDetail} = req.body;
        const id = req.params.id;

        const object = await Address.findById(id);
        if (!object) {
            return res.status(404).json({error: 'Address not found'});
        }

        if (name) object.name = name;
        if (phone) object.phone = phone;
        if (addressDetail) object.addressDetail = addressDetail;

        await object.save();
        res.status(200).json({data: object});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.user.id;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const object = await Address.findByIdAndDelete(id);
        if (!object) {
            return res.status(404).json({error: 'Address not found'});
        }

        // Remove the address ID from the user's address array
        user.address = user.address.filter(addressId => addressId.toString() !== object._id.toString());
        await user.save();

        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
};
