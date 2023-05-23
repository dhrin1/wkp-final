import mongoose from 'mongoose'
const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    root: {
        type: Boolean,
        default: false
    },
    address: {
        type: Array
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dhrin1/image/upload/v1652186089/wkp_img_store/hu7wzyvb55lc59urmcoe_ww1s2w.png'
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset