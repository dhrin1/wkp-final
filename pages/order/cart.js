import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'
import CartItem from '../../components/cart/CartItem'
import { DataContext } from '../../store/GlobalState'
import Link from 'next/link'
import { getData, patchData, postData, putData } from '../../utils/fetchData'



const Cart = () => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth, orders } = state

    const [total, setTotal] = useState(0)
    const [shipAddress, setShipAddress] = useState('')
    const [contact, setContact] = useState('')
   
    const [callback, setCallback] = useState(false)


    const [orderType, setOrderType] = useState()
    const [payment, setPayment] = useState(false)

    const router = useRouter()

    useEffect(()=>{
        const getTotal = () => {
            const res = cart.reduce((prev, item)=>{
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(res)
        }
        getTotal()
    },[cart])

    useEffect(()=>{
        const cartLocalStrg = JSON.parse(localStorage.getItem("__next__cart__wkp"));
        if(cartLocalStrg && cartLocalStrg.length) {
            let newArr = []
            const updateCart = async () => {
                for (const item of cartLocalStrg){
                    const res = await getData(`product/${item._id}`)
                    const { _id, title, images, price, duration, inStock, sold } = res.item
                    if(inStock > 0){
                        newArr.push({
                            _id, title, images, price, duration, inStock, sold,
                            quantity: item.quantity > inStock ? 1 : item.quantity
                        })
                    }
                }
                dispatch({ type: 'ADD_CART', payload: newArr })
            }
            updateCart()
        }
    },[callback])
  
    const handleCheckPayment = async () => {   

        if(!shipAddress || !contact  || !orderType)
        return dispatch({ type: 'NOTIFY', payload: { error: 'Please complete all given details.' } })
      
        let newCart = [];
        for(const item of cart){
            const res = await getData(`product/${item._id}`)
            if(res.item.inStock - item.quantity >= 0){
                newCart.push(item)
            }
         
        }

        if(newCart.length < cart.length){
            setCallback(!callback)
            return dispatch({ type: 'NOTIFY', payload: {error: 'The item is not available right now' } })
        }
   
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        postData('order', { shipAddress, contact, orderType, cart, total }, auth.token)
        .then(res => {
  
            if(res.error) dispatch({ type: 'NOTIFY', payload: { error: res.error } })
            dispatch({ type: 'ADD_CART', payload: [] })

            const newOrder = {
                ...res.newOrder,
                user: auth.user
            }
            dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
            dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            return router.push(`/order/details/${res.newOrder?._id}`)
        }) 


       
    }


    return (
        <div>
            <Head>
                <title>Walang Ka-Pares | Cart</title>
            </Head>
                <div className=" mx-auto mt-24 max-w-6xl px-2 sm:px-3">
                    <button onClick={e=>router.back()} className="text-orange-primary font-semibold text-sm inline-flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Go Back
                    </button>
                    { cart?.length ? <>
                    <div className="w-full flex justify-between items-center h-10">
                        <h2 className="text-2xl font-semibold text-black-tertiary">Order Cart</h2>
                        <Link href="/menu">
                            <button className="text-orange-primary font-semibold text-sm inline-flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Continue Ordering
                            </button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                        <div className="w-full col-span-2">
                        {
                            cart.map(item => (
                                <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                            ))
                        }
                        </div>
                   
                        <div className="bg-white w-full col-span-1 rounded-md px-3 py-5 border border-gray shadow-md">
                            <h2 className="font-bold text-2xl py-1">Shipping Infomartion</h2>
                            <hr />
                            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 mt-5">
                                <div className=" ">
                                    <label htmlFor="shipaddress" className="text-black-tertiary text-md font-semibold" >Enter Street or Barangay or City</label>
                                    <textarea type="text" id="shipaddress" onChange={e=>setShipAddress(e.target.value)} value={shipAddress} rows={2} className="resize-none border border-gray outline-none py-1 w-full rounded-md px-2 text-sm">
                                    </textarea>
                                </div>
                                <div className="">
                                    <label htmlFor="contact" className="text-black-tertiary text-md font-semibold" >Contact number</label>
                                    <input type="text" id="contact" onChange={e=>setContact(e.target.value)} value={contact} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm" />
                                </div>
                            </div>
                                
                                <div className="mt-5">
                                    <h2 className="text-black-tertiary text-md font-semibold" >Order Type</h2>
                                    <div className="inline-flex space-x-3">
                                        <p className="flex gap-2 items-center text-sm border-2 border-orange-primary rounded-md p-2">
                                            <input type="radio" id="delivery" name="orderType" onChange={e=>setOrderType(e.target.value)} value={'delivery'}/>
                                            <label htmlFor="delivery">Delivery</label>
                                        </p>
                                        <p className="flex gap-2 items-center text-sm border-2 border-orange-primary rounded-md p-2 ">
                                            <input type="radio" id="pickedup" name="orderType" onChange={e=>setOrderType(e.target.value)} value={'pickedup'} className="text-orange-primary" />
                                            <label htmlFor="pickedup">Picked up</label>
                                        </p>
                                    </div>
                                </div>
                                <div className=" mt-5">
                                    <label htmlFor="total" className="text-black-tertiary text-sm font-semibold" >Total</label>
                                    <h2 className="text-2xl font-semibold" id="total">{'\u20B1'}{total}</h2>
                                </div>
                                <div className="mt-5 w-full">
                                    <Link href={ auth.user ? '#!' : '/login'  } >
                                        <button type="button" onClick={handleCheckPayment} className="w-full h-9 text-white font-semibold text-base px-2 bg-orange-primary hover:bg-orange-secondary transform duration-200 rounded-md border border-orange outline-none shadow-sm">Checkout</button>
                                    </Link>
                                </div>
                        </div>
                    </div>
                    </>
                    :
                        <div className="h-1/2 w-full flex justify-center items-center">
                            <div className="inline-block mx-auto space-y-3">
                                <div className=" w-full flex justify-center max-w-sm text-center">
                                    <div className="h-40 w-40 relative ">
                                        <Image src="/assets/img/logo-walang-kapares.png" layout="fill" objectFit="cover" objectPosition="center" />
                                    </div>
                                </div> 
                                <div className="text-center space-y-3">
                                    <h2  className="font-semibold text-gray-tertiary text-xl">You don't have any order yet</h2>
                                    <Link href="/menu">
                                        <button className="px-2 py-1 rounded-md border text-semibold text-lg outline-none  shadow-sm bg-gradient-to-t from-orange-secondary to-orange-primary hover:bg-orange-secondary transform duration-200 text-white font-normal ">Order Now</button>
                                    </Link>
                                </div>
                            </div> 
                        </div>
                    }
                </div>
            </div>
    )
}
export default Cart