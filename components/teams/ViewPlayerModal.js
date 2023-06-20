import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ViewPlayerModal = ({ setOpenPlayerModal, player }) => {
  const [playerTeams, setPlayerTeams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getPlayerTeams();
  }, []);

  const getPlayerTeams = async () => {
    try {
      const resp = await fetch(
        // "http://localhost:3000/api/players2/" + player.player_id
        "/api/players2/" + player.player_id
        // `${process.env.NEXT_PUBLIC_URL}/api/players2/` + player.player_id
      );
      const data = await resp.json();
      await setPlayerTeams(data.data.teams);
      // console.log(data.teams);
    } catch (error) {
      console.error(error.message);
    }
  };

  const redirectToTeamPage = (e, team) => {
    handleCloseModal(e);
    router.push(`/teams/${team.team_id}`);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setOpenPlayerModal(false);
  };

  return (
    <>
      <div
        id="popup-modal"
        tabindex="-1"
        className="z-[20] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="z-[20] w-[31rem]">
          <div className="relative bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
            <button
              onClick={(e) => handleCloseModal(e)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
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

            <div className="px-4 py-6 lg:px-8 text-white/75">
              <h3 className="text-[2rem] font-semibold text-center relative bottom-4 text-white">
                {player.first_name} {player.last_name}
              </h3>

              <p className="text-center text-md">Email: {player.email}</p>

              <div className="mt-5 border-t border-b border-gray-700 mx-auto p-3 w-full grid grid-cols-3 gap-2 relative text-center">
                <p>
                  <b>GP:</b> 5
                </p>
                <p>
                  <b>Goals:</b> 1
                </p>
                <p>
                  <b>YC:</b> 0
                </p>
                <p>
                  <b>RC:</b> 0
                </p>
                <p>
                  <b>Assists:</b> 0
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-[1.5rem] mt-7 mb-1">
                  <i>Teams</i>
                </h3>

                <div className="text-[1.1rem] flex justify-center items-center flex-wrap gap-5 border border-gray-700 p-5">
                  {playerTeams &&
                    playerTeams.map((team, index) => (
                      <div key={index}
                        onClick={(e) => redirectToTeamPage(e, team)}
                        className="cursor-pointer flex flex-col"
                      >
                        <img
                          alt="Team Image"
                          src={
                            team.imagesrc
                              ? team.imagesrc
                              : "https://bit.ly/placeholder-img"
                          }
                          layout="fill"
                          objectFit="cover"
                          className="max-w-[8em] max-h-[10em] group-hover:opacity-75"
                        />
                        <p>{team.teamname}</p>
                      </div>
                    ))}
                </div>

                <button
                  onClick={(e) => handleCloseModal(e)}
                  className="mt-6 bg-blue-500 hover:bg-blue-400 text-blue-900 font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Close
                </button>
              </div>
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

export default ViewPlayerModal;
