import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../../store/GlobalState'
import { useRouter } from 'next/router'
import OrderDetail from '../../../components/OrderDetail'


const Details = () => {
    const { state, dispatch } = useContext(DataContext)
    const { orders, auth } = state

    const router = useRouter()
    const [orderDetails, setOrderDetails] = useState([])

    useEffect(()=>{
        const newArr = orders.filter(o => o._id === router.query.id)
        setOrderDetails(newArr)

        if(!newArr) return router.back()
    },[orders])

    if(!auth.user) return null;

    return (
        <div className="bg-white mx-auto mt-24 max-w-6xl px-2 sm:px-3">
            <div className="w-full flex justify-between items-center h-10">
                <h2 className="text-2xl font-semibold text-black-tertiary">Order details</h2>
                <button onClick={e=>router.back()} className="text-orange-primary font-semibold text-sm inline-flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Go Back
                </button>
            </div>
            <div className="w-full">
                <OrderDetail orderDetails={orderDetails} state={state} dispatch={dispatch} />
            </div>
        </div>
    )
}

export default Details