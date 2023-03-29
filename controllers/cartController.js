import { commonMessage } from '../constant/index.js';
import { Cart } from '../models/cartModels.js';
import { checkToken } from '../utils/checkUserToken.js';

const updateQtyType = {
  PLUS: 1,
  MINUS: 0
};

const productMessage = {
  CREATE: 'Product has been created',
  UPDATE: 'Product has been updated',
  DELETE: 'Product has been deleted',
  DELETE_ALL: 'All products has been deleted'
};

export const renderCart = async (req, res) => {
  try {
    const { user_id } = req.user;
    const cartItem = await Cart.find({ user_ID: user_id }).populate({
      path: 'product_ID',
    });
    res.status(200).json({ data: cartItem, message: commonMessage[200] });
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const { user_id } = req.user;
    const isHave = await Cart.findOne({ product_ID: productId, user_ID: user_id });
    if (isHave) {
      await Cart.findOneAndUpdate({ product_ID: productId, user_ID: user_id }, { qty: isHave.qty + qty });
      res.status(200).json({ message: productMessage.UPDATE });
    } else {
      const cartItem = new Cart({
        product_ID: productId,
        qty: Number(qty),
        user_ID: user_id,
      });
      await cartItem.save();
      res.status(201).json({ message: productMessage.CREATE });
    }
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const updateCartQty = async (req, res) => {
  try {
    const { type, productId, qty } = req.body;

    const { user_id } = req.user;
    const product = await Cart.findOne({ product_ID: productId, user_ID: user_id });
    if (Number(type) === updateQtyType.PLUS) {
      await Cart.findOneAndUpdate({ product_ID: productId, user_ID: user_id }, { qty: product.qty + qty });
      res.status(200).json({ message: productMessage.UPDATE });
    } else {
      if (product.qty - qty > 0) {
        await Cart.findOneAndUpdate({ product_ID: productId, user_ID: user_id }, { qty: product.qty - qty });
        res.status(200).json({ message: productMessage.UPDATE });
      } else {
        await Cart.findOneAndDelete({ product_ID: productId, user_ID: user_id });
        res.status(200).json({ message: productMessage.DELETE });
      }
    }

  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    console.log(user_id, id);
    await Cart.findOneAndDelete({ product_ID: id, user_ID: user_id });
    res.status(200).json({ message: productMessage.DELETE });
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const deleteAllCartItems = async (req, res) => {
  try {
    const { user_id } = req.user;
    await Cart.deleteMany({ user_ID: user_id });
    res.status(200).json({ message: productMessage.DELETE_ALL });
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
    console.log('123')
  }
};

