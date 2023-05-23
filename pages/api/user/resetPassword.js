import connectDb from '../../../utils/connectDb'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'
import bcrypt from 'bcrypt'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "PATCH": 
            await resetPassword(req, res)
            break;
    }
}

const resetPassword = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { password, name } = req.body
        const passwordHash = await bcrypt.hash(password, 12)
        const newUser = await Users.findOneAndUpdate({_id: result.id}, {password: passwordHash, name})
        res.json({ 
            msg: 'Profile changed succesfully',  
            user: { 
                name,
                avatar: newUser.avatar,
                email: newUser.email,
                role: newUser.role
            } 
        })
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
} 