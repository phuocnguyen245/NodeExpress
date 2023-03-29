import jwtDecode from 'jwt-decode';
import { Users } from '../models/userModels.js';
export const checkToken = (req) => {
    if (req.cookies.accessToken === req.headers.authorization.split(' ')[1]) {
        return true;
    } else {
        return false;
    }
};

export const getUserId = async (req, res, next) => {
    const user = jwtDecode(req.cookies.accessToken);
    const isHaveUser = await Users.findOne({ _id: user._id });
    if (isHaveUser) {
        req.user = user;
    } else {
        req.user = {};
    }
    next();
};