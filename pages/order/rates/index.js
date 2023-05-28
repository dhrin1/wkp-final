import { useContext } from "react"
import ProfileLayout from "../../../components/layouts/ProfileLayout"

import { DataContext } from "../../../store/GlobalState"
import Image from "next/image"

const Rates = () => {
    const { state } = useContext(DataContext)
    const { orders } = state
    return (
        <div>
           <div className="w-full">
                <h2 className="text-black-tertiary font-bold tex-2xl uppercase">My rates</h2>
                <p className="text-gray-tertiary text-sm font-semibold">Order History</p>
            </div>

           <div className="space-y-2">
             {orders.map((order, idx)=>(
                <div className="border p-1 " key={idx}>
                    {order.cart.map((item, idx)=>(
                        <div className="border-b p-2" key={idx}>
                            <div key={item._id} className="relative w-24 h-24  rounded-md select-none border-2 border-gray-primary shadow-md ">
                                <Image src={item.images[0].url}  alt={item.images[0].url} layout="fill" className="rounded-md " />
                            </div>
                        </div>
                    ))}
                </div>
             ))}
           </div>

        </div>
    )
}

export default Rates

Rates.Wrapper = ProfileLayout

