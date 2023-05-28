import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { ImageUploadProfile } from '../../utils/imageUpload'
import { patchData } from '../../utils/fetchData'

import { BsFillCameraFill } from 'react-icons/bs'


import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { MdOutlineMenuBook, MdHistory } from 'react-icons/md'
import { CgUserList, CgShoppingBag } from 'react-icons/cg' 
import { GrLocation } from 'react-icons/gr'


const ctrluser = [
    { title: 'account info', path: '/profile', icon: <AiOutlineUser size={20} /> },
    { title: 'saved adresses', path: '/profile/locations', icon: <GrLocation size={20} /> },
    { title: 'order history', path: '/profile/orderhistory', icon: <MdHistory size={20} /> },
    { title: 'order status', path: '/profile/orderstatus', icon: <CgShoppingBag size={20} /> },
]

const ctrladmin = [
    { title: 'orders', path: '/profile/orderstatus', icon: <HiOutlineClipboardList size={20} /> },
    { title: 'menu', path: '/profile/menu', icon: <MdOutlineMenuBook size={20} /> },
    { title: 'users', path: '/profile/users', icon: <CgUserList size={20} /> },
]
const ProfileLayout = ({children}) => {
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state 
    const router = useRouter()
    const initialState = { avatar: '', name: '', editctrl: false  }
    const [data, setData] = useState(initialState)
    const { avatar, name } = data


    
    const sidenav = [];
    for (let item of ctrluser) {
        sidenav.push({ item});
    }

    useEffect(()=>{
        if(auth.user) setData({...data, name: auth?.user?.name })
    },[auth.user])

    const handleProfilePic = () => {
        if(avatar)  updateProfilePic()
    }
    
    const changeAvatar = (e) => {
        const file  = e.target.files[0]
        if(!file) return dispatch({ type: 'NOTIFY', payload: { error: 'Please choose your photo.' } })

        if(file.type !== "image/jpeg" && file.type !== "image/png") return dispatch({ type: 'NOTIFY', payload: { error: 'This file cant support, please choose image file' } })

        if(file.size > 1024 * 1024) return dispatch({ type: 'NOTIFY', payload: { error: 'File is to large.' } })
        
        setData({ ...data, avatar: file, editctrl: true })
       
    }

 
    const updateProfilePic = async () => {
        let media;
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
    
        if(avatar) media = await ImageUploadProfile([avatar])
        
       patchData('user/userData', {
           avatar: avatar ? media[0].url : auth.user.avatar
       }, auth.token).then(res => {
           if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
           dispatch({ type: 'AUTH', payload: {
               token: auth.token,
               user: res.user
           } })
           setData({ ...data, editctrl: false })
           return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
       })
    }
    const navTargetToAct =  `/${router.pathname.split('/')[1]}` === router.pathname ? `/${router.pathname.split('/')[1]}` : `/${router.pathname.split('/')[1]}/${router.pathname.split('/')[2].split('?')[0]}`

    if(!auth.user) return null
    return (
        <div>
            <section className="bg-white mx-auto mt-24 max-w-6xl px-2 sm:px-3">
                <div className="grid grid-cols-4 gap-5 ">
                    <div className="col-span-1 ">
                        <div className="w-full inline-block mx-auto">
                            <div className="inline-flex items-center w-full gap-2">
                                <div>
                                    <div className="h-24 w-24 object-center object-cover border-2 border-orange-primary p-1 rounded-full ">
                                        <div className="w-full h-full m-auto rounded-full relative bg-gray-secondary shadow-sm">
                                            <Image src={avatar ? URL.createObjectURL(avatar) : auth?.user?.avatar} width="100%" height="100%"  className="rounded-full "  />
                                            <div className="bg-gray-200 hover:bg-gray-300 cursor-pointer w-7 h-7 rounded-full absolute bottom-0 right-0 ">
                                                <input type="file" onChange={changeAvatar} accept="image/*" className="opacity-0 absolute z-10 object-fill overflow-ellipsis flex-nowrap inline-block overflow-hidden h-7 w-7 text-center" />
                                                <label className="cursor-pointer object-fill overflow-ellipsis flex-nowrap  overflow-hidden h-7 w-7 text-center flex items-center justify-center"><BsFillCameraFill size={14} className="text-black-primary" /></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" h-full w-full flex items-center mr-2">
                                    <div className="inline-block w-full">
                                        <h2 className="text-black-primary text-sm font-semibold break-all w-full capitalize">{ name }</h2>
                                        <p className="text-gray-tertiary text-sm">{ auth?.user?.role === 'user' ? 'Customer' : 'Management' }</p>
                                        { data.editctrl && <div className="inline-flex gap-2 text-xs"><button type="button" onClick={handleProfilePic} className="text-gray-tertiary hover:text-blue-600">Edit</button> <button type="button" onClick={e=> setData({...data, editctrl: false}) } className="text-gray-tertiary hover:text-blue-600" >Cancel</button></div> }
                                    </div>
                                    
                                </div>
                            </div>
                            <ul className="mt-5">
                                { sidenav.map((nav, idx)=>
                                     <div key={idx}>
                                         {nav.icon}
                                         {
                                             
                                              auth?.user?.role === "admin" ?
                                              nav.item.title === "account info"  && 
                                              <>
                                                  <li key={nav.item.title}>
                                                    <Link href={nav.item.path} ><button type="button" className={`w-full text-left bg-white hover:bg-gray-primary py-2 px-1 transform duration-200  active:border-r-2 capitalize flex items-center gap-2 ${navTargetToAct === nav.item.path && 'bg-gray-primary border-r-[4px] border-orange-primary font-semibold' } `}>{nav.item.icon} {nav.item.title}</button></Link>
                                                  </li>
                                                 
                                                  {ctrladmin.map((item, idx) => (
                                                      <li key={item.title}>
                                                          <Link href={item.path} ><button type="button" className={`w-full text-left bg-white hover:bg-gray-primary py-2 px-1 transform duration-200  active:border-r-2 capitalize flex items-center gap-2 ${navTargetToAct === item.path && 'bg-gray-primary  border-r-[4px]  border-orange-primary font-semibold' } `}>{item.icon}{item.title}</button></Link>
                                                      </li>
                                                  ))}
                                              </>
                                          :  <li key={nav.item.title}><Link href={nav.item.path} ><button type="button" className={`w-full text-left bg-white hover:bg-gray-primary py-2 px-1 transform duration-200  active:border-r-2 capitalize flex items-center gap-2 ${navTargetToAct === nav.item.path && 'bg-gray-primary  border-r-[4px] border-orange-primary font-semibold' } `}>{nav.item.icon} {nav.item.title}</button></Link></li>
                                         }
                                     </div>   
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-3">
                        {children}
                    </div>
                </div>
            </section> 
        </div>
        
    )
}

export default ProfileLayout