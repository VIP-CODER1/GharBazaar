import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected Successfully ✅✅")
    } catch (error) {
        console.log("db error")
    }
}
export default connectDb