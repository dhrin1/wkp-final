
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import { registerValidate } from '../../utils/dataValidation'
import { patchData } from '../../utils/fetchData'
import { FcPrivacy } from 'react-icons/fc'
import Head from 'next/head'

const Profile = () => {

    const { state, dispatch } = useContext(DataContext)
    const { auth, notify } = state 

    const initialState = { email: '', name: '', password: '', cpassword: ''  }
    const [data, setData] = useState(initialState)
    const { name, password, cpassword } = data

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]:value })
        dispatch({ type: 'NOTIFY', payload: {} })
    }
   
    useEffect(()=>{
        if(auth.user) setData({...data, name: auth?.user?.name })
    },[auth.user])
    

   

    const hanleUpdaterProfile = (e) => {
        e.preventDefault()
        if(password){
            const errMsg = registerValidate(name, auth.user.email, password, cpassword)
            if(errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
            updatePassword()
        }
    }

   

    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        patchData('user/resetPassword', { password, name }, auth.token)
        .then(res => {
            if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
             dispatch({ 
                type: 'AUTH', 
                payload: {   
                      token: auth.token, 
                      user: res.user 
                  } 
            })
            setData({...data, password: '', cpassword: ''})
            
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
           
        })

        
    }
    
    if(!auth.user) return null

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="w-full">
                <h2 className="text-black-tertiary font-bold tex-2xl uppercase">Your account</h2>
                <p className="text-gray-tertiary text-sm font-semibold">Edit your profile</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                
                <div className="bg-white border border-gray shadow-sm rounded-sm p-5 mt-5">
                    <div>
                        <h2 className="text-black-teriary font-semibold text-md" >Your Information</h2>
                    </div>
                    <div >
                        <div className="mt-2">
                            <label htmlFor="name" className="text-sm" >Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} value={name} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm"   />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="email" className="text-sm" >Email address</label>
                            <input type="text" id="email" name="email" defaultValue={auth?.user?.email} disabled={true} onChange={handleChange}  className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm"   />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="password" className="text-sm" >Password</label>
                            <input type="password" id="password" name="password"  onChange={handleChange} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm"   />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="cpassword" className="text-sm" >Confirm password</label>
                            <input type="password" id="cpassword" name="cpassword"  onChange={handleChange}  className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm"   />
                        </div>
                        <div className="mt-5">
                            <button type="submit" onClick={hanleUpdaterProfile} className="bg-gradient-to-t from-green-700 to-green-600 text-white text-normal py-1 px-2 rounded-md shadow-sm border capitalize" disabled={notify.loading}>save & change</button>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-center">
                    <div className="inline-block "> 
                  
                        <div className="w-full flex justify-center">
                            <FcPrivacy size={100}  />
                        </div>
                        <p className="text-md text-gray-tertiary text-wrap leading-2 text-center">To enable to change your settings please comfirm your password recommendations to help you keep your account secure.</p>
                    </div>
                </div>    
            </div>          
        </div>
      
       
    )
}

export default Profile

Profile.Wrapper = ProfileLayout;