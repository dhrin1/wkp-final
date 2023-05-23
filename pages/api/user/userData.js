import connectDb from '../../../utils/connectDb'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "PATCH": 
            await uploadInfo(req, res)
            break;
        case "GET": 
            await getUsers(req, res)
            break;
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin' ) return res.status(400).json({ error: "Authentication is not authorized" })
        
        const users = await Users.find().select('-password')
        res.json({users})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const uploadInfo = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { avatar } = req.body
        const newUser = await Users.findOneAndUpdate({_id: result.id}, {avatar})

        res.json({
            msg: "Changed photo success",
            user: {
                name: newUser.name,
                avatar: avatar,
                email: newUser.email,
                role: newUser.role
            }
        }) 
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}