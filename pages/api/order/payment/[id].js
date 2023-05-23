import connectDb from '../../../../utils/connectDb'
import Orders from '../../../../models/orderModel'
import auth from '../../../../middleware/auth'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await paymentOrder(req, res)
            break;
    }
}

const paymentOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { id } = req.query
        const { paymentId, images, method } = req.body
    
        if(result.role === 'user'){       
            if(images) {
                await Orders.findOneAndUpdate({ _id: id }, {
                    paymentId,
                    method: method, 
                    paymentReciept: images
                })
                res.json({ 
                    msg: 'Payment success, please wait for confirmation receipt',
                    result: {
                        paymentId,
                        method: method, 
                        paymentReciept: images
                    }
                })
            }else{    
                await Orders.findOneAndUpdate({ _id: id }, {
                    paid: true, 
                    dateOfPayment: new Date().toISOString(), 
                    paymentId,
                    method: method
                })
                res.json({ msg: 'Payment success'})
            }
           
        }else{
            await Orders.findOneAndUpdate({ _id: id }, {
                paid: true, 
                dateOfPayment: new Date().toISOString(), 
                paymentId,
                method: method
            })
            res.json({ msg: 'Order confirmed success' })


        }

        
       
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

