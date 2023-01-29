import React, {useState, useEffect} from 'react'
// import Link from 'next/link'
import { useTeams } from '@/context/teamsContext.js';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
//components
import DeleteTeamModal from './DeleteTeamModal';

const TeamsList = () => {
    const router = useRouter();
    const [deleteModal, setDeleteModal] = useState(false);
    const [team, setTeam] = useState(); //meant for deleting
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

    async function handleDelete(e, team) {
        e.stopPropagation();
        setDeleteModal(true);
        setTeam(team);
        // try {
        //     await fetch('api/teams/' + id, {
        //     method: 'DELETE'
        //     })
        //     .then((result) => {
        //         setTeams(teams.filter(team => team.id !== id))
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        // } catch (error) {
        // console.error(error.message);
        // }
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
    <>
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
            {teams && teams.map((team) => (
                <tr onClick={() => handleTeamSelected(team.id)} class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                    <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                        {team.teamname}
                    </th>
                    <td class="px-6 py-4">
                        {setDivisionString(team.division)}
                    </td>
                    <td class="px-6 py-4">
                        {team.homecolor ? team.homecolor : 'No color set'}
                    </td>
                    <td class="px-6 py-4">
                    {team.teammanager}
                    </td>
                    <td class="px-6 py-4">
                    <button onClick={(e) => handleUpdate(e, team.id)} class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Edit
                    </button>
                    </td>
                    <td class="px-6 py-4">
                    <button onClick={(e) => handleDelete(e, team)} class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                        Delete
                    </button>
                    </td>
                </tr>
            ))}            
        </tbody>
    </table>
</div>

{deleteModal && (
    <DeleteTeamModal team={team} setDeleteModal={setDeleteModal} />
)}
</>

  )
}

export default TeamsList