import React, { useEffect, useState } from "react";
import "flowbite";
import Image from "next/image";
// import useRouterNav from "next/navigation/useRouter()";
import { useRouter, useSearchParams } from "next/navigation";

const AddPlayerButton = ({ players }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [playerList, setPlayerList] = useState(false);
  const [searchPlayer, setSearchPlayer] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    getPlayersList();
  }, []);

  // useEffect(() => {
  //     console.log(searchPlayer);
  // }, [searchPlayer])

  async function getPlayersList() {
    try {
      const resp = await fetch("http://localhost:3000/api/players2");
      // const resp = await fetch("https://candid-dolphin-08c29e.netlify.app/api/players2");
      // const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/players`);
      // const resp = await fetch(`/api/players`);
      let data = await resp.json();
      console.log("PLAYER LIST:", data);
      setPlayerList(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const addPlayerToTeam = async (e, player) => {
    setShowDropdown(false);

    const newTeamMember = {
      player_id: player.id,
      team_id: parseInt(id),
    };
    console.log(newTeamMember);

    try {
      const resp = await fetch("http://localhost:3000/api/teams_players", {
      // const resp = await fetch("https://candid-dolphin-08c29e.netlify.app/api/teams_players", {
      // const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/teams_players`, {
      // const resp = await fetch(`/api/teams_players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeamMember),
      }).then((result) => {
        // setPlayers([...players, newTeamMember])
        router.refresh();
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={toggleDropdown}
          id="dropdownUsersButton"
          data-dropdown-toggle="dropdownUsers"
          data-dropdown-placement="bottom"
          className="text-md h-[3.5rem] text-blue-900 bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg px-4 py-2.5 text-center inline-flex items-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          type="button"
        >
          Add Player{" "}
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {showDropdown && (
          <div
            id=""
            className="z-[15] absolute translate-x-[-3.2rem] bg-white rounded-lg shadow w-60 dark:bg-gray-700"
          >
            <div className="p-3 z-[100]">
              <label for="input-group-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>

                <input
                  value={searchPlayer}
                  onChange={(e) => setSearchPlayer(e.target.value)}
                  type="text"
                  id="input-group-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search player"
                />
              </div>
            </div>

            {/* LIST ITEMS! */}
            <ul
              className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownUsersButton"
            >
              {playerList &&
                playerList
                  .filter((player) => {
                    const searchItem = searchPlayer.toLocaleLowerCase();
                    const v =
                      player.first_name.toLocaleLowerCase() +
                      " " +
                      player.last_name.toLocaleLowerCase();

                    if (!searchItem) return true;

                    return v.startsWith(searchItem);
                  })
                  .map((player) => (
                    <li key={player.id}>
                      <a
                        onClick={(e) => addPlayerToTeam(e, player)}
                        className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <Image
                          width={500}
                          height={500}
                          className="w-6 h-6 mr-2 rounded-full"
                          src="/../public/images/blue-shirt.jpg"
                          alt="Player shirt"
                        />
                        {player.first_name} {player.last_name}
                      </a>
                    </li>
                  ))}
            </ul>
            <a
              href="#"
              className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline"
            >
              <svg
                className="w-5 h-5 mr-1"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
              Add new player
            </a>
          </div>
        )}
      </div>
      {showDropdown && (
        <div
          onClick={(e) => setShowDropdown(false)}
          className="z-[10] opacity-50 fixed top-0 left-0 w-[100%] h-[100%]"
        />
      )}
    </>
  );
};

export default AddPlayerButton;

// export const getStaticProps = async () => {
//     const resp = await fetch('http://localhost:3000/api/players2');
//     let data = await resp.json();

//     return {
//       props: { players: data }
//     }
//   }
