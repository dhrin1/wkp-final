import { useContext, useState, useEffect } from "react"
import ProfileLayout from "../../components/layouts/ProfileLayout"
import { DataContext } from "../../store/GlobalState"
import { FcOk } from "react-icons/fc"
import Link from "next/link"
import Image from "next/image"

const OrderHistory = () => {

    const { state, dispatch } = useContext(DataContext)
    const { orders, auth } = state

    const [ orderHistory, setOrderHistory ] = useState([])

    useEffect(()=>{
        const newArr = []
        orders.filter(item=>item.paid && item.delivered ? newArr.push(item) : null )
        setOrderHistory(newArr)
    },[orders])


    return (
        <div>
            <div className="w-full">
                <h2 className="text-black-tertiary font-bold tex-2xl uppercase">Your account</h2>
                <p className="text-gray-tertiary text-sm font-semibold">Order History</p>
            </div>
                      
            <div className="bg-white border border-gray shadow-sm rounded-sm p-5 mt-5">
                <div>
                    <h2 className="text-black-teriary font-semibold text-md" >Your Past Orders</h2>
                </div>


                <div className="w-full">
                    {
                        !orderHistory?.length  ? 
                        <div className="w-full flex justify-center mx-auto">
                            <span className="font-semibold text-gray-tertiary text-normal ">You have no transaction completed list.</span>
                        </div>
                        : 
                        orderHistory.map((item, idx)=>(
                            <div key={item._id} className="w-full mx-w-md mt-2 border  rounded-md ">
                                 <div className="w-full space-y-1 p-2 relative">
                                    <span className="top-0 right-0 absolute m-3"><FcOk size={20} className="rounded-full shadow-sm" /></span>
                                    <div className="flex justify-between">
                                        <p className="text-md font-bold" >Ordered compeleted - {new Date(item.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="inline-block">
                                            <h2 className="font-semibold text-md">{item.cart.length} Item{item.cart.length > 1 && '(s)'}</h2>
                                                <div className="flex mb-1 -space-x-3 items-center">
                                                {
                                                    item.cart.map(cart=>(
                                                        <div >
                                                            <div key={cart._id} className="relative w-16 h-16  rounded-md select-none border-2 border-gray-primary shadow-md ">
                                                                <Image src={cart.images[0].url}  alt={cart.images[0].url} layout="fill" className="rounded-md " />
                                                            </div>
                                                            {/* <div className="text-xs break-words"><span className="capitalize">{cart.title}</span> <span>{cart.quantity}x</span></div> */}
                                                        </div>
                                                    ))        
                                                }
                                            </div>
                                        </div>
                                        <div className="inline-block">
                                            <div className="leading-4">
                                                <h2 className="font-semibold text-md">Delivered at</h2>
                                                <p className="text-gray-tertiary capitalize font-thin">{item.shipAddress}</p>
                                            </div>
                                            <div className="leading-4 mt-2">
                                                <h2 className="font-semibold text-md">Payment</h2>
                                                <p className="text-gray-tertiary capitalize font-thin">{item.orderType} - Payed {'\u20B1'}{item.total}</p>
                                            </div>
                                        </div>

                                        <div className="h-full ">
                                            <div className="h-full w-full inline-block space-y-3 my-3">
                                                <div >  
                                                    <Link href={`/order/rates/`}>
                                                        <button className="px-2 h-8 w-full  bg-gradient-to-t from-orange-secondary to-orange-primary rounded-md text-white">Rate</button>
                                                    </Link>
                                                 </div>
                                                
                                                <div>
                                                    <Link href={`/order/details/${item._id}`}>
                                                        <button className="hover:underline">View details</button>
                                                    </Link>
                                                </div>
                                               
                                               
                                            </div>
                                           
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        ))
                    }
                </div>
            </div>
        </div>
    )

}
export default OrderHistory

OrderHistory.Wrapper = ProfileLayout