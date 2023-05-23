
import Head from "next/head"
import Image from 'next/image'
import Link from "next/link"
import { useContext } from "react"


import { ImSpoonKnife } from 'react-icons/im'
import { MdOutlineDeliveryDining, MdHeadphones } from 'react-icons/md'
import { DataContext } from "../store/GlobalState"


const Home = () => {
  const { state } = useContext(DataContext)

  const { auth } = state
  
   return (
     <>
       <Head>
          <title>Home</title>
        </Head>
        <section className="h-screen w-full flex items-center " >
          <div className="absolute right-0 mt-5 md:mt-4 -z-10">
            <Image src="/assets/img/hero.png" width={450} height={600}  />  
          </div>
          <div className="mx-auto max-w-screen w-full pb-4 px-4 sm:px-8 ">
            
              <div className="text-center space-y-4 -z-10 ">
                      <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
                      Walang Ka-Pares
                          <span className="text-orange-primary"> Restobar and Grill</span>
                      </h1>
                      <p className="text-gray-900 max-w-xl mx-auto leading-relaxed">
                      It is a long established fact that a management will be provide the good and tasty delicies, meals you loved and delivered with care.
                      </p>
                  </div>
                  <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                      <Link href="menu" >
                          <button type="button" className="px-10 py-3.5 w-full bg-orange-primary text-white text-center rounded-md shadow-md block sm:w-auto font-semibold capitalize">{ Object.keys(auth).length === 0 ? "Order now" : "Start new order" }</button>
                      </Link>
                      <Link href="book">
                        <button type="button" className="px-10 py-3.5 w-full text-gray-500 text-center border rounded-md duration-300 bg-gray-50 hover:text-orange-primary hover:shadow block sm:w-auto font-semibold">Book Now</button>
                      </Link>
                  </div>
            </div>    
        </section>

        <section className="">
              <div className="container px-6 py-10 mx-auto">
                  <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-black-primary">explore our <br /> awesome <span className="text-orange-primary">Services</span></h1>
                  
                  <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
                      <div className="flex flex-col items-center p-6 space-y-3 text-center bg-white rounded-xl border border-gray shadow-sm">
                          <span className="inline-block p-3  rounded-full bg-orange-primary text-white">
                            <ImSpoonKnife size={30} />
                          </span>
                          <h1 className="text-2xl font-semibold text-black-primary capitalize ">Dine In & Take-Away</h1>
                          <p className="text-gray-tertiary">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                          </p>
                          <a href="#" className="flex items-center -mx-1 text-sm text-black-primary capitalize transition-colors duration-200 transform hover:text-orange-primary hover:underline">
                              <span className="mx-1">read more</span>
                              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          </a>
                      </div>
                      <div className="flex flex-col items-center p-6 space-y-3 text-center bg-white rounded-xl border border-gray shadow-sm">
                          <span className="inline-block p-3  rounded-full bg-orange-primary text-white">
                              <MdOutlineDeliveryDining size={30} />
                          </span>
                          <h1 className="text-2xl font-semibold text-black-primary capitalizee">Delivery</h1>
                          <p className="text-gray-tertiary">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                          </p>
                          <a href="#" className="flex items-center -mx-1 text-sm text-black-primary capitalize transition-colors duration-200 transform hover:text-orange-primary hover:underline">
                              <span className="mx-1">read more</span>
                              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          </a>
                      </div>

                      <div className="flex flex-col items-center p-6 space-y-3 text-center bg-white rounded-xl border border-gray shadow-sm">
                          <span className="inline-block p-3  rounded-full bg-orange-primary text-white">
                            <MdHeadphones size={30} />
                          </span>
                          <h1 className="text-2xl font-semibold text-black-primary capitalize">Customer Service</h1>
                          <p className="text-gray-tertiary">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                          </p>
                          <a href="#" className="flex items-center -mx-1 text-sm text-black-primary capitalize transition-colors duration-200 transform hover:text-orange-primary hover:underline">
                              <span className="mx-1">read more</span>
                              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          </a>
                      </div>
                  </div>
              </div>
          </section>

       
     </>
    
     
  )
}



export default Home