import ProfileLayout from "../../../../components/layouts/ProfileLayout"
import { useRouter } from "next/router"
import { useContext, useState, useEffect } from "react"
import { DataContext } from "../../../../store/GlobalState"

import { patchData } from '../../../../utils/fetchData'
import { updateItem } from "../../../../store/Actions"


const Edit = () => {
   
    const router = useRouter()
    const { id } = router.query

    const { state, dispatch } = useContext(DataContext)
    const { auth, users } = state

    const [editUser, setEditUser] = useState([])
    const [checkRole, setCheckRole] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(()=>{
        users.forEach(user=>{
            if(user._id === id){
                setEditUser(user)
                setCheckRole(user.role === 'admin' ? true : false)
            }
        })
    },[users])

    const handleCheckRole = () => {
        setCheckRole(!checkRole)
        setNum(num + 1)
    }

    const handleSubmit = () => {
        const role = checkRole ? 'admin' : 'user'
        // dispatch({ type: 'NOTIFY', payload: { loading: true } })
        if(num % 2 !== 0) {
            patchData(`user/${editUser._id}`, { role }, auth.token)
            .then(res =>{
                if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
                
                dispatch(updateItem(users, editUser._id, {
                    ...editUser, role
                }, 'ADD_USERS'))
                if(!res.error)  router.back()
                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

              
            })   
        }

       
       
    }
    
    

    return (
        <div>
            <div className="w-full flex justify-between items-center">
                <div>
                    <h2 className="text-black-tertiary font-bold tex-2xl uppercase">Edit Profile</h2>
                    <p className="text-gray-tertiary text-sm font-semibold">Manage Account</p>
                </div>
                <button onClick={()=>router.back()} className="text-orange-primary font-semibold text-sm inline-flex gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Go Back
                </button>
            </div>
            <div className="bg-white border mt-2 shadow-sm p-5">
                <div className="inline-flex gap-3 w-full">
                    <div className="w-24 h-24 object-cover object-center">
                        <img src={editUser.avatar} alt={editUser.avatar} className="w-full h-full rounded-full p-1 border-2" />
                    </div>
                    <div className="inline-block space-y-2">
                        <div className="mt-2">
                            <label htmlFor="name" className="text-sm" >Name</label>
                            <input type="text" id="name" name="name" defaultValue={editUser.name} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm"   />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="email" className="text-sm" >Email address</label>
                            <input type="text" id="email" name="email" defaultValue={editUser.email} disabled  className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm"   />
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                            <input type="checkbox" id="checkAuth" checked={checkRole} onChange={handleCheckRole} />
                            <label htmlFor="checkAuth" className="text-sm" >Mark as administrator</label>
                        </div>
               
                        <div className="mt-2">
                            <button type="submit" onClick={handleSubmit}  className="bg-gradient-to-t from-green-700 to-green-600 hover:bg-orange-secondary text-white text-sm py-1 h-9 px-2 rounded-md shadow-sm border capitalize">save & change</button>
                        </div>
                  
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Edit

Edit.Wrapper = ProfileLayout