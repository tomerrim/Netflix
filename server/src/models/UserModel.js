import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: true },
  favoritesList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  watchList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
});

const User = mongoose.model('User', userSchema);
export default User;