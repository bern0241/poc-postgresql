import React from 'react'
// import Link from 'next/link'

const TeamsList = () => {
  
    const handleTeamSelected = () => {
        window.location = '/teams/32'
    }

    function handleUpdate(e, id) {
        e.stopPropagation();
        window.location = '/';
        // navigate(`/restaurants/${id}/update`);
    }

    function handleDelete(e, id) {
        e.stopPropagation();
        // navigate(`/restaurants/${id}/update`);
    }
  
  return (
<div class="max-w-[80em] mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Team name
                </th>
                <th scope="col" class="px-6 py-3">
                    Division
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Team Manager
                </th>
                <th scope="col" class="px-6 py-3 w-5">
                    
                </th>
                <th scope="col" class="px-6 py-3 w-5">
                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr onClick={() => handleTeamSelected()} class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    Captial Bosses
                </th>
                <td class="px-6 py-4">
                    Recreational
                </td>
                <td class="px-6 py-4">
                    Blue/White
                </td>
                <td class="px-6 py-4">
                Amanda Bird
                </td>
                <td class="px-6 py-4">
                <button onClick={(e) => handleUpdate(e, 5)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Edit
                </button>
                </td>
                <td class="px-6 py-4">
                <button onClick={(e) => handleDelete(e, 5)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Delete
                </button>
                </td>
            </tr>
            <tr onClick={() => handleTeamSelected()} class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                Mighty Ducks
                </th>
                <td class="px-6 py-4">
                    Competitive
                </td>
                <td class="px-6 py-4">
                    Red/White
                </td>
                <td class="px-6 py-4">
                    James Duval
                </td>
                <td class="px-6 py-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Edit
                </button>
                </td>
                <td class="px-6 py-4">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Delete
                </button>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>


  )
}

export default TeamsList