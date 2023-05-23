import Head from 'next/head'
import { AiOutlineCalendar } from 'react-icons/ai'

const Book = () => {
  return (
    <div>
        <Head>
            <title>Walang Ka-Pares | Book Now</title>
        </Head>
        <div className="h-screen  relative ">
            <div className="bg-gray-500 h-1/2 w-full bg-[url('https://res.cloudinary.com/dhrin1/image/upload/v1655875479/wkp_img_store/viber_image_2022-04-04_20-10-10-718_vlfp4l.jpg')] bg-cover bg-center "></div>

            <div className="relative -mt-11 w-full max-w-xl  flex justify-center mx-auto">
                <div className="w-full bg-orange-primary py-2 px-5 rounded-md shadow-md border border-orange-primary">
                    <div className="h-full flex justify-center items-center mx-auto">
                            <div className="grid grid-cols-3">
                                <div className="col-span-2">
                                    <div className="inline-flex gap-2">
                                        <div className="inline-block">
                                            <label htmlFor="startDate" className="text-white">Start date</label>
                                            <input type="date" id="startDate" name="startDate" className="py-2 text-md rounded-sm border border-gray px-2 outline-none"  />
                                        </div>

                                        <div className="inline-block">
                                            <label htmlFor="endDate" className="text-white">End date</label>
                                            <input type="date" id="endDate" name="endDate" className="py-2 text-md rounded-sm border border-gray px-2 outline-none"  />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1  ">
                                    <div className="h-full flex items-center justify-center">
                                        <button type="button" className="mt-3 h-9 px-2 bg-gradient-to-t from-green-700 to-green-600 rounded-md text-white inline-flex items-center gap-2"><AiOutlineCalendar size={24} />Book now</button>
                                    </div>
                                
                                </div>
                            </div>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Book