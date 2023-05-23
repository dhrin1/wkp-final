import { useRouter } from 'next/router'
import Image from 'next/image'

// customer side
const MenuItems = ({product}) => {

    const router = useRouter()
    const handleViewItem = () => {
      if(product.inStock <= 0 ) return;
      router.push(`menu/${product._id}`)
    }
  
    return (
                <div className="col-span shadow-md rounded-md border border-gray">
                  <div className="h-48 relative">
                      <Image src={product.images[0].url} alt={product.images[0].url} layout="fill" objectFit="cover" className="rounded-t-md "   />                       
                      {product.inStock <= 0 &&
                         <div className="w-full absolute bottom-0 px-1">
                            <p className="flex leading-1 text-white shadow-md text-xs text-shadow">Sorry this menu is not available at this time.</p>
                          </div>
                      }
                  </div>
                  <div onClick={handleViewItem} className={`bg-orange-primary p-2 rounded-bl-md rounded-br-md hover:opacity-50 relative ${product.inStock <= 0 ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'} `}>
                      <h2 className="text-white title-font text-normal font-base capitalize">{product.title}</h2>
                      <p className="mt-1 text-white">{'\u20B1'}{product.price}</p>
                      <div className="flex items-center flex-wrap justify-between">
                          <span alt="sold" className="text-yellow-400 h-full mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>{product.sold}
                          </span> 
                          <button onClick={e=>e.stopPropagation() & alert('?')} className="inline-flex ">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg> 
                          </button>
                        </div>
                    </div>
                  </div>
             
        
    )
}

export default MenuItems