const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Book = require('../models/Book')
const {getAllDocuments} = require("../utils/querryDocument");
const DeliveryStatus = require("../models/DeliveryStatus");
const PaymentStatus = require("../models/PaymentStatus");

exports.getAllByAdmin = async (req, res) => {
    let query;

    if (req.query.search)
        query.name = {$regex: req.query.search, $options: 'i'}

    const defaultField = 'createdAt';
    getAllDocuments(Order, query, defaultField, req, res, ['user', 'payment', 'items.product', 'delivery']);
}

exports.getAllBySelf = async (req, res) => {
    const query = {
        user: req.user.id
    };

    const defaultField = 'createdAt';
    getAllDocuments(Order, query, defaultField, req, res, [
        'user', 'payment', 'items.product', 'delivery', 'deliveryStatus', 'paymentStatus',
    ]);
}
//
// exports.createOne = async (req, res) => {
//     try {
//         const userId = req.user.id;
//
//         let cart = await Cart.findOne({user: userId}).populate('items.product');
//
//         if (!cart || cart.items.length === 0) {
//             return res.status(400).json({error: 'Cart is empty'});
//         }
//
//         const orderItems = cart.items.filter(value => value.checked === true).map(item => ({
//             product: item.product._id,
//             quantity: async () => {
//                 const book = await BookPage.findById(item?.product._id);
//                 const quantity = book.stockQuantity - item?.quantity
//                 book.stockQuantity = quantity > 0 ? quantity : 0;
//                 book?.save();
//                 return quantity >= 0 ? item?.quantity : book.stockQuantity + item?.quantity;
//             },
//             // quantity: item.quantity,
//             totalPrice: item.quantity * item.product.price,
//         }));
//
//         const totalPrice = orderItems.reduce((total, item) => total + item.totalPrice, 0);
//
//         const newOrder = new Order({
//             user: userId,
//             address: req.body.address,
//             items: orderItems,
//             delivery: req.body.delivery,
//             deliveryStatus: req.body.deliveryStatus,
//             payment: req.body.payment,
//             paymentStatus: req.body.paymentStatus,
//             totalPrice: totalPrice,
//         });
//
//         await newOrder.save();
//
//         // cart.items = cart.items.filter(value => value !== true);
//         cart.items = [];
//         await cart.save();
//
//         res.status(201).json({data: newOrder});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({error: err.message});
//     }
// };

exports.createOne = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({user: userId}).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({error: 'Cart is empty'});
        }

        // Process checked items for the order
        const orderItems = await Promise.all(
            cart.items
                .filter(item => item.checked === true)
                .map(async (item) => {
                    const book = await Book.findById(item.product._id);

                    let newQuantity = Math.max(book.stockQuantity - item.quantity, 0);
                    let actualOrderedQty = book.stockQuantity >= item.quantity ? item.quantity : book.stockQuantity;

                    book.stockQuantity = newQuantity;
                    await book.save();

                    return {
                        product: item.product._id,
                        quantity: actualOrderedQty,
                        totalPrice: actualOrderedQty * item.product.price,
                    };
                })
        );

        if (orderItems.length === 0) {
            return res.status(400).json({error: 'No checked items available in the cart.'});
        }

        const totalPrice = orderItems.reduce((total, item) => total + item.totalPrice, 0);
        let deliveryStatus = await  DeliveryStatus.findOne({'name':'Đang chờ duyệt'});
        let paymentStatus = await PaymentStatus.findOne({'name': 'Chưa thanh toán'});


        const newOrder = new Order({
            user: userId,
            address: req.body.address,
            items: orderItems,
            delivery: req.body.delivery,
            deliveryStatus: req.body.deliveryStatus || deliveryStatus._id,
            payment: req.body.payment,
            paymentStatus:req.body.paymentStatus || paymentStatus._id ,
            totalPrice: totalPrice,
        });
        console.log(req.body.address);

        await newOrder.save();

        // Retain only unchecked items in the cart
        cart.items = cart.items.filter(item => item.checked === false);
        await cart.save();

        res.status(201).json({data: newOrder});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
};


exports.updateDeliveryStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const {deliveryStatus, paymentStatus} = req.body;

        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({error: 'Types not found'});
        }

        order.deliveryStatus = deliveryStatus || order.deliveryStatus;
        order.paymentStatus = paymentStatus || order.paymentStatus;
        if (paymentStatus) {
            order.paymentDate = new Date()
        }

        await order.save();

        res.status(200).json({data: order});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
};

// exports.deleteOrder = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const userId = req.user.id;
//
//         // Tìm order theo ID
//         const order = await Order.findById(orderId).populate('items.product');
//
//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }
//
//         if (order.user.toString() !== userId) {
//             return res.status(403).json({ error: 'You do not have permission to delete this order' });
//         }
//
//         // Lấy cart của người dùng
//         let cart = await Cart.findOne({ user: userId });
//         if (!cart) {
//             // Tạo cart mới nếu chưa tồn tại
//             cart = new Cart({ user: userId, items: [] });
//         }
//
//         // Thêm các sản phẩm từ order vào cart và cập nhật stockQuantity
//         order.items.forEach(async (item) => {
//             const product = await Book.findById(item.product._id);
//
//             // Cập nhật stockQuantity
//             product.stockQuantity += item.quantity;
//             await product.save();
//
//             // Kiểm tra nếu sản phẩm đã tồn tại trong cart
//             const cartItemIndex = cart.items.findIndex(
//               (cartItem) => cartItem.product.toString() === item.product._id.toString()
//             );
//
//             if (cartItemIndex >= 0) {
//                 // Nếu đã tồn tại, tăng quantity
//                 cart.items[cartItemIndex].quantity += item.quantity;
//             } else {
//                 // Nếu chưa tồn tại, thêm sản phẩm mới vào cart
//                 cart.items.push({
//                     product: item.product._id,
//                     quantity: item.quantity,
//                     checked: false, // Đặt mặc định là chưa được chọn
//                 });
//             }
//         });
//
//         await cart.save();
//
//         // Xóa order
//         await order.deleteOne();
//
//         res.status(200).json({ message: 'Order deleted and items returned to cart successfully.' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: err.message });
//     }
// };

exports.deleteOrder = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate('items.product');
        if (!order) {
            return false;
        }
        const userId = order.user;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }
        for (const item of order.items) {
            const product = await Book.findById(item.product._id);
            product.stockQuantity += item.quantity;
            await product.save();
            const cartItemIndex = cart.items.findIndex(
              (cartItem) => cartItem.product.toString() === item.product._id.toString()
            );

            if (cartItemIndex >= 0) {
                cart.items[cartItemIndex].quantity += item.quantity;
            } else {
                cart.items.push({
                    product: item.product._id,
                    quantity: item.quantity,
                    checked: false,
                });
            }
        }

        await cart.save();
        await order.deleteOne();
        return true;
    } catch (err) {
       return false;
    }
};
