import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RemovePlayerModal = ({ setDeleteModal, player }) => {
  const router = useRouter();

  const handleCloseModal = (e) => {
    setDeleteModal(false);
  };

  async function deleteItem(e) {
    e.stopPropagation();
    try {
      await fetch(
        // "http://localhost:3000/api/teams_players/" + player.player_id,
        "/api/teams_players/" + player.player_id,
        // "https://candid-dolphin-08c29e.netlify.app/api/teams_players/" + player.player_id,
        // `${process.env.NEXT_PUBLIC_URL}/api/teams_players/` + player.player_id,
        // `/api/teams_players/` + player.player_id,
        {
          method: "DELETE",
        }
      )
        .then((result) => {
          // setPlayers(players.filter(player => player.id !== id))
          setDeleteModal(false);
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div
        id="popup-modal"
        tabindex="-1"
        className="z-[20] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="z-[20] relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
            <button
              onClick={(e) => handleCloseModal(e)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close Modal</span>
            </button>
            <div className="p-6 text-center">
              {/* <Image className='mx-auto flex justify-center' src='/../public/images/neutral-shirt.jpg' width={100} height={100}/> */}
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-4 text-lg font-normal text-white/75 dark:text-gray-400 leading-1">
                Are you sure you want to remove this player from the team?
                <br />
              </h3>
              <p className="text-[2rem] font-semibold relative bottom-4 text-white">
                {player.first_name} {player.last_name}
              </p>
              <button disabled
                onClick={(e) => deleteItem(e)}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes
              </button>
              <button
                onClick={(e) => handleCloseModal(e)}
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={(e) => handleCloseModal(e)}
        className="z-[10] opacity-50 fixed top-0 left-0 w-[100%] h-[100%] bg-gray-900"
      />
    </>
  );
};

export default RemovePlayerModal;
