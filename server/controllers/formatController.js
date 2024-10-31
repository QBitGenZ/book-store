const Format = require('../models/Format')
const {getAllDocuments} = require('../utils/querryDocument');
const Product = require('../models/Book')

exports.getAll = async (req, res) => {
    let query = {};

    if (req.query.search)
        query.name = {$regex: req.query.search, $options: 'i'}

    const defaultField = 'name';
    getAllDocuments(Format, query, defaultField, req, res);
}

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id

        const object = await Format.findById(id)

        res.status(200).json({
            data: object
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
}

exports.createOne = async (req, res) => {
    try {
        const {name, description} = req.body;

        const object = new Format({
            name,
            description
        })

        await object.save()
        res.status(201).json({
            data: object
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
}

exports.updateOne = async (req, res) => {
    try {
        const {name, description} = req.body;
        const id = req.params.id;

        const object = await Format.findById(id);

        if (!object) {
            return res.status(404).json({error: 'Not found'});
        }

        object.name = name || object.name;
        object.description = description || object.description;

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
        await Format.findByIdAndDelete(id)

        res.status(204).send()
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
}

exports.getProductByFormat = async (req, res) => {
    const id = res.params.id;

    try {
        const format = await Format.findById(id)

        const query = {
            name: req.query.search ? {$regex: req.query.search, $options: 'i'} : null,
            format: format.id
        };

        const defaultField = 'name';
        getAllDocuments(Product, query, defaultField, req, res);
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            error: err.message
        })
    }
}