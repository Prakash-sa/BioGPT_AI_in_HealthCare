import React,{useCallback} from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResultImageCards } from './ResultImageCards';
import { Progress } from "@material-tailwind/react";
import {useDropzone} from 'react-dropzone'

import excelfile from '../assets/results.csv'


const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const backendLink="http://127.0.0.1:5000"
const link="kdf"

const Classification = () => {

    const [imageFiles, setImageFiles] = useState([]);
    const [progress,setProgress]=useState(0);
    const [imagebase64,setImagebase64]=useState([]);
    const [imageData,setImageData]=useState({});

    const [done,setDone]=useState(false);


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
        data['image']=imagebase64[i];
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
        setDone(true);
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
    <div>
      <form onSubmit={onFormSubmit}>
        <div class="mx-12 my-12">
              <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600" {...getRootProps()}>
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>

                    </label>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={changeHandler} accept="image/png, image/jpg, image/jpeg" multiple {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>or Drop the files here ...</p> :
                            <p class="pl-1">or Drag 'n' drop some files here</p>
                        }
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, JPEG</p>
                </div>
              </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
              {done?
                <a href={excelfile} download="results.csv"> 
                <button type='button' class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Download Excel File</button> </a>:
                <></>}
            </div>
            
          </div>
          
      </form>
    </div>
  )
}

export default Classification