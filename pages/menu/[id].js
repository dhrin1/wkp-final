import { useState, useContext, useEffect } from "react"
import { getData } from "../../utils/fetchData"
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from "next/image"
import { addToCart } from "../../store/Actions"
import { DataContext } from '../../store/GlobalState'
import { CgTimer } from 'react-icons/cg'



const MenuDetail = (props) => {

    const { state, dispatch } = useContext(DataContext)
    const { cart, categories } = state

    const [item] = useState(props.itemDetails)
    const router = useRouter()
    const [tab, setTab] = useState(0)

    const isPicked = (idx) => {
        if(tab === idx) return 'border-2 border-orange-500 shadow-xl';
        return null
    }

    const [category, setCategory] = useState('')

    useEffect(()=>{
        categories.filter(d=>d._id === item.category ? setCategory(d.name) : item.category )
    },[categories])
 
    return (
        <div>
            <Head>
                <title>{item.title}</title>
            </Head>
            <div className="bg-white mx-auto mt-24 max-w-6xl px-0 sm:px-3">
                    <button onClick={e=>router.back()} className="text-orange-primary font-semibold text-sm inline-flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Go Back
                        </button>
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="relative lg:w-1/2  h-[70vh] w-full ">
                            <Image src={item.images[tab].url} alt={item.images[tab].url} layout="fill" className="  object-cover object-center rounded" />
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-lg title-font text-gray-500 tracking-widest">{category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-bold mb-1 capitalize">{item.title}</h1>
                            <p className="leading-relaxed">{item.description}</p>
                            <p className="text-gray-500 text-normal mt-5">{item.content}</p>
                            <div className="block leading-4 mt-5 select-none">
                                <h2 className="text-sm">Preparation time</h2>
                                <p className="inline-flex items-center gap-1 text-gray-400">
                                    <CgTimer size={18} color={'gray'} />
                                    <span>{item.duration} minutes</span>
                                </p>  
                            </div>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory" >
                                    <div className="relative w-24 h-24">
                                        {item.images.map((img, idx)=>(
                                            <Image onClick={()=>setTab(idx)} src={img.url} key={idx} alt={img.url} layout="fill" objectFit="cover" objectPosition="center" className={`w-24 h-24 shrink-0 snap-center rounded-md object-cover object-center cursor-pointer ${isPicked(idx)}`} />
                                        ))}
                                    </div>
                                 
                                 </div>
                            </div>
                            <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">{'\u20B1'}{item.price}</span>
                                <button onClick={()=> dispatch(addToCart(item, cart))} className="flex ml-auto text-white bg-orange-primary border-0 py-2 px-6 focus:outline-none hover:bg-orange-700 rounded">Order Now</button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
    )
}
export async function getServerSideProps({params: {id}}){
    const res = await getData(`product/${id}`)
    return {
        props: {
            itemDetails: res.item
        }
    }
}
export default MenuDetail