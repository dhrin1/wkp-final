import { incQty, decQty } from "../../store/Actions"
import { useState } from "react"
import ModalRemove from "../modals/ModalRemove"
import Link from 'next/link'
import Image from "next/image"
import { CgTimer } from 'react-icons/cg'


const CartItem  = ({item, dispatch, cart}) => {
    const [ isOpen, setIsOpen] = useState(false)

    
   
    return (
            <>
                <div className="w-full h-auto flex justify-between sm:flex mt-2 border-t border-gray-secondary py-2">
                    <div className="inline-flex">
                        <div className="h-24 w-24 relative ">
                            <Image src={item.images[0].url} alt={item.images[0].url} layout="fill" className="h-full w-full rounded-md object-center object-cover" />
                        </div>
                        <div className="inline-block ml-2 space-y-3">
                            <Link href={`/menu/${item._id}`}>
                                <h2 className="capitalize hover:underline cursor-pointer text-medium font-bold">{item.title}</h2>
                            </Link> 
                            <div className="bottom-0 h-13 flex items-center w-full ">
                                <div className="inline-flex">
                                    <button onClick={()=> setIsOpen(true) & dispatch({ type: 'ADD_MODAL', payload: [{ data: cart, id: item._id, title: item.title, type: 'ADD_CART' }] }) } className="text-orange-primary hover:text-orange-secondary font-semibold text-normal pr-3  ">Delete</button>
                                </div>
                            </div>
                            <p className="inline-flex items-center text-sm space-x-1 text-gray-400">
                                <CgTimer size={15} color={'gray'} />
                                <span>{item.duration}min</span>
                            </p>  
                        </div>
                        
                    </div>
                    <div className="inline-block text-center space-y-5">
                        <h2 className="text-black-tertiary font-semibold text-lg">{'\u20B1'}{item.price}</h2>
                        <div className="inline-flex space-x-5">
                            <button onClick={()=> dispatch(decQty(cart, item._id)) } disabled={item.quantity === 1 ? true : false} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-primary" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <input  type="text" value={item.quantity}  className="w-10 text-center" />
                            <button onClick={()=> dispatch(incQty(cart, item._id)) } disabled={item.quantity === item.inStock ? true : false} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-primary" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div> 
                { isOpen && <ModalRemove setIsOpen={setIsOpen} /> }                
            </>
            
    )
}

export default CartItem