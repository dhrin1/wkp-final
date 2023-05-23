import { useEffect } from 'react'

const  Toast = ({msg, handleShow}) => {
    useEffect(()=>{
        setTimeout(()=>handleShow(false),5000)
    },[])
  
    return (
        <div className="w-full bottom-0 fixed flex justify-center py-2 md:py-5 z-10">
            <div className={` mx-4 px-4 rounded-md border-l-4 ${msg.type !== 'error' ? 'bg-green-50 border-green-500 ' : 'bg-red-50 border-red-500' } w-[55vh] md:max-w-sm md:mx-auto  shadow-xl border-gray-100 `}>
                <div className="flex justify-between py-2">
                    <div className="flex">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-green-500" viewBox="0 0 20 20" fill={msg.color}>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className={`self-center ml-3 text-${msg.color}-500`}>
                            <p className="font-semibold first-letter:uppercase">
                                {msg.type}
                            </p>
                            <p className="mt-1 text-sm flex-wrap">
                                {msg.msg}
                            </p>
                        </div>
                    </div>
                    <button onClick={handleShow} className="self-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={msg.color}>
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default Toast
