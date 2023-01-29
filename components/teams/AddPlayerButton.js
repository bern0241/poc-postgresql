import React, {useEffect, useState} from 'react'
import 'flowbite'; 
import Image from 'next/image';

const AddPlayerButton = () => {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        getPlayers();
    }, [])

    async function getPlayers() {
        try {
            const resp = await fetch('http://localhost:3000/api/players2');
            let data = await resp.json();
            console.log(data);
            setPlayers(data);
        } catch (error) {
            console.error(error.message);
        }
    }

  return (
    <>
        <button id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" class="h-[3.5rem] text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800" type="button">Add Player <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
        
        <div id="dropdownUsers" class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
            

        <div class="p-3">
      <label for="input-group-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="input-group-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
      </div>
    </div>


        <ul class="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
        {players && players.map((player) => (
            <li>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <Image width={500}
                    height={500} class="w-6 h-6 mr-2 rounded-full" src="/../public/images/blue-shirt.jpg" alt="Player shirt" />
                {player.first_name} {player.last_name}
            </a>
            </li>
        ))}    
            
        </ul>
        <a href="#" class="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline">
            <svg class="w-5 h-5 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
            Add new user
        </a>
        </div>
</>
  )
}

export default AddPlayerButton


// export const getStaticProps = async () => {
//     const resp = await fetch('http://localhost:3000/api/players2');
//     let data = await resp.json();
  
//     return {
//       props: { players: data }
//     }
//   }