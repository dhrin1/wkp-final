import mongoose from "mongoose";

const connectDb = () => {
    if(mongoose.connections[0].readyState){
        console.log('Already connected')
        return;
    }
    mongoose.connect(process.env.MONGODB_URL, {
        // useCreateIndex: true,
        // useFindModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if(err) throw err;
        console.log('Connected to mongodb')
    })

}

export default connectDb