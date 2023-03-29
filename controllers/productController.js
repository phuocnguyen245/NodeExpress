import { commonMessage } from '../constant/index.js';
import { Products } from '../models/productModels.js';

export const getProduct = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({ message: commonMessage[200], data: products });
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { category, img, name, price, qty } = req.body;
    console.log(req.body);
    if (!!category && !!img && !!name && !!price && !!qty) {
      const newProduct = new Products({
        img,
        name,
        price,
        qty: Number(qty),
        category
      });
      await newProduct.save();
    } else {
      res.status(400).json({ message: commonMessage[400] });
    }
    res.status(201).json({ message: commonMessage[201] });
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};
