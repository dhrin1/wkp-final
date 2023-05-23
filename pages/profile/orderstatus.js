import ProfileLayout from "../../components/layouts/ProfileLayout"
import { useContext, useState } from "react"
import { DataContext } from "../../store/GlobalState"
import { IoLocationOutline }  from 'react-icons/io5'
import { FcOk, FcInfo,FcShipped } from 'react-icons/fc'
import { MdDeliveryDining, MdOutlinePayments } from 'react-icons/md'
import { GiCardPickup } from 'react-icons/gi'
import Image from "next/image"
import Link from "next/link"


const OrderStatus = () => {
    const {state, dispatch} = useContext(DataContext)
    const { auth, orders } = state



    return (
        <div>
            <div className="w-full">
                <h2 className="text-black-tertiary font-bold tex-2xl uppercase">{auth?.user?.role !== 'admin' ? 'Your account' : 'Dashboard'}</h2>
                <p className="text-gray-tertiary text-sm font-semibold">Order Status</p>
            </div>
                      
            <div className="bg-white border border-gray shadow-sm rounded-sm p-5 mt-5">
                <div>
                    <h2 className="text-black-teriary font-semibold text-md" >Your Orders</h2>
                </div>
                <div>
                <div className="w-full ">
                    {!orders?.length ? (
                        <div className="w-full flex justify-center mx-auto">
                            <span className="font-semibold text-gray-tertiary text-normal ">You have no orders to track.</span>
                        </div>
                    ) : 
                        orders.map(item => (
                            <div key={item._id} className="w-full mx-w-md mt-2 border  rounded-md">
                                <div className="w-full space-y-1 p-2">
                                    <div className="flex justify-between">
                                        <Link href={`/order/details/${item._id}`}>
                                            <button type="button" className="uppercase text-sm font-bold underline">order id: {item._id}</button>
                                        </Link>
                                        <p className="text-sm " ><span className="capitalize font-bold text-sm ">Order date:</span> {new Date(item.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <div className="inline-block">
                                            <h2 className="font-bold text-sm">{item?.cart?.length} Item{item.cart.length > 1 && '(s)'}</h2>
                                                <div className="flex mb-1 -space-x-3 items-center">
                                                {
                                                    item.cart.map(cart=>(
                                                        <div key={cart._id} className="relative w-16 h-16  rounded-md select-none border-2 border-gray-primary shadow-md ">
                                                            <Image src={cart.images[0].url}  alt={cart.images[0].url} layout="fill" className="rounded-md " />
                                                        </div>
                                                    ))        
                                                }
                                            </div>
                                        </div>
                                       
                                        <div className="inline-block leading-4">
                                            <h2 className="font-bold text-sm inline-flex capitalize gap-1"> <IoLocationOutline size={19} />delivery address</h2>
                                            <p className="ml-5 text-gray-tertiary">{item.shipAddress}</p> 
                                        </div>
                                        <div className="inline-block">
                                            <h2 className="font-bold text-sm inline-flex capitalize gap-1"> <MdOutlinePayments size={19} />total payment</h2>
                                            <p className="ml-5 text-black-primary text-2xl font-bold">{'\u20B1'}{item.total}</p> 
                                        </div>
                                    </div>
                                   
                                </div>
                               
                                <div className="w-full p-2 bg-gray-primary flex justify-between ">
                                    <div className="inline-flex text-normal items-center gap-2 capitalize"> {item.orderType === "delivery" ? <MdDeliveryDining size={20} /> : <GiCardPickup size={20} /> }  {item.orderType} </div>
                                    <div className="inline-flex text-sm items-center gap-2">Delivery status  {auth.user.role === 'admin' && auth.user ? item.delivered ? <FcOk size={20} /> : <FcInfo size={20} /> : <FcShipped size={20} /> } </div> 
                                    
                                    <div className="inline-flex text-sm items-center gap-2">Payed {item.paid ? <FcOk size={20} /> : <FcInfo size={20} /> }</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                    
                </div>
            </div>
        </div>
    )

}
export default OrderStatus

OrderStatus.Wrapper = ProfileLayout