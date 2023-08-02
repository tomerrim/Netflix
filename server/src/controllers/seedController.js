import { data } from "../data.js";
import User from "../models/UserModel.js";
import Content from "../models/contentModel.js";
export const seedData = async (req, res) => {
    try {
        await User.deleteMany({});
        await Content.deleteMany({});

        const createContent = await Content.insertMany(data.content);
        const createUsers = await User.insertMany(data.users);

        res.send({createContent, createUsers});
    } catch (error) {
        console.error("ERROR: ", error.message);
    }
}