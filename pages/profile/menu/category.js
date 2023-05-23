import ProfileLayout from "../../../components/layouts/ProfileLayout"
import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { DataContext } from "../../../store/GlobalState"
import { postData, patchData } from "../../../utils/fetchData"
import { Menu } from "@headlessui/react"
import { updateItem } from "../../../store/Actions"
import ModalRemove from "../../../components/modals/ModalRemove"

const Category = () => {
    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state
    const router = useRouter()



    const [name, setName] = useState('')
    const [ id, setId ] = useState('')
     const [ isOpen, setIsOpen] = useState(false)
    
    const createCategory = async () => {
        if(auth.user.role !== 'admin') return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not authorized.' } })
        if(!name) return dispatch({ type: 'NOTIFY', payload: { error: 'Please complete all details.' } })

        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        let res;
        if(id) {
            res = await patchData(`categories/${id}`, {name}, auth.token)
            if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
            dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'))
        }else{
            res = await postData('categories', {name}, auth.token)
            if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
            dispatch({ type: 'ADD_CATEGORIES', payload: [...categories, res.newCategory] })
        }
        setName('') 
        setId('')
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    }

    const handleEditItem = (category) => {
        setName(category.name)
        setId(category._id)

    }

    return (
        <div>
            <div className="w-full flex justify-between items-center">
                <div>
                    <h2 className="text-black-tertiary font-bold tex-2xl uppercase">Manage categories</h2>
                    <p className="text-gray-tertiary text-sm font-semibold">Products</p>
                </div>
                <button onClick={()=>router.back()} className="text-orange-primary font-semibold text-sm inline-flex gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Go Back
                </button>
              
            </div>
            <div className="bg-white border border-gray shadow-sm rounded-sm p-5 mt-5">
                <div className="inline-block space-y-2">
                    <div className="mt-2 inline-flex gap-2 ">
                        <div>
                            <input type="text" id="name" name="name" onChange={e=>setName(e.target.value)} value={name} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-sm" placeholder="Category name"  />
                        </div>
                        <button type="submit" onClick={createCategory} className="px-2 h-9 bg-gradient-to-t from-green-700 to-green-600 rounded-md text-white">{ id  ? 'Edit' : 'Add new' } </button> {id  && <button onClick={()=>setId('') & setName('') } className="text-sm hover:underline hover:text-blue-primary" >cancel </button>}  
                    </div>
                </div>
                <div className="mt-5 mx-auto grid grid-cols-3 gap-2">
                    { !categories?.length  ? 
                         <span className="font-semibold text-gray-tertiary text-normal">You category on the list.</span>
                    : categories.map((category, idx) => (
                        <div key={idx} className="bg-gray-primary border items-center shadow-sm flex justify-between p-2 mt-2 rounded-md" >
                            <span>{category.name}</span>
                            <div>
                            <Menu as="div" className="relative inline-block text-left">
                                <Menu.Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </Menu.Button>
                                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-md border border-gray focus:outline-none z-[5]">
                                    <Menu.Item>
                                    {({ active }) => (
                                        <button type="button" onClick={()=> handleEditItem(category) } className={`${ active ? 'bg-gray-primary text-orange-primary' : 'text-gray-900' } group flex  items-center w-full rounded-tl-md rounded-tr-md px-2 py-2 text-sm gap-2 capitalize`}>
                                            Edit
                                        </button>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <button type="button" onClick={()=>setIsOpen(true) & dispatch({ type: 'ADD_MODAL', payload: [{ data: categories, id: category._id, title: category.name, type: 'ADD_CATEGORIES' }] }) } className={`${ active ? 'bg-gray-primary text-orange-primary' : 'text-gray-900' } group flex  items-center w-full rounded-tl-md rounded-tr-md px-2 py-2 text-sm gap-2 capitalize`}>
                                          Remove
                                        </button>
                                    )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
            { isOpen && <ModalRemove setIsOpen={setIsOpen} /> }      
        </div>
        
            
    )
}

export default Category


Category.Wrapper  = ProfileLayout