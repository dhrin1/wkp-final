import connectDb from '../../../utils/connectDb'
import Orders from '../../../models/orderModel'
import Products from '../../../models/productModel'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createOrder(req, res)
            break;
        case "GET":
            await getOrders(req, res)
            break;
        case "PUT": updateAddress(req, res)
            break;

    }
}

const getOrders = async (req, res) => {
    try {
        const result = await auth(req, res)
        let orders;
        if(result.role !== 'admin'){
            orders = await Orders.find({ user: result.id }).populate("user", "-password").sort({ createdAt: -1 })
        }else{
            orders = await Orders.find().populate("user", "-password").sort({ createdAt: -1 })
        }
        res.json({orders})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createOrder =  async (req, res) => {
    try {
        const result = await auth(req, res)
        const { shipAddress, orderType, contact, cart, total } = req.body

        const newOrder = new Orders({
            user: result.id, shipAddress, orderType, contact, cart, total
        })

        await newOrder.save()
        res.json({
            msg: 'Order success! We will contact you to confirm the order.',
            newOrder,
        })
        
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const sold = async (id, quantity, oldInStock, oldSold) => {
    await Products.findOneAndUpdate({_id: id}, {
        inStock: oldInStock - quantity,
        sold: quantity + oldSold
    })
}

const updateAddress = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { shipAddress } = req.body
        await Users.findOneAndUpdate({_id: result.id}, {
          address: shipAddress
        })
        res.json({
            result: {
                msg: 'yes'
            }
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
  
}