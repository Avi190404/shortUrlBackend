import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    originalLink: {
        type: String,
        required: true,
    },
    shortLink: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const SHORTLINK = mongoose.model("ShortLink", linkSchema);
export default SHORTLINK;