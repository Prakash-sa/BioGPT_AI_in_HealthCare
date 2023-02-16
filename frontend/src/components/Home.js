import React,{useCallback} from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResultImageCards } from './ResultImageCards';
import { Progress } from "@material-tailwind/react";
import {useDropzone} from 'react-dropzone'

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



const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const backendLink="http://0c00-34-74-16-171.ngrok.io"

const Home = () => {

    const [imageFiles, setImageFiles] = useState([]);
    const [progress,setProgress]=useState(0);
    const [imagebase64,setImagebase64]=useState([]);
    const [imageData,setImageData]=useState({});


    function isEmptyObject(obj){
        return JSON.stringify(obj) === '{}';
    }

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          resolve(fileReader.result.replace("data:", "").replace(/^.+,/, ""));
        }
        fileReader.onerror = (error) => {
          reject(error);
        }
      })
    }


    const onDrop = useCallback(acceptedFiles => {
        const validImageFiles = [];
        const validImageBase64=[];
        acceptedFiles.forEach( async(file)=>{
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
                const base64 = await convertBase64(file)
                console.log(base64)
                validImageBase64.push(base64);
            }
        })
        if (validImageFiles.length) {
            console.log("adding to files")
            setImageFiles(validImageFiles);
            setImagebase64(validImageBase64);
            return;
        }
        alert("Selected images are not of valid type!");
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const ProgressBar = () => {
        return (
          <div>
            {progress<100 ?
            <div>
              <div>Uploading...</div>
              <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: '45%'}}> {progress}%</div>
              </div>
            </div>
            :
            <div>Computing...</div>
            }
          </div>
          
        );
    };
  
    const onFormSubmit = (e) => {
      e.preventDefault();
      var data={};
      for( var i =0;i<imageFiles.length;i++){
        data[imageFiles[i].name]=imagebase64[i];
      }
      console.log("send format",data);
  
      const config={
        headers:{
          'content-type':'application/json',
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Headers":"X-Requested-With",
          "Content-Security-Policy": "upgrade-insecure-requests"
        },
        onUploadProgress: progressEvent => {
            var progress1 = (progressEvent.loaded / progressEvent.total) * 100;
            console.log(progress1)
            setProgress(progress1);
          }
      };
      axios.post(backendLink+'/api/upload/', data,config)
      .then((response) => {
        console.log(response.data);
        setImageData(response.data);
        alert("Done Computing!!");
      }).catch((err)=>{
        console.log('err',err);
      });
    };
  
    const changeHandler = (e) => {
      const { files } = e.target;
      const validImageFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match(imageTypeRegex)) {
          validImageFiles.push(file);
        }
      }
      if (validImageFiles.length) {
        setImageFiles(validImageFiles);
        return;
      }
      alert("Selected images are not of valid type!");
    };

  return (
    
    <MDBContainer fluid class="py-5 h-full w-full flex justify-center place-items-center align-middle items-center gradient-custom">
      <MDBRow>
        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled className="text-white">
            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard class="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 12 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li class="d-flex justify-content-between mb-4">
              <MDBCard className="w-100 " class="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p class="fw-bold mb-0">Lara Croft</p>
                  <p class="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 13 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium.
                  </p>
                </MDBCardBody>
              </MDBCard>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
              />
            </li>
            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard class="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 10 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li className="mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4} />
            </li>
            <MDBBtn color="light" size="lg" rounded className="float-end">
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Home