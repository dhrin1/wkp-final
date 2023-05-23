import ProfileLayout from "../../../components/layouts/ProfileLayout"
import { useContext, useState } from "react"
import { DataContext } from "../../../store/GlobalState"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import ModalRemove from "../../../components/modals/ModalRemove"


const Users = () => {

    const { state, dispatch } = useContext(DataContext)
    const { users, auth } = state
    const [ isOpen, setIsOpen] = useState(false)
    const { pathname } = useRouter()


    if(!auth.user) return null;
    return (
        <div>
            <div className="w-full">
                <h2 className="text-black-tertiary font-bold tex-2xl uppercase">Dashboard</h2>
                <p className="text-gray-tertiary text-sm font-semibold">Users</p>
            </div>
            <div className="bg-white border border-gray shadow-sm rounded-sm p-5 mt-5">
                <h2 className="text-black-teriary font-semibold text-md" >Accounts</h2>
                <div className="w-full overflow-y-auto">
                    <table className="w-full mt-5">
                        <thead>
                            <tr>
                                <th width="10%"></th>
                                <th width="20%" className="text-left">Name</th>
                                <th width="30%" className="text-left">Email</th>
                                <th width="10%" className="text-left">Role</th>
                                <th width="10%" className="text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx)=>(
                                    <tr key={user._id} >
                                        <td>
                                            <div className="w-12 h-12 object-cover object-center border shadow-sm rounded-full relative">
                                                <Image src={user.avatar} layout="fill" className="rounded-full"  alt={user.avatar} />
                                            </div> 
                                         
                                        </td>
                                        <td className="capitalize">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role === 'admin' ? 
                                                user.root ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-primary" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                             : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>                 
                                        }</td>
                                        <td>
                                            <Link href={
                                                auth.user.root && auth.user.email !== user.email
                                                ? `${pathname}/edit/${user._id}` : '#!'
                                            } >
                                                <button type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                
                                            </Link>
                                            {  auth.user.root && auth.user.email !==  user.email
                                               ? <button type="button"  onClick={()=> setIsOpen(true) & dispatch({ type: 'ADD_MODAL', payload: [{ data: users, id: user._id, title: user.name, type: 'ADD_USERS' }] }) }>
                                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                               </button>
                                               :null
                                            }


                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                       
                    </table>
                </div>
            </div>

            { isOpen && <ModalRemove setIsOpen={setIsOpen} /> }      
        </div>
    )
}
export default Users

Users.Wrapper = ProfileLayout