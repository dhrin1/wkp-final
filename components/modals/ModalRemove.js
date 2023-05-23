import { useContext } from "react"
import { DataContext } from "../../store/GlobalState"
import { deleteItem } from "../../store/Actions"
import { deleteData } from "../../utils/fetchData"
import { useRouter } from "next/router"



const ModalRemove = ({setIsOpen, products, setProduct}) => {
    const { state, dispatch } = useContext(DataContext)
    const { modal, auth } = state

    const router = useRouter()

    const deleteUsers = (item) => {
        dispatch(deleteItem(item.data, item.id, item.type))
        deleteData(`user/${item.id}`, auth.token)
        .then(res=>{
            if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
            if(!res.error) setIsOpen(false)
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        })
    }

    const deleteCategories = (item) => {
       
        deleteData(`categories/${item.id}`, auth.token)
        .then(res=>{
            if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
            if(!res.error) setIsOpen(false)
            dispatch(deleteItem(item.data, item.id, item.type))
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        })
    }

    const deleteProduct = (item) => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        deleteData(`product/${item.id}`, auth.token)
        .then(res=>{
            if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
            if(!res.error) setIsOpen(false)
            
            dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            return router.push(window.location.pathname)
        })
    }
 
    const handleRemove = () => {   
        if(modal.length !== 0){
            for(const item of modal){
                if(item.type === 'ADD_CART'){
                    dispatch(deleteItem(item.data, item.id, item.type))
                }
                
                if(item.type === 'ADD_USERS') deleteUsers(item)
                if(item.type === 'ADD_CATEGORIES') deleteCategories(item)
                if(item.type === 'DELETE_PRODUCT') deleteProduct(item)

                dispatch({ type: "ADD_MODAL", payload: [] })
            }
        }
        
    }   
    return (
        <div className="fixed inset-0 z-10 overflow-y-hidden"  >
            <div className="min-h-screen ">
                <div className="fixed inset-0 opacity-75 bg-black-tertiary dark:bg-white dark:opacity-25 border border-gray" ></div>
                <div className="flex justify-center h-screen items-center transform duration-200">
                    <div className="inline-block  w-full max-w-md rounded-xl  my-8  text-left align-middle transition-all transform bg-white  shadow-xl ">
                        <div className="w-full h-full px-2 py-10 text-center">
                            <h1 className="text-black-tertiary font-semibold text-xl">{ modal.length !== 0 && modal[0].title }</h1>
                            <h2 className="text-black-tertiary text-md sm:text-lg">Are you sure do you want to remove?</h2>
                            <div className="inline-flex gap-2 mt-2">
                                <button type="button" onClick={handleRemove} className="text-white bg-orange-primary py-1 w-24 rounded-md font-semibold hover:bg-orange-secondary" >Yes</button>
                                <button type="button" onClick={() => setIsOpen(false) } className="text-white bg-gray-tertiary py-1 w-24 rounded-md font-semibold hover:bg-gray-secondary" >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalRemove