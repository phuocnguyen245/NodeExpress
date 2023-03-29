import { commonMessage } from '../constant/index.js';
import { Orders } from '../models/order.js';

export const getOrder = async (req, res) => {
  try {
    const { user_id } = req.user;
    const orders = await Orders.find({ user_ID: user_id });
    res.status(200).json({ data: orders, message: commonMessage[200] });
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { products } = req.body;
    const order = new Orders(({
      products,
      user_ID: user_id,
    }));
    await order.save();
    const getProductId = products.map(product => ({
      id: product.id
    }));
    await Orders.deleteMany({ _id: getProductId });
    res.status(200).json({ message: commonMessage[200] });
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};
