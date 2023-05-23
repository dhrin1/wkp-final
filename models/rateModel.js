import mongoose from "mongoose";

const rateModel = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    rateValue: {
        type: Number,
        default: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Dataset = mongoose.models.rate || mongoose.model('rate', rateModel)
export default Dataset 