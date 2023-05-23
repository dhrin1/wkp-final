
import { useState, useEffect } from 'react'
import filterSearch from '../utils/filterSearch'
import { getData } from '../utils/fetchData'
import { useRouter } from 'next/router'


const Filter = ({state}) => {

    const [search, setSearch] = useState('')
    const [ sort, setSort ] = useState('')
    const [category, setCategory] = useState('')

    const { categories } = state
    const router = useRouter()

    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({router, category: e.target.value})
    }

    const hadleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }



    useEffect(()=>{
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    }, [search])

    

    return (
        <div className="inline-flex space-x-1">
            
            <select className="capitalize" value={category} onChange={handleCategory}>
               <option value="all" >All Categories</option>
               {categories.map(item=>(
                   <option key={item._id} value={item._id}>{item.name}</option>
               ))}
            </select>

            <input type="text" list="title_menu" autoComplete="off" className="border border-gray rounded-md px-1 h-9" value={search.toLowerCase()}  onChange={e => setSearch(e.target.value)}  />
            
            <select className="" value={sort} onChange={hadleSort}>
               <option value="-createdAt" >Newest</option>
               <option value="sold" >Best sales</option>
               <option value="price" >Affordable Price</option>
               <option value="-price" >Expensive Price</option>
            </select>
        </div>
    )

}

export default Filter