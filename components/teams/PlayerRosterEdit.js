import React, {useState, useEffect} from 'react'
import { useRouter } from "next/navigation";
import RemovePlayerModal from './RemovePlayerModal';
import ViewPlayerModal from './ViewPlayerModal';

const PlayerRosterEdit = ({players}) => {

    const router = useRouter();
    const [deleteModal, setDeleteModal] = useState(false);

    const [player, setPlayer] = useState({});
    const [openPlayerModal, setOpenPlayerModal] = useState(false);

    function handleModalOpen(e, _player) {
        e.stopPropagation();
        setDeleteModal(true);
        setPlayer(_player);
    }

    async function handlePlayerSelect(_player) {
        setOpenPlayerModal(true);
        setPlayer(_player);
    }
  
  return (
    <>
<div class="mt-5 max-w-[80em] mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="text-center text-[1rem] w-full text-sm text-left text-yellow-100 dark:text-yellow-100">
        <thead class="text-xs text-white uppercase bg-yellow-500 border-b border-black-400 dark:text-white">
            <tr>
                <th scope="col" class="text-left px-6 py-3 w-full">
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
                <tr onClick={() => handlePlayerSelect(player)} class="bg-gray-000 border-b border-gray-300 hover:bg-gray-100 text-gray-600">
                    <th scope="row" class="text-left px-6 py-4 font-medium whitespace-nowrap dark:text-blue-100">
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
                    <button onClick={(e) => handleModalOpen(e, player)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Remove
                    </button>
                    </td>
                </tr>
            ))}
            
        </tbody>
    </table>
</div>
{deleteModal && (
    <RemovePlayerModal player={player} setDeleteModal={setDeleteModal} />
)}
{openPlayerModal && (
    <ViewPlayerModal player={player} setOpenPlayerModal={setOpenPlayerModal} />
)}
</>

  )
}

export default PlayerRosterEdit