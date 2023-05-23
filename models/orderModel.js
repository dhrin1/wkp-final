import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    shipAddress: String,
    contact: String,
    orderType: String,
    cart: Array,
    total: Number,
    paymentId: String,
    method: String,
    paymentReciept: {
        type: Array
    },
    delivered: {
        type: Boolean,  
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
    dateOfPayment: Date

},{
    timestamps: true   
})

let Dataset = mongoose.models.order || mongoose.model('order', orderSchema)
export default Dataset