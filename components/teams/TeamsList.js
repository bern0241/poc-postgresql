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
<div className="w-full mx-auto relative overflow-x-auto">
    <table className="w-full border-collapse text-sm text-left text-blue-100 dark:text-blue-100 shadow-md border border-gray-600 bg-gray-700">
        <thead className="text-white text-md font-medium border-collapse border border-gray-600 bg-gray-700">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Team Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Division
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Team Manager
                </th>
                <th scope="col" className="px-6 py-3 w-5">
                    
                </th>
                <th scope="col" className="px-6 py-3 w-5">
                    
                </th>
            </tr>
        </thead>
        <tbody>
            {teams && teams.map((team) => (
                <tr key={team.id} onClick={() => handleTeamSelected(team.id)} className="bg-gray-800 border-b border-gray-600 hover:bg-gray-700 hover:cursor-pointer">
                    <th scope="row" className="px-6 py-4 font-medium text-white/75 whitespace-nowrap">
                        {team.teamname}
                    </th>
                    <td className="px-6 py-4 text-white/75">
                        {setDivisionString(team.division)}
                    </td>
                    <td className="px-6 py-4 text-white/75">
                        {team.homecolor ? team.homecolor : 'No color set'}
                    </td>
                    <td className="px-6 py-4 text-white/75">
                    {team.teammanager}
                    </td>
                    <td className="px-6 py-4">
                    <button onClick={(e) => handleUpdate(e, team.id)} className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-2 px-4 rounded">
                        Edit
                    </button>
                    </td>
                    <td className="px-6 py-4">
                    <button onClick={(e) => handleDelete(e, team)} className="bg-red-500 hover:bg-red-400 text-red-900 font-bold py-2 px-4 rounded">
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