import { useRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { postData } from '../../utils/fetchData'
import Cookie from 'js-cookie'
import Head from 'next/head'


const Signin = () => {
    const initialState = { email: '', password: ''}
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData
    const { state, dispatch } = useContext(DataContext)

    const { auth } = state

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
    }

    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        const res = await postData('auth/login', userData)
        if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

        dispatch({ type: 'AUTH', payload: {
            token: res.access_token,
            user: res.user
        }})

        Cookie.set('refreshtoken', res.refresh_token, {
            path: 'api/auth/accessToken',
            expires: 7
        }) 
        localStorage.setItem('firstLogin', true)
    }

    useEffect(()=>{
        if(Object.keys(auth).length !== 0) router.back()
    },[auth])

    const isInvalid = email === '' || password === ''
  return (
    <>
        <Head>
            <title>
                Login
            </title>
        </Head>
        <section className="flex mx-auto justify-center items-center w-full h-screen">
            <div className="max-w-sm w-full">
                <div className="w-full bg-white border border-gray rounded-md px-5 py-10 shadow-md">
                    <h2 className="font-bold text-3xl mb-4 w-full text-center">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <label htmlFor="email" className="text-normal text-black-tertiary" >Email address</label>
                            <input type="text" id="email" name="email" onChange={handleChangeInput} value={email} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal"   />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="password" className="text-normal" >Password</label>
                            <input type="password" id="password" name="password" onChange={handleChangeInput} value={password} className="border border-gray outline-none h-9 w-full rounded-md px-2 text-normal"   />
                        </div>
                        <div className="mt-2">
                            <button type="submit" className={`bg-orange-primary hover:bg-orange-secondary text-white w-full h-10 rounded-md ${isInvalid && 'opacity-50'}`} disabled={isInvalid} >Login</button>
                        </div>
                    </form>
                </div>
                <div className="mt-3 inline-flex space-x-2 text-md">
                    <span>Don't have an account?</span>
                    <button type="button" onClick={()=>router.push('/register')} className="font-semibold hover:text-orange-primary  text-md capitalize">create one</button>
                </div>
            </div>
        </section>
    </>
    
  )
}

export default Signin
