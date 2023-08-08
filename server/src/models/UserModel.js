import { mongoose, Schema } from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  favoritesList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  watchList: [{
    content: { type: Schema.Types.ObjectId, ref: "Content" },
    stoppedAt: { type: Number, default: 0 }
  }],
});

const User = mongoose.model('User', userSchema);
export default User;