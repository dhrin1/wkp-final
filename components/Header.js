import { useRouter } from "next/router"
import { useContext, useEffect, Fragment, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'
import Image from  'next/image'
import { Menu } from '@headlessui/react'
import { GiPaperBagFolded } from 'react-icons/gi'

import Link from 'next/link'


export default function Header() {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { auth, cart, orders } = state
    const [orderCount, setOrderCount] = useState([])

    const handleLogout = () => {
        Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        return router.push('/')
    }

  

    const navigation = [
        { title: 'Home', path: '/' },
        { title:  auth?.user?.role !== "admin" ? `Order Status` : `Order Tracker` , path: '/profile/orderstatus' },
    ]

    useEffect(()=>{
        const arrCount = []
        orders.filter(d => !d.paid && arrCount.push(d) )
        setOrderCount(arrCount)
    },[orders])
   
  return (
   <header className="w-full h-auto py-2 flex justify-center mx-auto bg-gradient-to-t from-orange-secondary  to-orange-primary fixed top-0 z-10">
       <div className="w-full h-full max-w-6xl flex justify-between items-center  px-3 sm:px-4 md:px-3 lg:px-2 xl:px-1">
           <div className="inline-flex space-x-5 h-full items-center">
               <Image priority src="/assets/img/logo-walang-kapares.png" alt="logo" className="cursor-pointer" height={70} width={70} onClick={()=>router.push('/')} />
                {
                    Object.keys(auth).length === 0 ?
                        <Link href={navigation[0].path}  >
                            <button type="button" className="text-white hover:text-orange-300 font-semibold" >{navigation[0].title} </button>
                        </Link>
                        : navigation.map((item, idx) => (
                            <div key={idx}>
                                <Link href={item.path}  >
                                    <div className="inline-flex items-center">
                                        <button type="button" className="text-white hover:text-orange-300 font-semibold inline-flex" >{item.title}     </button>    
                                        {item.title === "Order Tracker" && auth?.user?.role === "admin" && orderCount.length >= 1 && <span className="rounded-full bg-yellow-500 p-1 mx-1 text-xs w-5 h-5 text-center" >{orderCount.length}</span> }
                                    </div>
                                   
                                </Link> 
                            </div>
                    ))
                }
              
           </div>
           
           <div className="flex space-x-5">         
               {
                  Object.keys(auth).length === 0 ?
                    <>
                        <Link href="/login"  >
                            <button type="button"  className="font-semibold text-base text-white hover:text-orange-300">Sign In</button>
                        </Link>  
                    </>
                    :  
                    <>     
                         <Menu as="div" className="relative inline-block text-left">
                             <div className="h-full flex justify-center items-center">
                             <Menu.Button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                 {/* <Image src={auth?.user.avatar} width={35} height={35} blurDataURL="data:..."  className="rounded-full border border-orange-800" placeholder="blur" /> */}
                             </Menu.Button>
                             </div>
                            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-md border border-gray focus:outline-none">
                                <Menu.Item>
                                {({ active }) => (
                                    
                                     <button onClick={()=>router.push("/profile")}
                                        className={`${
                                            active ? 'bg-gray-primary text-orange-primary' : 'text-gray-900'
                                        } group flex  items-center w-full rounded-tl-md rounded-tr-md px-2 py-2 text-sm gap-2 capitalize`}
                                        ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>{auth.user.name}</button>      
                                )}
                                </Menu.Item>

                                {/* <Menu.Item>
                                {({ active }) => (
                                   <button
                                    className={`${
                                        active ? 'bg-gray-primary text-orange-primary' : 'text-gray-900'
                                    } group flex  items-center w-full rounded-tl-md rounded-tr-md px-2 py-2 text-sm gap-2`}
                                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>Setting</button>
                                )}
                                </Menu.Item> */}
                                
                                <Menu.Item>
                                    {({ active }) => (
                                   <button onClick={handleLogout}
                                   className={`${
                                       active ? 'bg-gray-primary text-orange-primary' : 'text-gray-900'
                                   } group flex  items-center w-full rounded-bl-md rounded-br-md px-2 py-2 text-sm gap-2`}
                                   ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                   <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                 </svg>Logout</button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </>
                   
               }
               <Link href="/order/cart" >
                   <button type="button" className=" flex items-center h-full relative -top-[4px]">
                        <small className="absolute bg-yellow-400 text-black-primary h-4 w-4  text-xs flex items-center justify-center rounded-full font-semibold bottom-0" >{ cart.length }</small>
                        <GiPaperBagFolded size={45} className="text-white hover:text-orange-300" />
                   </button>
               </Link>
           </div>
       </div>
   </header>
  )
}
