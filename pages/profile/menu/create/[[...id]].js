import { useState, useContext, useEffect } from "react"
import { DataContext } from "../../../../store/GlobalState"
import { ImageUploadProfile } from "../../../../utils/imageUpload"
import Image from "next/image"
import Link from "next/link"
import { getData, postData, putData } from "../../../../utils/fetchData"
import ProfileLayout from "../../../../components/layouts/ProfileLayout"
import { IoImagesOutline } from 'react-icons/io5'
import { useRouter } from "next/router"


const ProductManager = () => {
    const initialState = {
        title: '',
        price: 0,
        inStock: Math.floor(Math.random() * 100) * 9322,
        description: '',
        content: '',
        category: ''
    }

    const router = useRouter()
    const { id } = router.query

    const [product, setProduct] = useState(initialState)
    const {title, price, inStock, description, content, category, duration } = product

    const { state, dispatch } = useContext(DataContext)
    const { categories, auth } = state
    
    const [images, setImages] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    useEffect(()=>{
        if(id){
            setOnEdit(true)
            getData(`product/${id}`).then(res=>{
                setProduct(res.item)
                setImages(res.item.images)
            })
        }
    },[id])

   
    

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({ ...product, [name]:value })
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleImageInput = e => {
        dispatch({  type: 'NOTIFY', payload: {} })
        let newImages = []
        let num = 0;
        let err = ''
        const files = [...e.target.files]
       
        if(files.length === 0) return dispatch({ type: 'NOTIFY', payload: { error: 'Files you selected is not available.' } })
        files.forEach(file=>{
            if(file.size > 1024 * 1024) return err = 'Unable to parse this file, required is less than 1mb size.'
            if(file.type !== 'image/jpeg' && file.type !== 'image/png') return err = 'File format is not supported.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;

        })

        if(err) dispatch({ type: 'NOTIFY', payload: { error: err } })

        const imgCount = images.length
        if(imgCount + newImages.length > 5) return dispatch({ type: 'NOTIFY', payload: { error: 'Allowed of maximum 5 files for this action.' } })
        setImages([...images, ...newImages])
    }

    const removeImageIndex = (idx) => {
        const newArrImg = [...images]
        newArrImg.splice(idx, 1)
        setImages(newArrImg)
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(auth.user.role !== 'admin')
        return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not authorized.' } })
        
        if(!title || !price || !inStock || !description || !content || !duration || category === 'all' || images.length === 0)
        return dispatch({ type: 'NOTIFY', payload: { error: 'Please complete all details given.' } })
    
        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await ImageUploadProfile(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
        }else{
            res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } })
        }
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    }
 

    return (
        <div className=" flex justify-center mx-auto ">
            <div className="max-w-6xl w-full ">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1  ">
                        <button onClick={e=>router.back()} className=" text-orange-primary font-semibold text-sm inline-flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Go Back
                        </button>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Manage Menu</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div> 
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="w-full border bg-white shadow-sm p-3">
                            
                            <form onSubmit={handleSubmit} >
                                <div className="flex justify-between w-full items-center ">
                                    <div className="inline-flex gap-2">
                                        <select name="category" id="category" value={category} onChange={handleChangeInput}>
                                            <option value="all">All Products</option>
                                            {categories.map((item, idx)=>(
                                                <option value={item._id} key={idx}  >{item.name}</option>
                                            ))}
                                        </select> 
                                        <Link href="/profile/menu/category">
                                            <button type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="inline-flex items-center gap-5">
                                        <button type="button" onClick={()=>router.back()} className=" font-semibold text-sm inline-flex gap-2 ">
                                           Cancel
                                        </button>
                                        <button type="submit"  className="px-2 h-9 bg-gradient-to-t from-green-700 to-green-600 rounded-md text-white" >{ onEdit ? 'Edit' : 'Create' }</button>
                                    </div>
                                    
                                </div>
                                <div className="mt-2">
                                    <input type="text" id="title" name="title" onChange={handleChangeInput} value={title} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal" placeholder="Title"/>
                                </div>
                                <div className="mt-2">
                                    <div className="inline-flex gap-3">
                                        <div className="inline-block">
                                            <label htmlFor="price" className="text-normal">Price</label>
                                            <input type="text" id="price" name="price" onChange={handleChangeInput} value={price} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal" placeholder="Price"  />
                                        </div> 
                                        <div className="inline-block invisible">
                                            <label htmlFor="inStock" className="text-normal">Stock</label>
                                            <input type="text" id="inStock" name="inStock" onChange={handleChangeInput} disabled value={inStock} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal" placeholder="Stock"  />
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="mt-2 ">
                                    <textarea id="description" name="description" onChange={handleChangeInput} cols={30} rows={2} value={description}  className="border border-gray outline-none  w-full rounded-md px-2 py-2 text-normal" placeholder="Description"></textarea>
                                </div>
                                <div className="mt-2 ">
                                    <textarea id="content" name="content" onChange={handleChangeInput} cols={30} rows={4} value={content}  className="border border-gray outline-none  w-full rounded-md px-2 py-2 text-normal" placeholder="Content"></textarea>
                                </div>
                                <div className="mt-2 ">
                                    <select id="duration" name="duration" onChange={handleChangeInput} value={duration}  className="border border-gray outline-none h-9  rounded-md px-2 text-normal">
                                        <option value="none" selected disabled> Select Duration</option>
                                        <option value="5"  >5 minutes</option>
                                        <option value="10">10 minutes</option>
                                        <option value="20"  >20 minutes</option>
                                    </select>
                                </div>                  
                                <div className="mt-2">
                                    <div className="inline-flex text-sm items-center"> 
                                            <div>
                                                <input type="file" id="imageFile" onChange={handleImageInput} multiple accept="image/*" className="opacity-0 absolute z-10 object-fill overflow-ellipsis flex-nowrap inline-block overflow-hidden h-7 w-7 text-center" />
                                                <label className="cursor-pointer object-fill overflow-ellipsis flex-nowrap  overflow-hidden h-7 w-7 text-center flex items-center justify-center"><IoImagesOutline size={20} className="text-black-primary" /></label>
                                            </div>
                                            <label htmlFor="imageFile">Add assets ({  images.length })</label>
                                    </div>
                                    <div className="mt-1 flex-wrap  items-center">
                                       
                                        <div className="inline-flex gap-2">
                                            {images.map((img, idx)=>(
                                                <div key={idx} className="relative h-24 w-24 object-cover object-center border rounded-md shadow-sm ">
                                                    <Image src={img.url ? img.url : URL.createObjectURL(img)} layout="fill" alt={img.url} className="rounded-md border " />
                                                    <button type="button" onClick={()=> removeImageIndex(idx)} className="absolute h-5 w-5 px-1 rounded-full right-0 -mt-2 -mr-2 bg-blue-primary text-white text-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className=" " viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                            </form>

                        </div>
                    </div>
                </div>
            </div>   
        </div>
       
    )
}

export default ProductManager

ProductManager.Wrapper = ProfileLayout