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
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).send("Email already registered")
        }
        const user = await newUser.save();
        res.send({
            _id: user._id,
            username:user.username,
            email: user.email,
            token: generateToken(user),
        });

    } catch (error) {
        console.log("Error during signUp: ",error);
        return res.status(500).send("Server error. Please try again later.");
    }
}

export const signIn = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await getUserByEmail(email);
    if(user) {
        if (bcrypt.compareSync(password, user.password)) {
            res.send({
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    favoritesList: user.favoritesList,
                    watchList: user.watchList,
                },
                token:generateToken(user),
            })
            return;
        }
    }
    res.status(401).send("Invalid Credentials");
};

export const toggleFavorite = async (req, res) => {
    const userId = req.user._id;
    const contentId = req.params.contentId;

    const user = await User.findById(userId);
    if(!user) return res.status(404).send("User Not Found");

    const index = user.favoritesList.indexOf(contentId);
    if(index === -1) {
        user.favoritesList.push(contentId);
    } else {
        user.favoritesList.splice(index, 1);
    }

    await user.save();
    await user.populate("favoritesList");

    res.json({favoritesList: user.favoritesList});
}

// export const addToWatchList = async (req, res) => {
//     const userId = req.body.user._id;
//     const contentId = req.body.content._id;
//     const stoppedAt = req.body.stoppedAt;
    
//     const user = await User.findById(userId);
//     user.watchList.push({content: contentId, stoppedAt});
//     await user.save();
//     res.json({success: true});
// }

// export const getWatchList = async (req,res) => {
//     const userId = req.body.user._id;
//     const user = await User.findById(userId).populate("watchList.content");
//     res.json(user.watchList);
// }

export const toggleWatchList = async (req, res) => {
    const userId = req.user._id;
    const contentId = req.params.contentId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User Not Found");
    const index = user.watchList.findIndex(watchItem => watchItem.content.toString() === contentId);
    if (index === -1) {
        user.watchList.push({content:contentId, stoppedAt: 0});
    } else {
        user.watchList.splice(index,1);
    }

    await user.save();
    await user.populate("watchList.content");

    res.json({watchList: user.watchList});
}

export const getUserByEmail = (email) =>
  User.findOne({ email })
    .populate("favoritesList")
    .populate("watchList.content")
    .catch(err => {
        console.error("Error fetching user by email: ", err);
        return null;
    });
