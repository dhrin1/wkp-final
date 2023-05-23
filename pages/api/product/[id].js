import connectDb from '../../../utils/connectDb'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;  
        case "DELETE":
            await deleteProduct(req, res)
            break;     
    }
}

const getProduct = async (req, res) =>{
    try {
        const { id } = req.query
        const product  = await Products.findById(id)
        if(!product)  return res.status(400).json({ err: 'The item you requested is not available.' })
        res.json({ item: product })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}

const updateProduct = async (req, res) =>{
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({ error: 'Authentication is not authorized.' })
        const { id } = req.query
        const { title, price, inStock, description, content, duration, category, images } = req.body
       
        // const product  = await Products.findOne({ product_id })
        // if(product) return res.status(400).json({ error: 'This menu is already exists.' })
        // if(!product_id || !title || !price || !inStock || !description || !content || category === 'all' || !images.length === 0)
        // return res.status(400).json({ error: 'Please complete all details given.' })

        await Products.findOneAndUpdate({ _id: id }, {
            title: title.toLowerCase(), price, inStock, description, content, duration, category, images
        })

        res.json({ msg: 'Item edited complete!' })

    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}

const deleteProduct  = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({ error: 'Authentication is not authorized.' })
        
        const { id } = req.query

        await Products.findByIdAndDelete(id)
        res.json({ msg: 'Item removed successfully.' })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}