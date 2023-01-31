import React, {useState, useEffect} from 'react'
import ViewPlayerModal from '@/components/teams/ViewPlayerModal.js'

const PlayerRoster = ({players}) => {

    const [openPlayerModal, setOpenPlayerModal] = useState(false);
    const [player, setPlayer] = useState({});

    async function handlePlayerSelect(_player) {
        setOpenPlayerModal(true);
        setPlayer(_player);
    }
  
  return (
<>
<div className="mt-5 w-full mx-auto relative overflow-x-auto">
    <table className="w-full border-collapse text-sm text-left text-blue-100 dark:text-blue-100 shadow-md border border-gray-600 bg-gray-700">
        <thead className="text-white font-medium border-collapse border border-gray-600 bg-gray-700">
            <tr>
                <th scope="col" className="text-left px-6 py-3 w-full">
                    Player Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Games Played
                </th>
                <th scope="col" className="px-6 py-3">
                    Goals
                </th>
                <th scope="col" className="px-6 py-3">
                    Red Cards
                </th>
                <th scope="col" className="px-6 py-3 w-5">
                    Yellow Cards
                </th>
                <th scope="col" className="px-6 py-3 w-5">
                    Assists
                </th>

            </tr>
        </thead>
        <tbody>
            {players && players.map((player) => (
                <tr key={player.id} onClick={() => handlePlayerSelect(player)} className="bg-gray-800 border-b border-gray-600 hover:bg-gray-700 hover:cursor-pointer">
                    <th scope="row" className="px-6 py-4 font-medium text-white/75 whitespace-nowrap">
                        {player.first_name} {player.last_name}
                    </th>
                    <td className="px-6 py-4">
                        5
                    </td>
                    <td className="px-6 py-4">
                        2
                    </td>
                    <td className="px-6 py-4">
                    0
                    </td>
                    <td className="px-6 py-4">
                    0
                    </td>
                    <td className="px-6 py-4">
                    0
                    </td>

                </tr>
            ))}
            
        </tbody>
    </table>
</div>

{openPlayerModal && (
    <ViewPlayerModal player={player} setOpenPlayerModal={setOpenPlayerModal} />
)}
</>

  )
}

export default PlayerRoster