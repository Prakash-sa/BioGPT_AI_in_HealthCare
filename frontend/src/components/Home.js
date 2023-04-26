import React,{useCallback, useRef} from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

import human from "../images/human.png"
import robot from '../images/robot.png'

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";




const backendLink="http://9e34-34-74-10-70.ngrok.io"

const Home = () => {

  const dummy = useRef(null);
  
    var [data,setData]=useState(
      [
        {
          "id":"ai",
          "text":"Please enter your medical history and we can help with your queries."
        }
      ]
    );

    var [inputText,setInputText]=useState("");
    var [patientHistory,setPatientHistory]=useState("");


    useEffect(() => {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }, [data]);


    function isEmptyObject(obj){
        return JSON.stringify(obj) === '{}';
    }

    const onSendClick=()=>{
      console.log(inputText);
      var tmp1={"id":"client","text":inputText};
      setData([...data,tmp1]);

      setInputText("");

      
      const config={
        headers:{
          'content-type':'application/json',
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Headers":"X-Requested-With",
          "Content-Security-Policy": "upgrade-insecure-requests",
          "mode": "cors"
        }
      };

      var data1={}
      data1['context']=patientHistory;
      data1['question']=inputText
      axios.post(backendLink+'/api/compute/', data1,config)
      .then((response) => {
        console.log(response.data['data']);
        var responseresult={"id":"ai","text":response.data['data']};
        setData([...data,tmp1,responseresult]);
      }).catch((err)=>{
        console.log('err',err);
      });
    }


    const listItems = data.map(
      (element) => {
          return (
            element.id=='ai'?
              <li className="d-flex justify-start mb-4">
                <img
                  src={robot}
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard class="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p className="fw-bold mb-0">BioGPT</p>
                    {/* <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> {element.timestamp} ago
                    </p> */}
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      {element.text}
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>

              :
              <li className="d-flex justify-end mb-4">
                <MDBCard className="w-100 " class="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                  >
                    <p class="fw-bold mb-0">You</p>
                    {/* <p class="text-light small mb-0">
                      <MDBIcon far icon="clock" /> {element.timestamp} ago
                    </p> */}
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      {element.text}
                    </p>
                  </MDBCardBody>
                </MDBCard>
                <img
                  src={human}
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="60"
                />
              </li>
          )
      }
  )
  
  return (
    <MDBContainer fluid class="py-5 h-full w-full flex flex-col justify-center place-items-center align-middle gradient-custom">
      <div className="w-9/12">
        <MDBTextArea label="Patient History" id="textAreaExample" rows={4} value={patientHistory} onChange={(e)=>setPatientHistory(e.target.value)} />
      </div>
      <MDBRow class="py-5 h-full w-full flex justify-center place-items-center align-middle">
        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled className="text-white">
            {listItems}
            <li className="mb-3">
              <MDBTextArea label="Send a message..." id="textAreaExample" rows={4} value={inputText} onChange={(e)=>setInputText(e.target.value)} />
            </li>
            <MDBBtn color="light" size="lg" rounded className="float-end" onClick={onSendClick}>
              Send
            </MDBBtn>
            <div ref={dummy}></div>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Home