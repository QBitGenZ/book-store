const ProductType = require('../models/ProductType');
const Publisher = require('../models/Publisher');
const Book = require('../models/Book');
const Order = require('../models/Order');

// Thống kê doanh thu, số lượng bán ra, số lượng tồn theo sản phẩm
const getProductStatistics = async () => {
  return await Book.aggregate([
    {
      $lookup: {
        from: 'orderitems',
        localField: '_id',
        foreignField: 'product',
        as: 'orderItems'
      }
    },
    {
      $addFields: {
        soldQuantity: { $sum: '$orderItems.quantity' },
        revenue: { $sum: { $multiply: ['$price', '$orderItems.quantity'] } }
      }
    },
    {
      $project: {
        name: 1,
        stockQuantity: 1,
        soldQuantity: 1,
        revenue: 1,
      }
    }
  ]);
};

// Thống kê doanh thu, số lượng bán ra theo loại sản phẩm
const getTypeStatistics = async () => {
  return await ProductType.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'type',
        as: 'books'
      }
    },
    { $unwind: '$books' },
    {
      $lookup: {
        from: 'orderitems',
        localField: 'books._id',
        foreignField: 'product',
        as: 'orderItems'
      }
    },
    {
      $addFields: {
        soldQuantity: { $sum: '$orderItems.quantity' },
        revenue: { $sum: { $multiply: ['$books.price', { $sum: '$orderItems.quantity' }] } }
      }
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        soldQuantity: { $sum: '$soldQuantity' },
        revenue: { $sum: '$revenue' },
        stockQuantity: { $sum: '$books.stockQuantity' }
      }
    }
  ]);
};

// Thống kê doanh thu, số lượng bán ra theo tác giả
const getAuthorStatistics = async () => {
  return await Book.aggregate([
    {
      $lookup: {
        from: 'orderitems',
        localField: '_id',
        foreignField: 'product',
        as: 'orderItems'
      }
    },
    {
      $addFields: {
        soldQuantity: { $sum: '$orderItems.quantity' },
        revenue: { $sum: { $multiply: ['$price', '$orderItems.quantity'] } }
      }
    },
    {
      $lookup: {
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }
    },
    { $unwind: '$author' },
    {
      $group: {
        _id: '$author._id',
        name: { $first: '$author.name' },
        soldQuantity: { $sum: '$soldQuantity' },
        revenue: { $sum: '$revenue' },
        stockQuantity: { $sum: '$stockQuantity' }
      }
    }
  ]);
};

// Thống kê doanh thu, số lượng bán ra theo nhà xuất bản
const getPublisherStatistics = async () => {
  return await Publisher.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'publisher',
        as: 'books'
      }
    },
    { $unwind: '$books' },
    {
      $lookup: {
        from: 'orderitems',
        localField: 'books._id',
        foreignField: 'product',
        as: 'orderItems'
      }
    },
    {
      $addFields: {
        soldQuantity: { $sum: '$orderItems.quantity' },
        revenue: { $sum: { $multiply: ['$books.price', { $sum: '$orderItems.quantity' }] } }
      }
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        soldQuantity: { $sum: '$soldQuantity' },
        revenue: { $sum: '$revenue' },
        stockQuantity: { $sum: '$books.stockQuantity' }
      }
    }
  ]);
};

// Controller chính để gọi các hàm thống kê và trả về kết quả tổng hợp
const getStatistics = async (req, res) => {
  try {
    const productStatistics = await getProductStatistics();
    const typeStatistics = await getTypeStatistics();
    const authorStatistics = await getAuthorStatistics();
    const publisherStatistics = await getPublisherStatistics();

    res.status(200).json({
      productStatistics,
      typeStatistics,
      authorStatistics,
      publisherStatistics
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStatistics,
  getProductStatistics,
  getTypeStatistics,
  getAuthorStatistics,
  getPublisherStatistics
};
