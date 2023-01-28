import React, {useState, useEffect} from 'react'
// import Link from 'next/link'
import { useTeams } from '@/context/teamsContext.js';
import { useRouter } from 'next/navigation';

const PlayerRoster = () => {
    const router = useRouter();
    const [teams, setTeams] = useTeams([]);

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch('api/teams');
                const data = await resp.json();
                setTeams(data);
            } catch (err) {
                console.log('Error occured when fetching teams');
            }
        })();
    }, [])

    const handleTeamSelected = (id) => {
        router.push(`/teams/${id}`);
    }

    function handleUpdate(e, id) {
        e.stopPropagation();
        router.push(`/teams/${id}/update`);
        // navigate(`/restaurants/${id}/update`);
    }

    async function handleDelete(e, id) {
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

    function setDivisionString(division) {
        let newDivision = '';
        switch(division) {
            case 'AAA':
                newDivision = 'AAA - Elite';
            break;
            case 'AA':
                newDivision = 'AA - Competitive';
            break;
            case 'A':
                newDivision = 'A - Recreational';
            break;
            case 'B':
                newDivision = 'B - Recreational';
            break;
            case 'C':
                newDivision = 'C - Recreational';
            break;
            case 'D':
                newDivision = 'D - Recreational';
            break;
            default:
                newDivision = 'No division'
            break;
        }
        return newDivision;
    }
  
  return (
<div class="max-w-[80em] mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="text-[1rem] w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-white uppercase bg-red-500 border-b border-black-400 dark:text-white">
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
            {teams && teams.map((team) => (
                <tr onClick={() => handleTeamSelected(team.id)} class="bg-gray-000 border-b border-gray-300 hover:bg-gray-100 text-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-blue-100">
                        {team.teamname}
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
                    <button onClick={(e) => handleDelete(e, team.id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
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