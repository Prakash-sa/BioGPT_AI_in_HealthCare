import React,{useState} from 'react'
import girlImage from "../images/girl_happy.png"
import boyImage from "../images/profile-avatar.png"
import DiWu from '../images/diwu.png'



const About = () => {



  return (
    <div>
        <div class="my-5 w-full h-full justify-center flex align-middle">
            <div class="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-300 dark:border-gray-700">
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-800">
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" src={DiWu} alt="Neil image"/>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">
                                        Prakash Saini
                                    </p>
                                    <p class="text-sm text-gray-500 truncate">
                                        ps34844@utexas.edu
                                    </p>
                                </div>
                                {/* <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                    Something...
                                </div> */}
                            </div>
                        </li>
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" src={DiWu} alt="Bonnie image"/>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">
                                        Vinit Ramanath Waingankar
                                    </p>
                                    <p class="text-sm text-gray-500 truncate">
                                        vrwaingankar@utexas.edu
                                    </p>
                                </div>
                                {/* <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                Something...
                                </div> */}
                            </div>
                        </li>
                        <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" src={DiWu} alt="Michael image"/>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">
                                        Sravan Reddy
                                    </p>
                                    <p class="text-sm text-gray-500 truncate">
                                        sravanreddy295@gmail.com
                                    </p>
                                </div>
                                {/* <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                Something...
                                </div> */}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default About