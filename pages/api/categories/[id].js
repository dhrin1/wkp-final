import connectDb from '../../../utils/connectDb'
import Categories from '../../../models/categoriesModel'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "PATCH": 
            await updateCategory(req, res)
            break;
        case "DELETE": 
            await deleteCategory(req, res)
            break;
    }
}


const updateCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({ error: "Athentication is not authorized." })

        const { id } = req.query
        const { name } = req.body

        const newCategory = await Categories.findOneAndUpdate({_id: id}, {name})
        res.json({ 
            msg: 'Category edited.',
            category: {
                ...newCategory,
                name
            }
         })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({ error: "Athentication is not authorized." })

        const { id } = req.query
        const products = await Products.findOne({category: id})
        if(products) return res.status(400).json({ error: "Unable to process this action, relation data cannot manipulate." })
        
        await Categories.findByIdAndDelete(id)
        res.json({ msg: 'Category removed.' })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}