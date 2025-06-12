import React, { useContext, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

function Login() {
    let [show,setShow] = useState(false)
    let {serverUrl} = useContext(authDataContext)
    let {userData,setUserData} = useContext(userDataContext)
    let [email,setEmail]= useState("")
    let [password,setPassword]= useState("")
    let {loading,setLoading}= useContext(authDataContext)
    let navigate = useNavigate()
     const handleLogin = async (e) => {
        setLoading(true)
            try {
                e.preventDefault()
                let result = await axios.post(serverUrl + "/api/auth/login",{
                    email,
                    password
    
                },{withCredentials:true})
                setLoading(false)
                setUserData(result.data)
                navigate("/")
                console.log(result)
                 toast.success("Login Successfully")
            } catch (error) {
                setLoading(false)
                console.log(error)
                toast.error(error.response.data.message)

            }
            
        }
  return (
     <div className='w-full min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-950 to-black p-4'>
        <div className='w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-6 left-6 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors duration-300' onClick={()=>navigate("/")}><FaArrowLeftLong className='w-[25px] h-[25px] text-white' /></div>
            <form action="" className='max-w-md w-full p-8 bg-black/40 backdrop-blur-xl rounded-xl shadow-2xl flex flex-col items-center gap-6 border border-white/10' onSubmit={handleLogin}>
                <h1 className='text-4xl font-extrabold text-white mb-4 text-center'>Welcome to <span className='text-lime-400'>GharBazaar</span></h1>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="email" className='text-lg text-white font-medium'>Email</label>
                    <input 
                        type="email" 
                        id='email' 
                        className='w-full px-5 py-3 bg-white/5 border border-white/20 rounded-lg text-lg text-white outline-none focus:border-red-500 transition-all duration-300 placeholder-white/50'
                        required 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email}
                        placeholder="Enter your email"
                    />
                </div> 
                <div className='w-full flex flex-col gap-2 relative'>
                    <label htmlFor="password" className='text-lg text-white font-medium'>Password</label>
                    <input 
                        type={show?"text":"password"} 
                        id='password' 
                        className='w-full px-5 py-3 bg-white/5 border border-white/20 rounded-lg text-lg text-white outline-none focus:border-red-500 transition-all duration-300 placeholder-white/50'
                        required 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password}
                        placeholder="Enter your password"
                    />
                    {!show && <IoMdEye className='w-6 h-6 absolute right-5 bottom-3 cursor-pointer text-white/70 hover:text-white transition-colors duration-200' onClick={()=>setShow(prev =>!prev)}/>}
                    {show && <IoMdEyeOff className='w-6 h-6 absolute right-5 bottom-3 cursor-pointer text-white/70 hover:text-white transition-colors duration-200' onClick={()=>setShow(prev =>!prev)}/>}
                </div>
                <button className='w-full py-3 bg-gradient-to-r from-red-600 to-red-800 text-white text-xl font-semibold rounded-lg shadow-lg hover:from-red-700 hover:to-red-900 transition-all duration-300 transform hover:scale-105' disabled={loading}>{loading?"Loading...":"Login"}</button>
                <p className='text-white text-lg text-center'>Don't have an account? <span className='text-red-500 cursor-pointer font-semibold hover:underline transition-colors duration-200' onClick={()=>navigate("/SignUP")}>Sign Up</span>
                </p>
            </form>
        </div>
  )
}

export default Login
