import Image from "next/image"

const  Loading = () => {
  return (
      <>
     
        <div className="h-screen w-screen fixed  top-0 left-0 bg-white opacity-50 inset-0 z-10 overflow" ></div>
        <div className="w-full h-full flex justify-center items-center absolute top-0 duration-200 transition ">
            <div className="max-w-[30vh] h-auto w-full bg-orange-primary py-2 rounded-lg flex justify-center z-10 mx-auto boder boder-orange-primary shadow-md"> 
               <div className="w-full h-full text-center space-y-1 ">
                   <div>
                        <Image src="/assets/img/logo-walang-kapares.png" width={80} height={80} alt="logo" />
                   </div>
                   <div className=" w-full flex justify-center">
                      <div className="w-[6vh] h-[6vh] ">
                        <img src="/assets/img/loading.gif" className="w-full h-full object-center object-cover " />
                      </div>
                    </div> 
               </div>
            </div>
        </div>
        
      </>
    
  )
}
export default Loading
