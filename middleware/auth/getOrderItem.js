import { Orders } from '../../models/orderModels';
const decodeJWT = require('jwt-decode');

export const getOrders = async (req, res, next) => {
    const accessToken = req.cookies['access_token'];
    const user = decodeJWT(accessToken);
    const order = await Orders.findOne({
        userId: user._id,
        ordered: false
    }).populate({
        path: 'orderItems',
        populate: {
            path: 'productId',
            model: 'Product'
        }
    }).exec();
    if (order) {
        req.order = order;
    }
    next();
};