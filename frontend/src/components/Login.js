import React,{useState, useContext} from 'react'
import {  useNavigate  } from "react-router-dom";



const Login = () => {

  const navigate=useNavigate();


  const [loginUserID,setLoginUserID] = useState("");
  const [loginPassword,setLoginPassword] = useState("");


  const clickLogin=()=>{

    if(loginUserID.length==0 || loginPassword.length==0){
      alert("Please enter the detail!!");
      return;
    }
    if(loginUserID=="admin" && loginPassword=="admin"){
      alert("Done Login!")
      navigate("/home")

    }
    else {
      alert("Please enter correct username and password.") 
    }

  };


  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2 lg:px-20">
      <main className="flex items-center w-full px-2 md:px-20">
        <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
          <p className='text-6xl text-blue-500 font-bold'>BioGPT</p>
          <p className='font-medium text-lg leading-1 text-pink-400'>Chat with confidence, we've got you covered!!</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
            <h2 className='p-3 text-3xl font-bold text-pink-400'>BioGPT</h2>
            <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
            <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3>

            <div className='flex flex-col items-center justify-center'>
            <input type='text' className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='User ID' value={loginUserID} onChange={(e)=>{setLoginUserID(e.target.value)}} ></input>
            <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='Password' value={loginPassword} onChange={(e)=>{setLoginPassword(e.target.value)}}></input>
            <button className='rounded-2xl m-2 text-white  bg-blue-400 px-4 py-2 shadow-md transition duration-200 ease-in' onClick={() => clickLogin()}>
              Sign In
            </button>
            </div>
        </div>
      </main>
    </div>
  )
}

export default Login