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
                    likeList: user.likeList,
                    dislikeList: user.dislikeList,
                },
                token:generateToken(user),
            })
            return;
        }
    }
    res.status(401).send("Invalid Credentials");
};

export const toggleFavorite = async (req, res) => {
    try {

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
    } catch (err) {
        console.error("Error in toggleFavorite: ", err);
        res.status(500).send("Internal Server Error");
    }
}

export const toggleWatchList = async (req, res) => {
    console.log("toggleWatchList endpoint hit");
    try {
        const userId = req.user._id;
        const contentId = req.params.contentId;
        const stoppedAt = req.body.watchItem.stoppedAt || 0;
        console.log("request body: ", req.body);
        console.log("stopped at: ",stoppedAt);
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User Not Found");

        const watchItem = user.watchList.find(item => item.content.toString() === contentId);
        if(!watchItem) {
            user.watchList.push({content: contentId, stoppedAt})
        } else if (stoppedAt === "end") {
            const index = user.watchList.findIndex(watchItem => watchItem.content.toString() === contentId);
            user.watchList.splice(index,1);
        } else {
            watchItem.stoppedAt = stoppedAt;
        }

        await user.save();
        await user.populate("watchList.content");

        res.json({watchList: user.watchList});
    } catch (err) {
        console.error("Error in toggleWatchList: ", err);
        res.status(500).send('Internal Server Error');
    }
}

export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const contentId = req.params.contentId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User Not Found");

    const index = user.likeList.indexOf(contentId);
    if (index === -1) {
      user.likeList.push(contentId);
    } else {
      user.likeList.splice(index, 1);
    }

    await user.save();
    await user.populate("likeList");

    res.json({ likeList: user.likeList });
  } catch (err) {
    console.error("Error in toggleLike: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const toggleDislike = async (req, res) => {
  try {
    const userId = req.user._id;
    const contentId = req.params.contentId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User Not Found");

    const index = user.dislikeList.indexOf(contentId);
    if (index === -1) {
      user.dislikeList.push(contentId);
    } else {
      user.dislikeList.splice(index, 1);
    }

    await user.save();
    await user.populate("dislikeList");

    res.json({ dislikeList: user.dislikeList });
  } catch (err) {
    console.error("Error in toggleDislike: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserByEmail = (email) =>
  User.findOne({ email })
    .populate("favoritesList")
    .populate("watchList.content")
    .populate("likeList")
    .populate("dislikeList")
    .catch(err => {
        console.error("Error fetching user by email: ", err);
        return null;
    });
