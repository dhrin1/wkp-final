import ModalPayment from "../modals/ModalPayment"
import { useState } from "react"
const AlterBtn = ({order}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="mb-5">
           {/* <a href={`javascript:window.open('${process.env.BASE_URL}/payment/','_blank','height=600,width=400');`}>
                <label>Attached reciept</label>
            </a> */}
            <div className="text-center justify-center mx-auto">
                <button type="button" onClick={e=>setIsOpen(true)} className="py-3 bg-blue-primary w-full text-white rounded-md">Reciept attachment required</button>
                <div className="inline-flex gap-3 items-center">
                    <p className="mt-1 text-xs italic text-gray-tertiary">Aternative payment</p>
                    <span>GCash</span>
                    <span>Paymaya</span>
                </div>
            </div>
            { isOpen && <ModalPayment /> }
        </div>
    )
}
export default AlterBtn