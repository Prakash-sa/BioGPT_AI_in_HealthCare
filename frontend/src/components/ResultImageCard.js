
import { useEffect, useState } from 'react';


export const ResultImageCard=({image,data})=>{
    const [imageSrc,setImageSrc]=useState([]);
    const [fileSize,setFileSize]=useState(0);

    useEffect(()=>{
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            if(result)setImageSrc(result);
        }
        if(image)
        fileReader.readAsDataURL(image);
        setFileSize(fileSizeCal());
    },[]);


    const fileSizeCal = () => {
        const size=image.size
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    return (
    <div class="bg-white">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div class="flex flex-row">
                <p class="text-gray-700 grow text-base text-center">
                    {image.name}
                </p>
                {/* <button type="button" onClick={removeImage} class="bg-white flex-none rounded-md p-2 justify-end text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button> */}
            </div>
            <img class="w-full" src={imageSrc} alt="Sunset in the mountains"/>
            <div class="px-6 py-4">
                <p class="text-gray-700 text-base">
                {data}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{fileSize}</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{image.type}</span>
                {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
            </div>
        </div>
    </div>
    )
  };