import React, {useState, useEffect} from 'react'
// import Link from 'next/link'
import { useTeams } from '@/context/teamsContext.js';
import { useRouter } from 'next/navigation';

const PlayerRoster = () => {
    const router = useRouter();
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

    // const handlePlayerSelected = (id) => {
    //     router.push(`/players/${id}`);
    // }

    async function handleRemove(e, id) {
        e.stopPropagation();
        try {
            await fetch('api/teams/' + id, {
            method: 'DELETE'
            })
            .then((result) => {
                setTeams(teams.filter(team => team.id !== id))
            })
            .catch(error => {
                console.log(error)
            })

        } catch (error) {
        console.error(error.message);
        }
    }

  
  return (
<div class="mt-5 max-w-[80em] mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="text-[1rem] w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-white uppercase bg-blue-500 border-b border-black-400 dark:text-white">
            <tr>
                <th scope="col" class="px-6 py-3 w-full">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Games Played
                </th>
                <th scope="col" class="px-6 py-3">
                    Goals
                </th>
                <th scope="col" class="px-6 py-3">
                    Red card
                </th>
                <th scope="col" class="px-6 py-3 w-5">
                    Yellow card
                </th>
                <th scope="col" class="px-6 py-3 w-5">
                    Assists
                </th>
                <th scope="col" class="px-6 py-3 w-5">
                    
                </th>
            </tr>
        </thead>
        <tbody>
            {players && players.map((player) => (
                <tr onClick={() => handleTeamSelected(team.id)} class="bg-gray-000 border-b border-gray-300 hover:bg-gray-100 text-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-blue-100">
                        {player.first_name} {player.last_name}
                    </th>
                    <td class="px-6 py-4">
                        5
                    </td>
                    <td class="px-6 py-4">
                        2
                    </td>
                    <td class="px-6 py-4">
                    0
                    </td>
                    <td class="px-6 py-4">
                    0
                    </td>
                    <td class="px-6 py-4">
                    0
                    </td>
                    <td class="px-6 py-4">
                    <button onClick={(e) => handleRemove(e, team.id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Remove
                    </button>
                    </td>
                </tr>
            ))}
            
        </tbody>
    </table>
</div>


  )
}

export default PlayerRoster