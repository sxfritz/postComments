import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    Name: String,
    Comment: String,
    postDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});


export default mongoose.model('Comments', commentSchema)