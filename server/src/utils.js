import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
    return jwt.sign({ _id: user._id, username: user.username, email: user.email}, JWT_SECRET, { expiresIn: "15d" } );
};

export const isAuth = (req, res, next)  => {
    const bearerToken = req.headers.Authorization;
    if(bearerToken) {
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.sendStatus(401);
            }
            console.log("Decoded Token: ", decoded);
            req.user = decoded;
            next();
        })
    } else {
        return res.status(401).json({message:"Not authorized"});
    }
}
