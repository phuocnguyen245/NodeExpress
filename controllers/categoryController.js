import { commonMessage } from "../constant/index.js";
import { Categories } from "../models/categoriesModels.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({ message: commonMessage[200], data: categories });
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!!name) {
      const newCategories = new Categories({
        name
      });
      await newCategories.save();
      res.status(201).json({ message: commonMessage[201] });
    } else {
      res.status(400).json({ message: commonMessage[400] });
    }
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};