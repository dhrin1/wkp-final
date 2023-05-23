import connectDb from '../../../utils/connectDb'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "PATCH": 
            await updateRole(req, res)
            break;
        case "DELETE": 
            await deleteUser(req, res)
            break;
    }
}

const updateRole = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin' || !result.root ) return res.status(400).json({ error: "Authentication is not authorized" })
        
        const { id } = req.query
        const { role } = req.body
        await Users.findOneAndUpdate({_id: id}, {role})
        res.json({msg: 'Changes successfully.'})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin' || !result.root ) return res.status(400).json({ error: "Authentication is not authorized" })
        
        const { id } = req.query
        await Users.findByIdAndDelete(id)
        res.json({ msg: 'Removed Successfully' })
        
        res.json({msg: 'Changes successfully.'})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
