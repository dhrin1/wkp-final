import { getData } from "../../utils/fetchData"
import { useState, useContext, useEffect } from 'react'
import Head from "next/head"
import MenuItem from "../../components/product/MenuItem"
import Link from "next/link"
import { DataContext } from "../../store/GlobalState"
import { BsArrowRightCircle } from 'react-icons/bs'
import { IoFastFoodSharp, IoSearch } from 'react-icons/io5'

import { useRouter } from "next/router"
import filterSearch from "../../utils/filterSearch"



const Menu = (props) => {
  const {state, dispatch} = useContext(DataContext)
  const { categories } = state

  const [products, setProducts] = useState(props.products)
  const [ sort, setSort ] = useState('')
  const [search, setSearch] = useState('')

  const router = useRouter()

  const [page, setPage] = useState(1)

  useEffect(()=>{
      setProducts(props.products)
  },[props.products])

  useEffect(()=>{
      if(Object.keys(router.query).length === 0) setPage(1)   
  },[router.query])

  const handleLoadMore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }

  const hadleSort = (e) => {
    setSort(e.target.value)
    filterSearch({router, sort: e.target.value})
  }

  useEffect(()=>{
    filterSearch({router, search: search ? search.toLowerCase() : 'all'})
  }, [search])



    

    return (
        <div>
            <Head>
                <title>Menu</title>
            </Head>
            <div className="bg-white grid grid-cols-1 md:grid-cols-4 mx-auto mt-24 max-w-6xl px-2 sm:px-3 gap-5">
              <div className="col-span-1 w-full top-0 md:block">
                <h2 className="font-bold text-xl text-black-primary mb-2">Categories</h2>
                <div className="flex md:inline-block space-y-1 w-full overflow-x-hidden">
                  <Link href="/menu?category=all">
                    <button className={`outline-none pr-2 py-1 h-10 pl-1 font-semibold w-full text-left hover:bg-gray-primary hover:border-r-4 border-orange-primary text-wrap text-sm md:text-base ${router.query.category === 'all' || !router.query.category ? 'border-r-4 border-orange-primary bg-gray-primary ' : ''}`}>All menu</button>
                  </Link>
                  {
                    categories.map((item, idx)=>(
                      <Link href={`/menu?category=${item._id}`} key={idx}>
                         <button className={`outline-none pr-2 py-1 h-10 pl-1 font-semibold w-full text-left hover:bg-gray-primary hover:border-r-4 border-orange-primary text-wrap text-sm md:text-base ${router.query.category === item._id ? 'border-r-4 border-orange-primary bg-gray-primary ' : ''}`}>{item.name}</button>
                      </Link>
                    ))
                  }
                </div>
              </div>
              <div className="col-span-3">
                  <div className="flex border items-center px-2 h-10 rounded-sm bg-gray-200">
                    <IoSearch size={25} />
                    <input type="text" autoComplete="off" className="w-full bg-transparent outline-none text-black-primary mx-2" value={search.toLowerCase()}  onChange={e => setSearch(e.target.value)} placeholder="Search" />
                    <select className="bg-transparent  outline-none" value={sort} onChange={hadleSort}>
                      <option value="-createdAt" >Newest</option>
                      <option value="sold" >Best sales</option>
                      <option value="price" >Affordable Price</option>
                      <option value="-price" >Expensive Price</option>
                    </select>
                  </div>
                  
                  <section className="text-gray-600 body-font">
                    <div className="py-5 mx-auto">
                    {
                        !products?.length ? 
                        <div className="w-full flex justify-center mx-auto items-center h-56" >
                            <div className="inline-block text-center space-y-2">
                                <IoFastFoodSharp size={45} className=" text-center w-full text-orange-primary" />
                                <span className="font-semibold text-gray-tertiary text-lg w-full text-center mt-10">This varient is not avaible at this time.</span>
                            </div>
                        </div>
                        
                        :
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-3 xl:gap-x-4 gap-y-5">
                          {products.map((product) => (
                            <MenuItem key={product._id} product={product} />
                          ))}
                           {props.result < page * 6 ? "" 
                                : <div className=" mx-auto h-full flex items-center">
                                    <button type="button" onClick={handleLoadMore} title="Load more" className="rounded-full text-black-primary border shadow-sm " ><BsArrowRightCircle size={25} fill="currentColor" /></button>
                                </div>
                            }
                        </div>
                      }
                    </div>
                    </section>
                </div>
              </div>
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

export default Menu