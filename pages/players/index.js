import { useState, useEffect } from "react";
import Link from "next/link";

function index() {
  const [players, setPlayers] = useState([]);
  const getPlayers = async () => {
    try {
      await fetch("api/players").then(async (resp) => {
        setPlayers(await resp.json());
      });
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * Pass player data as a param to add the player
   * @example addPlayer({
   * first_name: 'John',
   * last_name: 'Doe,
   * email: 'john@mail.com'
   * })
   */
  const addPlayer = async (
    // Placeholder if there is no data
    playerData = {
      first_name: `Joe`,
      last_name: `Doe`,
      email: `${(Math.random() * 100).toFixed(0)}@email.com`,
    }
  ) => {
    console.log(playerData);
    try {
      await fetch(`api/players`, {
        method: "POST",
        body: JSON.stringify(playerData),
      })
        .then((resp) => {
          console.log(resp);
          if (resp.ok) getPlayers();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);
  return (
    <>
      <button class="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded float-right m-5" type="button"
        onClick={() => {
          //TODO: Show add player overlay
        }}>
        Add player
      </button>

      {/* Align it later according to information */}
      <div class="bg-grey-400 flex flex-col justify-center items-center mt-8"> 
        <table>
          <thead>
            <tr class="">
              <th class="text-xl bg-blue-100 border text-left px-5 py-3" >Full Name</th>
              <th class="text-xl bg-blue-100 border text-left px-5 py-3">Email</th>
              <th class="text-xl bg-blue-100 border text-left px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
              {players.map((player) => (
              <tr>
                <td class="text-lg border px-5 py-3" >
                  <Link href={`/players/${player.id}`}>
                    {player.first_name} {player.last_name}
                  </Link>
                </td>
                <td class="text-lg border px-5 py-3" >
                    {player.email}
                </td>
                <td class="text-lg border px-5 py-3" >
                  <button class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3 w-24" type="button">
                    Edit
                  </button>
                  <button class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3 w-24" type="button">
                    Delete
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
        </table>
      </div>

      <div id="form" class="bg-grey-400 flex flex-col h-screen justify-center items-center invisible">
        <form action="/send-data-here" method="post" class="w-full max-w-md border-2 p-5 m-auto mt-auto">
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                First Name
              </label>
            </div>
            <div class="md:w-2/3">
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jane"/>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Last Name
              </label>
            </div>
            <div class="md:w-2/3">
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Doe"/>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Email Address
              </label>
            </div>
            <div class="md:w-2/3">
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="email" value="jane.doe@gmail.com"/>
            </div>
          </div>
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button class="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Done
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default index;
