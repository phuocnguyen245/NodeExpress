import { orfusJson } from "../constant/orfus.js";


export const getOrfus = async (req, res) => {
  console.log('day');
  try {
    const q = req.query.mock;
    if (Object.keys(orfusJson).includes(q)) {
      return res.status(200).json(orfusJson[q]);
    }
    return res.status(400).json({});
  } catch (error) {
    return res.status(500).json({ message: 'fail' });
  }
};
