import { mongoose, Schema } from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  favoritesList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  watchList: [{
    content: { type: Schema.Types.ObjectId, ref: "Content" },
    stoppedAt: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
  }],
  likeList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  dislikeList: [{ type: Schema.Types.ObjectId, ref: "Content" }]
});

const User = mongoose.model('User', userSchema);
export default User;