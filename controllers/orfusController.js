import { orfusJson } from "../constant/orfus.js";

export const getOrfus = async (req, res) => {
  try {
    const q = req.query.mock;
    const findIndex = req.url.split('').findIndex((x) => x === '?')
    const url = req.url.split('').slice(1, findIndex).join('');
    if (Object.keys(orfusJson).includes(url)) {
      return res.status(200).json(orfusJson[url][q]);
    }
    return res.status(400).json({});
  } catch (error) {
    return res.status(500).json({ message: 'fail' });
  }
};
