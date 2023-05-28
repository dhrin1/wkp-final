import { Menu } from '@headlessui/react'
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import { getData } from "../../../utils/fetchData"
import { DataContext } from '../../../store/GlobalState'
import ProductItem from "../../../components/product/ProductItem"
import ProfileLayout from "../.././../components/layouts/ProfileLayout"
import Link from "next/link"
import ModalRemove from '../../../components/modals/ModalRemove'
import { BsTrashFill , BsArrowRightCircle } from 'react-icons/bs'
import filterSearch from '../../../utils/filterSearch'
import Filter from '../../../components/Filter'
import Head from 'next/head'


const Index = (props) => {
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state
    const router  = useRouter()

    const [products, setProduct] = useState(props.products)
    const [isSelect, setIsSelect] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(()=>{
        setProduct(props.products)
    },[props.products])

    useEffect(()=>{
        if(Object.keys(router.query).length === 0) setPage(1)   
    },[router.query])



    const handleSelect = (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProduct([...products])
    }

    const handleSelectAll = () => {
        products.forEach(product => {
            product.checked = !isSelect
        })
        setProduct([...products])
        setIsSelect(!isSelect)
    }

    const hadleRemoveAll = () => {
        let deleteArr = [];
        products.forEach(product=>{
            if(product.checked){
                deleteArr.push({
                    data: '',
                    id: product._id,
                    title: 'Selected item will be removed permanently.',
                    type: 'DELETE_PRODUCT'
                })
            }
        })
        dispatch({ type: 'ADD_MODAL', payload: deleteArr })
    }

    const handleLoadMore = () => {
        setPage(page + 1)
        filterSearch({router, page: page + 1})
       
    }


    if(!auth.user) return null;
    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="w-full">
                <h2 className="text-black-tertiary font-bold tex-2xl uppercase">Dashboard</h2>
                <p className="text-gray-tertiary text-sm font-semibold">Menu</p>
            </div>
            <div className="bg-white border border-gray shadow-sm rounded-sm p-2 px-4 mt-5">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <h2 className="text-black-teriary font-semibold text-md" >Products</h2>
                        {
                            auth.user.role === 'admin' && auth.user && products?.length ? 
                            <div className="inline-flex items-center gap-2 ml-2 px-1  cursorpointer">
                                <input type="checkbox" id="itemSelect" onChange={handleSelectAll} checked={isSelect} className="cursor-pointer" />
                                <label htmlFor="itemSelect" className="text-sm cursor-pointer">{ isSelect ? 'assets selected' : 'Select all' }</label>
                            </div> : null
                        }
                    </div>
                    <Filter state={state} />
                    {
                        
                        <div className="flex justify-end gap-2 items-center ">
                       
                        {isSelect && <button type="button" onClick={()=> setIsOpen(true) & hadleRemoveAll} className="text-sm flex items-center gap-2" ><BsTrashFill size={17} /></button> }
                        <Menu as="div" className="relative inline-block text-left mt-1">
                            <Menu.Button>
                                <button type="button" title="More option" className="text-black-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-md border border-gray focus:outline-none">
                                <Menu.Item>
                                {({ active }) => (
                                    <Link href={`./menu/create`} >
                                        <button type="button" className={`${ active ? 'bg-gray-primary text-orange-primary' : 'text-gray-900' } group flex  items-center w-full rounded-tl-md rounded-tr-md px-2 py-2 text-sm gap-2 capitalize`}>
                                            Create Menu
                                        </button>
                                    </Link>
                                )}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => (
                                    <Link href={`./menu/category`} >
                                        <button type="button" className={`${ active ? 'bg-gray-primary text-orange-primary' : 'text-gray-900' } group flex  items-center w-full rounded-tl-md rounded-tr-md px-2 py-2 text-sm gap-2 `}>
                                        Manage Category
                                        </button>
                                    </Link>
                                )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>}
                </div>
                { 
                    !products?.length ? 
                    <div className="w-full flex justify-between mx-auto items-center h-56" >
                        <span className="font-semibold text-gray-tertiary text-normal w-full text-center mt-10">You have no menu on the list</span>
                    </div>
                    
                    :
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-x-3 xl:gap-x-4 gap-y-5 mt-3">
                            {products.map(product=>(
                                <ProductItem key={product._id} product={product} handleSelect={handleSelect} />
                            ))}

                            {props.result < page * 6 ? "" 
                                : <div className="mx-auto h-full flex items-center">
                                    <button type="button" onClick={handleLoadMore} title="Load more" className="rounded-full text-black-primary border shadow-sm " ><BsArrowRightCircle size={25} fill="currentColor" /></button>
                                </div>
                            }
                        </div>
                        <div>
                            
                        </div>
                    </>
                }
                
            </div>
            { isOpen && <ModalRemove setIsOpen={setIsOpen}   /> }
        </div>
    )
}

export async function getServerSideProps({query}){
    const page  = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'
    const res = await getData( `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`)
 
    return {
      props: {
        products: res.products,
        result: res.result
      },
    }
}

export default Index



Index.Wrapper = ProfileLayout