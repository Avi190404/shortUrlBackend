import mongoose from "mongoose";

const tsetSchema = new mongoose.Schema({
    massage: {
        type: String,
        required: true,
    }
})

const TEST = mongoose.model("Test", tsetSchema);
export default TEST;