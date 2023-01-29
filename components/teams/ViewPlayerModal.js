import React from 'react'

const ViewPlayerModal = ({setOpenPlayerModal, player}) => {

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setOpenPlayerModal(false);
    }

  return (
    <>
    <div id="popup-modal" tabindex="-1" class="z-[20] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div class="z-[20] w-[28rem]">

            <div class=" bg-white rounded-lg shadow dark:bg-gray-700">
                
                <button onClick={(e) => handleCloseModal(e)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>

                <div class="px-4 py-6 lg:px-8">
                    
                    <h3 class="text-center mb-4 text-2xl font-medium text-gray-900 dark:text-white">{player.first_name} {player.last_name}</h3>
                    
                    <p class='text-center text-md'>Email: {player.email}</p>
                       
                        <div class='mt-5 border-t-2 border-b-2 mx-auto p-3 max-w-[19rem] w-[100%] grid grid-cols-3 gap-2 relative text-center'>
                            <p><b>GP:</b> 5</p>
                            <p><b>Goals:</b> 1</p>
                            <p><b>YC:</b> 0</p>
                            <p><b>RC:</b> 0</p>
                            <p><b>Assists:</b> 0</p>
                        </div>

                    <div class='text-center'>
                        <h3 class='text-[1.5rem] mt-5 mb-1'><i>Teams</i></h3>
                        <div class='text-[1.1rem] grid grid-cols-2 gap-5 border border-gray-400 p-5'>
                            <p>Ottawa Giants</p>
                            <p>Vancouver Kings</p>
                            <p>Ancient Ones</p>
                        </div>

                        <button onClick={(e) => handleCloseModal(e)} class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            Close
                        </button>
                    </div>


                    {/* <form class="space-y-6" action="#"> */}
                        {/* <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div> */}
                        {/* <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div> */}
                        {/* <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div> */}
                        {/* <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button> */}
                        {/* <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div> */}
                    {/* </form> */}
                </div>
            </div>
        </div>
    </div> 
    <div onClick={(e) => handleCloseModal(e)} class='z-[10] opacity-50 fixed top-0 left-0 w-[100%] h-[100%] bg-gray-900' />
    </>
  )
}

export default ViewPlayerModal