const ModalPayment = () => {
    return (
        <div className="fixed inset-0 z-10 overflow-y-hidden"  >
            <div className="min-h-screen ">
                <div className="fixed inset-0 opacity-75 bg-black-tertiary dark:bg-white dark:opacity-25 border border-gray" ></div>
                <div className="flex justify-center h-screen items-center transform duration-200">
                    <div className="inline-block  w-full max-w-md rounded-xl  my-8  text-left align-middle transition-all transform bg-white  shadow-xl ">
                        <div className="w-full h-full px-2 py-10 text-center">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPayment