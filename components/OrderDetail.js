import Link from 'next/link'
import Image from 'next/image'
import PaypalBtn from './payment/paypalBtn'

import { FcPaid } from 'react-icons/fc'
import { patchData } from '../utils/fetchData'
import { updateItem } from '../store/Actions'
import Payment from './payment/Payment'
import { useState } from 'react'


const OrderDetail = ({ orderDetails, state, dispatch }) => {
    const { auth, orders } = state

  
    const handleDelivered = (order) => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        patchData(`order/delivered/${order._id}`, null, auth.token)
        .then(res => {
            if(res.error) return  dispatch({ type: 'NOTIFY', payload: { error: res.error } })
            const { paid, dateOfPayment, delivered, method } = res.result
            dispatch(updateItem(orders, order._id, {
                ...order,
                paid, dateOfPayment, delivered, method
            }, 'ADD_ORDERS'))
            console.log(res)
            return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
        })
    }
    const getConvertTime = date => new Date(date).toLocaleString().split(',')[1]

    const [trigReceipt, setTrigReceipt] = useState(false)
 
    if(!auth.user) return null;

   
   

    return (
        <> 
        {
            orderDetails.map((order) => (
                <div key={order._id} className="w-full space-y-3" >
                    <div className="flex justify-between bg-white shadow-sm border border-gray h-auto p-2 rounded-sm w-full" >
                     <h2 className="uppercase font-semibold text-black-primary">OR id: {order._id}</h2>
                     <span className="font-semibold text-orange-primary text-md">{ order.delivered ? 'Completed' : 'To ship'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full" >
                        <div className="col-span-2 ">
                           
                            <div className="bg-white shadow-sm border border-gray h-auto p-2 rounded-sm w-full">
                                <div className="inline-block mb-5">
                                    <h2 className="capitalize font-block text-black-primary text-lg">Delivery Information</h2>
                                    <div className="mt-1 leading-5 text-medium text-gray-tertiary">
                                        <h2>{order?.user?.name}</h2>
                                        <p>{order.contact}</p>
                                        <p>{order.shipAddress}</p>
                                    </div>
                                   
                                </div>
                                <div className="mb-5">
                                    <h2 className="capitalize font-block text-black-primary text-lg">Your cart items</h2>
                                    {
                                    order.cart.map((item)=>(
                                        <Link href={`/menu/${item._id}`} key={item._id}  >
                                            <div key={item._id} className="bg-gray-primary w-full mt-1 hover:bg-gradient-to-br from-orange-600 to-orange-700 hover:text-white cursor-pointer rounded-md border border-gray">
                                                <div className="flex gap-2">
                                                    <div className="w-32 h-24 relative ">
                                                        <Image src={item.images[0].url} layout="fill" objectPosition="center" objectFit="cover" className="rounded-l-md" />
                                                    
                                                    </div>
                                                    <div className="inline-block space-y-1 mt-2 w-full px-2">
                                                        <h2 className="capitalize">{item.title}</h2>
                                                        <div className="w-full flex justify-between">
                                                            <span>x{item.quantity}</span>
                                                            <span className="font-base text-lg hover:text-white" >{'\u20B1'}{item.price}</span>
                                                            
                                                        </div>   
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                       
                                    )) 
                                    }
                                </div>
                                <div className="flex justify-between h-10 items-center ">
                                    <p className="text-normal font-semibold">
                                    { order.delivered ? `Delivered on - ${new Date(order.updatedAt).toLocaleString()}` : 'Order processing' }
                                    </p>

                                    <div className="inline-flex space-x-2 mr-2 items-center">  
                                        <p className="capitalize text-normal font-semibold"  >total payment: </p>
                                        <span className="font-semibold text-orange-primary text-xl"> {'\u20B1'}{order.total}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white shadow-sm border border-gray h-auto p-2 rounded-sm w-full mt-2">
                                <div className="flex justify-between w-full items-center">
                                    <h2>{order.cart.length} Item{order.cart.length > 1 && '(s)'}</h2>
                                    {
                                        !order.delivered && auth.user.role === "admin" && 
                                        <button type="button" onClick={()=> handleDelivered(order)} className="bg-gradient-to-t from-green-700 to-green-600 text-white text-normal h-9 px-2 rounded-md shadow-sm border capitalize" >Mark as delivered</button>
                                    }
                                </div>
                            </div>

                            <nav className="w-full mt-5">
                            <ol className="flex justify-center relative">
                                {order?.createdAt && 
                                    <li className={`relative w-[150px] text-center text-sm font-light italic
                                        after:content-[''] after:absolute after:left-[50%] after:top-[200%] after:w-5 after:h-5 
                                        ${order?.createdAt ? 'after:bg-orange-primary ' : 'after:bg-gray-300 '   }
                                        after:rounded-full after:z-10 
                                        `}>
                                        Ordered
                                    </li>
                                }                                
                                <li className={`relative w-[150px] text-center text-sm font-light italic
                                    before:content-[''] before:absolute before:left-[-50%] before:top-[calc(200%+0.5rem)] before:w-full before:h-1 
                                    ${order?.dateOfPayment ? 'before:bg-orange-primary' : 'before:bg-gray-300' } 
                                    after:content-[''] after:absolute after:left-[50%] after:top-[200%] after:w-5 after:h-5 
                                    ${order.dateOfPayment ? 'after:bg-orange-primary' : 'after:bg-gray-300'} after:rounded-full after:z-10
                                    `}>
                                    Confirmed order
                                </li>

                                <li className={`relative w-[150px] text-center text-sm font-light italic
                                    before:content-[''] before:absolute before:left-[-50%] before:top-[calc(200%+0.5rem)] before:w-full before:h-1 
                                    ${order.paid ? 'before:bg-orange-primary' : 'before:bg-gray-300' } 
                                    after:content-[''] after:absolute after:left-[50%] after:top-[200%] after:w-5 after:h-5 
                                    ${order.paid ? 'after:bg-orange-primary' : 'after:bg-gray-300'}  after:rounded-full after:z-10
                                    `}>
                                    Payed
                                </li>
                                <li className={`relative w-[150px] text-center text-sm font-light italic
                                    before:content-[''] before:absolute before:left-[-50%] before:top-[calc(200%+0.5rem)] before:w-full before:h-1 
                                    ${order.delivered ? 'before:bg-orange-primary' : 'before:bg-gray-300' }
                                    after:content-[''] after:absolute after:left-[50%] after:top-[200%] after:w-5 after:h-5 
                                    ${order.delivered ? 'after:bg-orange-primary' : 'after:bg-gray-300'}  after:rounded-full after:z-10
                                    `}>
                                  Delivered
                                </li>
                            </ol>
                        </nav>
                        </div>
                                 
                        <div className="col-span-1">
                            {order.paid && 
                                <div className="w-full space-y-2 bg-white p-2 rounded-sm  shadow-md border mb-2">
                                    <h2 className="capitalize text-lg">Payment</h2>
                                    <div className="inline-block  leading-4">
                                        { order.paymentId &&  <p className="text-normal" >Payment ID: <span className="text-gray-tertiary text-normal uppercase">{ order.paymentId }</span></p> }
                                        { order.method &&  <p  className="text-normal">Payment Method: <em className="text-gray-tertiary text-sm font-semibold">{order.method}</em></p> }
                                    </div>
                                 
                                    <div className=" bg-gradient-to-br from-green-300 to-green-500 text-green-700 text-base font-medium p-2 rounded-sm  w-full inline-flex items-center gap-2 shadow-sm border-gray-50">
                                        <FcPaid size={25} /> 
                                        Paid on { new Date(order.dateOfPayment ).toLocaleString() }
                                    </div>
                                   
                                   
                                </div>
                            }
                             <Payment order={order} setTrigReceipt={setTrigReceipt} />
                            {!order.paid && auth.user.role !== "admin" && 
                                <>
                                    { !order.paid && !trigReceipt ? <PaypalBtn  order={order} /> : null }
                                </> 
                            } 
                        </div>
                       
                    </div>
                </div>
             ))

        }   
        </>
    )
}

export default OrderDetail