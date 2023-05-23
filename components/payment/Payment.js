import { useContext, useEffect, useRef, useState } from "react"
import { DataContext } from "../../store/GlobalState"
import { patchData } from "../../utils/fetchData"
import { updateItem } from "../../store/Actions"
import Image from "next/image"
import { ImageUploadProfile } from "../../utils/imageUpload"
import { FcOk } from 'react-icons/fc'

const Payment = ({order, setTrigReceipt}) => {

    const { state, dispatch } = useContext(DataContext) 
    const { auth, orders } = state
    const [images, setImages] = useState([])
    const [refNo, setRefNo] = useState('')

   useEffect(()=>{ 
    if(images.length > 0 ) { setTrigReceipt(true) } 
    },[images])
    
   
    const handleImageInput = e => {
        dispatch({  type: 'NOTIFY', payload: {} })
        let newImages = []
        let num = 0;
        let err = ''
        const files = [...e.target.files]
       
        if(files.length === 0) return dispatch({ type: 'NOTIFY', payload: { error: 'Files you selected is not available.' } })
        files.forEach(file=>{
            if(file.size > 1024 * 1024) return err = 'Unable to parse this file, required is less than 1mb size.'
            if(file.type !== 'image/jpeg' && file.type !== 'image/png') return err = 'File format is not supported.'

            num += 1;
            if(num <= 2) newImages.push(file)
            return newImages;

        })

        if(err) dispatch({ type: 'NOTIFY', payload: { error: err } })

        const imgCount = images.length
        if(imgCount + newImages.length > 5) return dispatch({ type: 'NOTIFY', payload: { error: 'Allowed of maximum 5 files for this action.' } })
        setImages([...images, ...newImages])

      
    }

    const removeImageIndex = (idx) => {
        const newArrImg = [...images]
        newArrImg.splice(idx, 1)
        setImages(newArrImg)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await ImageUploadProfile(imgNewURL)

        dispatch({ type: 'NOTIFY', payload: { loading: true } })
                patchData(`order/payment/${order._id}`, {
                  paymentId: refNo,
                  images: [...imgOldURL, ...media],
                  method: 'Receipt'
                }, auth.token)
                .then(res => {
                    if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    const { paymentId, method, paymentReciept } = res.result
                    dispatch(updateItem(orders, order._id, {
                        ...order, 
                        paymentReciept,
                        paymentId,
                        method,
                       
                    }, 'ADD_ORDERS'))
                    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                })
    }
    
    const handlePayed = () => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        patchData(`order/payment/${order._id}`, {
            paid: true, 
            dateOfPayment: new Date().toISOString(), 
            paymentId: order.paymentId,
        }, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            dispatch(updateItem(orders, order._id, {
              ...order, 
              paid: true,
              dateOfPayment: new Date().toISOString(), 
              paymentId: order.paymentId,
              method: 'Receipt'
            }, 'ADD_ORDERS'))
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        })
    }
    const fileInput = useRef(null)


    return (
        <div className="w-full mb-5">
            <div className="mb-2">
                <div className="flex-wrap  items-center">
                    <div className="inline-flex gap-2">
                        {  !order.paymentReciept.length > 0 && images.length > 0 &&  images.map((img, idx)=>(
                                <div key={idx} className="relative h-32 w-32  border rounded-md shadow-sm ">
                                    <Image src={img.url ? img.url : URL.createObjectURL(img)} layout="fill" alt={img.url} objectFit="cover" objectPosition="center" className="rounded-md border " />
                                        <button type="button" onClick={()=> removeImageIndex(idx)} className="absolute h-5 w-5 px-1 rounded-full right-0 -mt-2 -mr-2 bg-blue-primary text-white text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className=" " viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                 <div className="items-center"> 
                     </div>
                     {
                         !order.paymentReciept.length > 0 && images.length > 0 && 
                         <>
                             <div className="inline-block space-y-2 w-full">
                                 <div>
                                     <label htmlFor="contact" className="text-black-tertiary text-md font-semibold " >Reference ID. </label>
                                     <input type="text" id="refId" onChange={e => setRefNo(e.target.value) } value={refNo} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm uppercase" />
                                 </div>
                                 <div className="flex justify-between"><button type="button" onClick={handleSubmit} className="px-2 h-9 bg-gradient-to-t from-green-700 to-green-600 rounded-md text-white" >Submit</button><button type="button" className=" first-letter:uppercase bg-white border rounded-md px-2 hover:bg-gray-100" onClick={e=>setImages([]) & setTrigReceipt(false)} >cancel</button></div>
                                 <p className="text-sm text-gray-tertiary leading-4 mt-1">Please check your reference id before you submit, to enable this process.</p>
                             </div>
                         </> 
                     }
                     { !order.paid && !order?.paymentReciept.length > 0 && auth.user.role !== "admin" && 
                         <div>
                            <div className="inline-block w-full">
                                <div>
                                    <div className="flex justify-center w-full ">
                                        <div className="w-20 h-20 relative ">
                                            <Image src={'https://res.cloudinary.com/dhrin1/image/upload/v1655819248/wkp_img_store/gcash_logo_gmjhoh.png'} layout="fill" objectFit="cover" objectPosition="center"  />
                                        </div>
                                        <div className="w-24 h-20 relative ">
                                            <Image src={'https://res.cloudinary.com/dhrin1/image/upload/v1655874181/wkp_img_store/Paymaya-Logo-Original-removebg-preview_b8pa8y.png'} layout="fill" objectFit="cover" objectPosition="center"  />
                                        </div>
                                    </div>
                                    <div className="leading-4">
                                    <small>Send to:</small>
                                    <h2>Account number: 09199858141</h2>
                                    </div>
                                
                                </div>
                                <div>
                                    <input type="file" id="imageFile" ref={fileInput}  onChange={handleImageInput} multiple accept="image/*" className="opacity-0 absolute z-10 object-fill overflow-ellipsis flex-nowrap inline-block overflow-hidden h-7 w-7 text-center" /> 
                                </div>
                                <button type="button" onClick={e => fileInput.current.click()}  className="h-[45px] w-full py-2 bg-gradient-to-t from-green-700 to-green-600 rounded-md text-white mt-1">Attached</button> 
                                <p className="text-xs text-gray-tertiary leading-4 mt-1 break-all ">Please attached your payment receipt, for alternative payment</p>
                            </div> 
                            <div className="flex w-full">
                                <button type="button"    className="h-[45px] w-full py-2 bg-gradient-to-t from-orange-secondary to-orange-primary rounded-md text-white">Proceed to Payed on Delivery</button> 
                            </div>
                         </div>

                          
                     }
                 </div>
                 { order?.paymentReciept.length > 0  &&  
                    <div className="border border-gray rounded-sm shadow-md p-2">
                        <div className="flex justify-between w-full items-center">
                            <div className="inline-block"> 
                                <h2 className="capitalize text-lg">Payed via proof of receipt</h2>
                                {!order.paid &&
                                    order.paymentReciept.map(img=>(
                                        <div key={img.public_id} className="relative h-32 w-32  border rounded-md shadow-sm ">
                                            <Image src={img.url ? img.url : URL.createObjectURL(img)} layout="fill" alt={img.url} objectFit="cover" objectPosition="center" className="rounded-md border " />
                                        </div>
                                    ))
                                }
                            </div>
                            { !order.paid && auth.user.role === "admin" && <button onClick={handlePayed} className="h-9 px-2 bg-gradient-to-t from-green-700 to-green-600 rounded-md text-white shadow-sm capitalize" >Confirm order</button> }
                        </div>
                        <div className="leading-5 my-2">
                            {auth.user.role !== "admin" && !order.paid &&   <p className="text-normal inline-flex items-center gap-2">Reference ID : <span className="text-gray-tertiary text-sm uppercase">{order.paymentId}</span></p> }
                            <p className="text-normal inline-flex items-center gap-2">Status : <span className="text-gray-tertiary text-sm">{!order.paid ? 'Waiting for payment confirmation' : <FcOk size={17} className="rounded-full shadow-sm" />  }</span></p>
                        </div>
                    </div>   
                }
       
            
        </div>
            
     
    )
}

export default Payment