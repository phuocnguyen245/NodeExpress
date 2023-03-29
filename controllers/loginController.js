import bcrypt from 'bcrypt';
import { generateAccessToken } from '../middleware/auth/index.js';
import { Users } from '../models/userModels.js';
import authenticator from 'authenticator'
import { commonMessage } from '../constant/index.js';
export const register = async (req, res) => {
  try {
    const { email, username, name, password } = req.body;
    const isHaveUsername = await Users.findOne({ username });
    if (isHaveUsername) {
      res.send({ message: 'Username already exists' });
      res.status(400);
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const base32 = authenticator.generateKey();
      const otpauth_url = authenticator.generateTotpUri(base32, `${email}-${username}`, "2FA Web App", 'SHA1', 6, 30);
      const user = new Users({
        username,
        name,
        email,
        password: encryptedPassword,
        base32,
        otpauth_url
      });
      await user.save();
      return res.send({ message: 'created' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const login = async (req, res) => {
  try {
    if (req.body) {
      const { username, password } = req.body;
      const user = await Users.findOne({ username });
      if (user._id && (await bcrypt.compare(password, user.password))) {
        const accessToken = generateAccessToken(user);
        res.cookie('accessToken', accessToken, { expires: new Date(Date.now() + 60 * 60 * 2 * 1000) });
        res.send({ user, accessToken });
      } else {
        res.status(400).send({ message: 'Username or password is incorrect' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const searchUser = async (req, res) => {
  try {
    const query = req.query.q;
    if (query !== '') {
      const user = await Users.find({ name: { $regex: `.*${query}.*` } });
      res.send({ user });
    } else {
      res.send({ user: [] });
    }
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const getUser = async (req, res) => {
  try {
    const { user_id } = req.user;
    if (user_id) {
      const user = await Users.findById({ _id: user_id });
      res.send({ user });
    } else {
      res.send({ user: [] });
    }
  } catch (error) {
    res.status(500).json({ message: commonMessage[500] });
  }
};

export const generateQRCode = async (req, res) => {
  // try {
  //   const { id, username } = req.body;
  //   const base32 = authenticator.generateKey();
  //   const otpauth_url = authenticator.generateTotpUri(base32, `${id}-${username}`, "2FA Web App", 'SHA1', 6, 30);
  //   res.send({ base32, otpauth_url })
  //   const user = await Users.findById({ _id: id })
  //   if (!user.base32 && !user.otpauth_url) {
  //     await Users.findByIdAndUpdate({ _id: id }, { base32, otpauth_url })
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: commonMessage[500] });
  // }
};

export const verifyGenerateQRCode = async (req, res) => {
  try {
    const { id, token } = req.body;
    const user = await Users.findById({ _id: id })
    const verify = authenticator.verifyToken(user.base32, token);
    if (verify.delta === 0) {
      res.send({ success: true, message: 'Success', verify })
    } else {
      res.status(400).json({ success: false, message: 'Token has expired', verify })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Token is not valid' })
  }
};