import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RemovePlayerModal from "./RemovePlayerModal";
import ViewPlayerModal from "./ViewPlayerModal";

const PlayerRosterEdit = ({ players }) => {
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
      <div className="w-full mx-auto relative overflow-x-auto">
        <table className="w-full border-collapse text-sm text-left text-blue-100 dark:text-blue-100 shadow-md border border-gray-600 bg-gray-700">
          <thead className="text-white text-md font-medium border-collapse border border-gray-600 bg-gray-700">
            <tr>
              <th scope="col" className="text-left px-6 py-3 w-full">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Games Played
              </th>
              <th scope="col" className="px-6 py-3">
                Goals
              </th>
              <th scope="col" className="px-6 py-3">
                Red card
              </th>
              <th scope="col" className="px-6 py-3 w-5">
                Yellow card
              </th>
              <th scope="col" className="px-6 py-3 w-5">
                Assists
              </th>
              <th scope="col" className="px-6 py-3 w-5"></th>
            </tr>
          </thead>
          <tbody>
            {players &&
              players.map((player) => (
                <tr
                  key={player.id}
                  onClick={() => handlePlayerSelect(player)}
                  className="bg-gray-800 border-b border-gray-600 hover:bg-gray-700 hover:cursor-pointer"
                >
                  <th
                    scope="row"
                    className="text-left px-6 py-4 font-medium whitespace-nowrap dark:text-blue-100"
                  >
                    {player.first_name} {player.last_name}
                  </th>
                  <td className="px-6 py-4">5</td>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => handleModalOpen(e, player)}
                      className="bg-red-500 hover:bg-red-400 text-red-900 font-bold py-2 px-4 rounded"
                    >
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
        <ViewPlayerModal
          player={player}
          setOpenPlayerModal={setOpenPlayerModal}
        />
      )}
    </>
  );
};

export default PlayerRosterEdit;
