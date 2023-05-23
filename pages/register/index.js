import { useRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { registerValidate } from '../../utils/dataValidation'
import { postData } from '../../utils/fetchData'
import Head from 'next/head'

const Register = () => {

    const initialState = { name: '', email: '', password: '', cpassword: '' }
    const [userData, setUserData] = useState(initialState)
    const { name, email, password, cpassword } = userData

    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
    }

    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        const errMsg = registerValidate(name, email, password, cpassword)
        if(errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })

        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        
        const res = await postData('auth/register', userData)
        if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

        router.push('/login')
    }

    useEffect(()=>{
        if(Object.keys(auth).length !== 0) router.push("/")
    },[auth])

  return (
      <>
        <Head>
            <title>
                Sign up
            </title>
        </Head>
        <section className="flex mx-auto justify-center items-center w-full h-screen z-24">
            <div className="max-w-sm w-full">
                <div className="w-full bg-white border border-gray rounded-md px-5 py-10 shadow-md">
                    <h2 className="font-bold text-3xl mb-4 w-full text-center">Sign up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <label htmlFor="name" className="text-normal" >Name</label>
                            <input type="text" id="name" name="name" onChange={handleChangeInput} value={name} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal"   />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="email" className="text-normal" >Email address</label>
                            <input type="text" id="email" name="email" onChange={handleChangeInput} value={email} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal"   />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="password" className="text-normal" >Password</label>
                            <input type="password" id="password" name="password" onChange={handleChangeInput} value={password} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal"   />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="cpassword" className="text-normal" >Confirm password</label>
                            <input type="password" id="cpassword" name="cpassword" onChange={handleChangeInput} value={cpassword} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal"   />
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="bg-orange-primary hover:bg-orange-secondary text-white w-full h-10 rounded-md">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="mt-3 inline-flex space-x-2 text-md">
                    <span>Already have an account?</span>
                    <button type="button" onClick={()=>router.push('/login')} className="font-semibold hover:text-orange-primary text-md">Login</button>
                </div>
            </div>
        </section>
      </>
    
  )
}

export default Register
