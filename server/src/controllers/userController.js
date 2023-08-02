import User from "../models/UserModel.js";

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username ||!email ||!password ){
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        
        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return  res.status(400).json({message:"This Email is already registered"})
        }

        const user = await createUser({ username, email, password });
        
        return res.status(200).json({ message: "User added successfully"})

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}

export const getUserByEmail = (email) => User.findOne({email});
export const createUser = (values) => new User(values).save().then((user) => user.toObject());