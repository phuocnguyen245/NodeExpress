import jwt from 'jsonwebtoken';
import { commonMessage } from '../../constant/index.js';

export const verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const accessToken = token.split(' ')[1];
    console.log(accessToken);
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_KEY,
      (err, user) => {
        if (err) {
          res.status(403).json({ message: commonMessage[403] });
        } else {
          req.user = user;
          next();
        }
      },
    );
  } else {
    res.status(401).json({ message: commonMessage[401] });
  }
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      user_id: user._id,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: '2h' },
  );
};

export default verify;
