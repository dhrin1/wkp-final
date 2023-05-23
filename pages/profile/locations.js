import Head from 'next/head'
import ProfileLayout from '../../components/layouts/ProfileLayout'

const Locations = () => {
    return (
        <div>
            <Head>
                <title>Walang Ka-Pares | Saved Address </title>
            </Head>
            <div className="w-full">
                <h2 className="text-black-tertiary font-bold tex-2xl uppercase">Your account</h2>
                <p className="text-gray-tertiary text-sm font-semibold">Manage your Addresses</p>
            </div>          
            <div className="bg-white border border-gray shadow-sm rounded-sm p-5 mt-5">
                <div>
                    <h2 className="text-black-teriary font-semibold text-md" >Saved Address</h2>
                </div>
            </div>
          
        </div>
        
    )
}

export default Locations

Locations.Wrapper = ProfileLayout;

