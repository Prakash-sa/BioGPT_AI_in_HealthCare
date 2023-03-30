import React,{useEffect, useContext, useState} from 'react'
import axios from 'axios';

const backendLink="http://127.0.0.1:5000"

function Card() {


    const [hwset1qty,setHWSet1qty]=useState(0);
    const [hwset2qty,setHWSet2qty]=useState(0);




  const clickLeft=()=>{


    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };



    axios.post(backendLink+'/api/predict/', config)
    .then((response) => {
        console.log(response.data);
        alert('Left '+response.data);

    }).catch((err)=>{
      console.log('err',err);
    });



  };


  return (
        <div className="border-black border-2 border-solid m-2 flex flex-col items-center align-middle bg-[#c0d19f] w-auto md:px-5 md:flex-row lg:flex-row lg:px-5">
        <div className="px-2">Project</div>
        {/* <div className="px-2">
          <span id="">Authorized Users:</span>
          {project.users && project.users.map((user) => (
            <p className="" key={user}>
              {user}&nbsp;
            </p>
          ))
          }
        </div> */}
            <div className='px-2 justify-between flex flex-col items-center mx-5'>
                <div className='my-1'>
                    {/* HWSet1: {hwset.hwset1.checkedOutQty}/100   */}
                </div>
                <div className='my-1'>
                    {/* HWSet2: {hwset.hwset2.checkedOutQty}/100   */}
                </div>
            </div>
            <div className='w-auto'>
                <div>
                    <input type="number" id="qty" className=' py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Enter qty" />
                </div>
                <div>
                    <input type="number"  id="qty" className='py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Enter qty" />
                </div>
            </div>
         <div>
          <button id="join-leave" className = "bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white font-bold m-2" onClick={()=>clickLeft()}>Predict</button> 
          </div>
      </div>
        
    
  )
}

export default Card