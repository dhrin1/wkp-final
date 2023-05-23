import connectDb from '../../../../utils/connectDb'
import Orders from '../../../../models/orderModel'
import auth from '../../../../middleware/auth'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await deliveredOrder(req, res)
            break;
    }
}

const deliveredOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
        const {id} = req.query
      

        if(result.role !== 'admin') return res.status(400).json({ error: 'Authentication is not authorized this action.' })

        const order = await Orders.findOne({_id: id})

     
        if(order.paid){
        
                await Orders.findOneAndUpdate({_id: id}, { delivered: true })
                res.json({ 
                    msg: 'Mark as delivered success!',
                    result: {
                        paid: true, 
                        dateOfPayment: order.dateOfPayment,
                        method: order.method,
                        delivered: true
                    }
                })
          
           
        }else{
          
                await Orders.findOneAndUpdate({_id: id},{
                    paid: true, 
                    dateOfPayment: new Date().toISOString(),
                    method: 'Recieve Cash', 
                    delivered: true
                })
                res.json({ 
                    msg: 'Update success!',
                    result: {
                        paid: true, 
                        dateOfPayment: new Date().toISOString(),
                        method: 'Recieve Cash', 
                        delivered: true
                    }
                 })
     
                
          
        }
       
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

