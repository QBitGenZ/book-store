const Book = require("../models/Book");
const {getAllDocuments} = require("../utils/querryDocument");

exports.donate = async (req, res) => {
  try {
    const {
      author,
      description,
      format,
      type,
      weight,
      size,
      pageNumber,
      pubDate,
      file,
      name,
      publisher,
    } = req.body;

    const object = new Book({
      author,
      description,
      donor: req.user.id,
      cost: 0,
      format,
      stockQuantity: 1,
      quantity: 1,
      type,
      weight,
      size,
      pageNumber,
      pubDate,
      price: 0,
      file,
      name,
      publisher,
      isEbook: true,
      isShow: false,
    });

    if (req.files?.["images"] && req.files?.["images"]?.length > 0) {
      object.images = req.files["images"]?.map(file => file.filename);
    }

    if (req.files?.["file"]?.[0]) {
      object.file = req.files?.["file"]?.[0].filename;
    }

    await object.save();
    res.status(201).json({
      data: object,
    });
  } catch (err) {
    console.err(err.message);
    res.status(500).json({error: err.message});
  }
};

exports.getProductsByOwner = async (req, res) => {
  let query = {
    donor: req.user.id,
  };
  getAllDocuments(Book, query, "name", req, res);
};

exports.getProductByOwner = async (req, res) => {
  try {
    const product = await Book.findOne({
      _id: req.params.id,
      donor: req.user.id,
    });
    if (!product) {
      return res.status(404).json({error: "Not found"});
    }
  } catch (err) {
    console.err(err.message);
    res.status(500).json({error: err.message});
  }
};

exports.deleteProductByOwner = async (req, res) => {
  try {
    const product = await Book.findOneAndDelete({donor: req.user.id, _id: req.query.id});
    if (!product) {
      return res.status(404).json({error: "Not found"});
    }
    res.status(204).send();
  } catch (err) {
    console.err(err.message);
    res.status(500).json({error: err.message});
  }
};