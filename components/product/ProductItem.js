import { useRouter } from "next/router";
import Link from "next/link";


import { useState, useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import ModalRemove from "../modals/ModalRemove";

// admin side
const ProductItem = ({product, handleSelect}) => {

    const { state, dispatch } = useContext(DataContext)
    const { auth } = state
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)


    return (
        <>
        <div  className={`col-span shadow-md rounded-md group ${product.checked ? 'border-2 border-orange-primary' : 'border border-gray '}`}>
            <div className="h-48  w-full" onClick={()=> auth.user.role === 'admin' && handleSelect(product._id)}>
                <img src={product.images[0].url} alt={product.images[0].url} className="object-center object-cover w-full h-full rounded-t-md group-hover:opacity-75 cursor-pointer"   />                       
            </div>
            <div className="w-full h-auto" >
                <div className="leading-4 p-2 border border-b-gray-secondary" >
                    <h2 className="capitalize text-black-primary">{product.title}</h2>
                    <span className="text-xs text-black-secondary uppercase">{product._id}</span>
                </div>
                <div className="p-2 flex justify-between items-center">
                    <p>{'\u20B1'}{product.price}</p>
                    <div className="inline-flex gap-2">
                        <button type="button" title="Remove"  onClick={()=> setIsOpen(true) & dispatch({ type: 'ADD_MODAL', payload: [{ data: '', id: product._id, title: product.title, type: 'DELETE_PRODUCT' }] }) }  >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <Link href={`/profile/menu/create/${product._id}`}>
                            <button type="button" title="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                        </Link>
                       
                    </div>
                </div>
            </div>
        </div>
        { isOpen && <ModalRemove setIsOpen={setIsOpen}  /> }
        </>
        
                     
    )
}   

export default ProductItem