const Author = require('../models/Author');
const { deleteFile } = require('../utils/deleteFile');
const { getAllDocuments } = require('../utils/querryDocument');
const Product = require('../models/Book')


exports.getAll = async (req, res) => {
  let query;

  if(req.query.search)
    query.name = { $regex: req.query.search, $options: 'i' }

  const defaultField = 'fullname';
  getAllDocuments(Author, query, defaultField, req, res);
}

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id
    
    const object = await Author.findById(id)

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
      fullname,
      birthday,
      nationality,
      biography,
    } = req.body;

    const object = new Author({
      fullname,
      birthday,
      nationality,
      biography,
    })

    if(req.files?.['avatar']?.[0]) {
      object.avatar = req.files['avatar'][0].filename
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
      fullname,
      birthday,
      nationality,
      biography, 
    } = req.body;

    const id = req.params.id;
  
    const object = await Author.findById(id);
  
    if (!object) {
      return res.status(404).json({ error: 'Not found' });
    }

    object.fullname = fullname || object.fullname;
    object.birthday = birthday || object.birthday;
    object.nationality = nationality || object.nationality;
    object.biography = biography || object.biography;

    if(req.files?.['avatar']?.[0]) {
      if(object.avatar) {
        deleteFile(object.avatar, res)
      }
      object.avatar = req.files['avatar'][0].filename
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
    const object = await Author.findByIdAndDelete(id)
    
    if(object.avatar) {
      deleteFile(object.avatar, res)
    }

    res.status(204).send()
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.getProductByAuthor = async (req, res) => {
  const id = res.params.id;

  try {
    const author = await Author.findById(id)
  
    const query = { 
      author: author.id,
      name: req.query.search ? { $regex: req.query.search, $options: 'i' } : null,
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