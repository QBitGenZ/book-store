const Publisher = require('../models/Publisher');
const { deleteFile } = require('../utils/deleteFile');
const { getAllDocuments } = require('../utils/querryDocument');
const Product = require('../models/Book')


exports.getAll = async (req, res) => {
  let query;

  if (req.query.search) { 
    query.name = { $regex: req.query.search, $options: 'i' } 
  };

  const defaultField = 'name';
  getAllDocuments(Publisher, query, defaultField, req, res);
}

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id
    
    const object = await Publisher.findById(id)

    res.status(200).json({
      data: object
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.createOne = async (req, res) => {
  try {
    const { 
      name,
      address,
      website,
      email,
      phone,
      establishedDate 
    } = req.body;

    const object = new Publisher({
      name,
      address,
      website,
      email,
      phone,
      establishedDate 
    })

    if(req.files?.['logo']?.[0]) {
      object.logo = req.files['logo'][0].filename
    }

    await object.save()
    res.status(201).json({
      data: object
    })

  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.updateOne = async (req, res) => {
  try {
    const { 
      name,
      address,
      website,
      email,
      phone,
      establishedDate 
    } = req.body;

    const id = req.params.id;
  
    const object = await Publisher.findById(id);
  
    if (!object) {
      return res.status(404).json({ error: 'Not found' });
    }

    object.name = name || object.name;
    object.address = address || object.address;
    object.website = website || object.website;
    object.email = email || object.email;
    object.phone = phone || object.phone;
    object.establishedDate = establishedDate || object.establishedDate

    if(req.files?.['logo']?.[0]) {
      if(object.logo) {
        deleteFile(object.logo, res)
      }
      object.logo = req.files['logo'][0].filename
    }

    await object.save();

    res.status(200).json({ data: object });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const object = await Publisher.findByIdAndDelete(id)
    
    if(object.logo) {
      deleteFile(object.logo, res)
    }

    res.status(204).send()
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.getProductByPublisher = async (req, res) => {
  const id = res.params.id;

  try {
    const publisher = await Publisher.findById(id)
  
    const query = { 
      name: req.query.search ? { $regex: req.query.search, $options: 'i' } : null,
      publisher: publisher.id
    };

    const defaultField = 'name';
    getAllDocuments(Product, query, defaultField, req, res);
  }
  catch(err) {
    console.error(err.message)
    res.status(500).json({
      error: err.message
    })
  }  
}