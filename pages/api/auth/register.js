import connectDb from '../../../utils/connectDb'
import Users from '../../../models/userModel'
import { registerValidate } from '../../../utils/dataValidation'
import bcrypt from 'bcrypt'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "POST": await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body
        const errMsg = registerValidate(name, email, password, cpassword)
        if(errMsg) return res.status(400).json({err: errMsg})

        const validEmail = await Users.findOne({email})
        if(validEmail) return res.status(400).json({err: 'This email is already taken, try diff one.'})

        const passwordHash = await bcrypt.hash(password, 12)
        const newUser = new Users({name, email, password: passwordHash, cpassword  })

        await newUser.save()
        res.json({msg: 'Register Success!'})


    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}