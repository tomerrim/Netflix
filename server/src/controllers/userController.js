import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password: bcrypt.hashSync(password, 10),
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            username:user.username,
            email: user.email,
            token: generateToken(user),
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}

export const signIn = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await getUserByEmail(email);
    if(user) {
        if (bcrypt.compareSync(password, user.password)) {
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                token:generateToken(user),
            })
            return;
        }
    }
    res.status(401).send({message: "Invalid Credentials"});
};

export const getUserByEmail = (email) => User.findOne({email});
