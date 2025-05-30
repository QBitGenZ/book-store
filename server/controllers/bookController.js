const Book = require("../models/Book");
const Order = require("../models/Order");
const {deleteFile} = require("../utils/deleteFile");
const {getAllDocuments} = require("../utils/querryDocument");


exports.getAll = async (req, res) => {
  let query = {};

  if (req.query.search) {
    query.name = {$regex: req.query.search, $options: "i"};
  }

  if (req.query.minPrice && req.query.maxPrice) {
    query.price = {
      $gte: parseInt(req.query.minPrice, 10),
      $lte: parseInt(req.query.maxPrice, 10),
    };
  }

  if (req.query.isEbook !== null && req.query.isEbook !== undefined) {
    query.isEbook = req.query.isEbook;
  }
  if (req.query.isShow !== null && req.query.isShow !== undefined) {
    query.isShow = req.query.isShow;
  }

  const defaultField = "name";
  getAllDocuments(Book, query, defaultField, req, res, ['donor']);
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;

    const object = await Book.findById(id).populate('donor');

    res.status(200).json({
      data: object,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: err.message});
  }
};

exports.getTop = async (req, res) => {
  try {
    let topN = 5;
    if (req.query.top) {
      topN = req.query.top;
    }
    topN = parseInt(topN, 10);
    console.log(topN)
    const topBooks = await Order.aggregate([{ $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "books", // Collection Book
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {$unwind: "$bookDetails"},

      {
        $project: {
          _id: 1,
          bookId: "$_id",          // The product's ID (bookId)
          totalQuantity: 1,       // The total quantity sold
          name: "$bookDetails.name",
          type: "$bookDetails.type",
          author: "$bookDetails.author",
          publisher: "$bookDetails.publisher",
          pubDate: "$bookDetails.pubDate",
          size: "$bookDetails.size",
          weight: "$bookDetails.weight",
          pageNumber: "$bookDetails.pageNumber",
          stockQuantity: "$bookDetails.stockQuantity",
          quantity: "$bookDetails.quantity",
          cost: "$bookDetails.cost",
          price: "$bookDetails.price",
          format: "$bookDetails.format",
          description: "$bookDetails.description",
          images: "$bookDetails.images",
          isEbook: "$bookDetails.isEbook",
          isShow: "$bookDetails.isShow",
        },
      }
    ]);

    // const topBooks = await Order.aggregate([
    //   { $unwind: "$items" },
    //   {
    //     $group: {
    //       _id: "$items.product",
    //       totalQuantity: { $sum: "$items.quantity" },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "books", // Collection Book
    //       localField: "_id",
    //       foreignField: "_id",
    //       as: "bookDetails",
    //     },
    //   },
    //   { $sort: { totalQuantity: -1 } },
    //   { $limit: topN },
    //   {$unwind: "$bookDetails"},
    //   {
    //     $replaceRoot: { newRoot: "$bookDetails" }
    //   },
    // ]);

    res.status(200).json({
      data: topBooks,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: err.message});
  }
}

exports.createPBook = async (req, res) => {
  try {
    const {
      author,
      cost,
      description,
      format,
      stockQuantity,
      type,
      weight,
      size,
      pageNumber,
      pubDate,
      price,
      file,
      name,
      publisher,
      isEbook,
      isShow,
      donor,
      translator,
    } = req.body;

    const object = new Book({
      author,
      cost,
      description,
      format,
      stockQuantity,
      quantity: stockQuantity,
      type,
      weight,
      size,
      pageNumber,
      pubDate,
      price,
      file,
      name,
      publisher,
      donor,
      isEbook,
      isShow,
      translator,
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
    console.error(err.message);
    res.status(500).json({error: err.message});
  }
};

exports.updatePBook = async (req, res) => {
  try {
    const {
      author,
      cost,
      description,
      format,
      stockQuantity,
      type,
      weight,
      size,
      pageNumber,
      pubDate,
      price,
      file,
      name,
      publisher,
      donor,
      isEbook,
      isShow,
      translator,
      quantity,
    } = req.body;

    const id = req.params.id;

    const object = await Book.findById(id);

    if (!object) {
      return res.status(404).json({error: "Not found"});
    }

    object.cost = cost || object.cost;
    object.description = description || object.description;
    object.format = format || object.format;
    object.stockQuantity = stockQuantity || object.stockQuantity;
    object.type = type || object.type;
    object.weight = weight || object.weight;
    object.size = size || object.size;
    object.pageNumber = pageNumber || object.pageNumber;
    object.pubDate = pubDate || object.pubDate;
    object.price = price || object.price;
    object.file = file || object.file;
    object.name = name || object.name;
    object.publisher = publisher || object.publisher;
    object.author = author || object.author;
    object.isEbook = isEbook || object.isEbook;
    object.isShow = isShow || object.isShow;
    object.donor = donor || object.donor;
    object.translator = translator || object.translator;
    object.quantity = quantity || object.quantity;


    if (req.files?.["images"] && req.files?.["images"]?.length > 0) {
      const images = req.files["images"]?.map(file => file.filename);
      object.images = [...object.images, ...images];
    }

    if (req.files?.["file"]?.[0]) {
      if (object.file) {
        deleteFile(object.file, res);
      }
      object.file = req.files?.["file"]?.[0].filename;
    }

    await object.save();

    res.status(200).json({data: object});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: err.message});
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const object = await Book.findByIdAndDelete(id);

    object.images.forEach(file => {
      deleteFile(file, res);
    });

    if (object.file) {
      deleteFile(object.file, res);
    }

    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: err.message});
  }
};

exports.deleteImage = async (req, res) => {
  const {id, image} = req.params;

  try {
    let book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({error: "Not found"});
    }

    if (!book.images.includes(image)) {
      return res.status(404).json({error: "Not found"});
    }

    deleteFile(image, res);

    book.images = book.images.filter(i => i !== image);
    await book.save();

    res.json({data: book});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Server error"});
  }
};