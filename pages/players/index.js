import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/teams/Header";

function index() {
  const [players, setPlayers] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [deleteVisibility, setDeleteVisibility] = useState(false);
  const [mainVisibility, setMainVisibility] = useState(false);
  const [visibilityUpdate, setVisibilityUpdate] = useState(false);

  const [playerFirstName, setPlayerFirstName] = useState("");
  const [playerLastName, setPlayerLastName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const router = useRouter();
  const { id } = router.query;

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

  //ADD NEW PLAYER

  const addPlayer = async (
    playerData = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
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
    setVisibility(false);
    setMainVisibility(true);
  };

  //UPDATE PLAYER

  const updatePlayer = async (
    playerData = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
    }
  ) => {
    setVisibilityUpdate(false);
    // showUpdateForm()
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`, {
        method: "PATCH",
        body: JSON.stringify(playerData),
      }).then((resp) => {
        if (resp.ok) getPlayers();
      });
    } catch (err) {
      console.warn(err);
    }
  };
  function handleUpdate() {
    const newPlayer = {
      first_name: playerFirstName,
      last_name: playerLastName,
      email: playerEmail,
    };

    updatePlayer(newPlayer);
  }

  //DELETE PLAYER

  const deletePlayer = async (id) => {
    console.log(id);
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`, {
        method: "DELETE",
      }).then(async (resp) => {
        router.push("/players");
        getPlayers();
      });
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const showForm = async () => {
    setVisibility(true);
    setMainVisibility(false);
    setVisibilityUpdate(false);
  };
  const showUpdateForm = async () => {
    setVisibilityUpdate(true);
    setMainVisibility(false);
    setVisibility(false);
  };

  const handlePlayerSelected = (id) => {
    router.push(`/players/${id}`);
  };

  return (
    <>
      <div className="mx-auto w-5/6 flex flex-col">
        <Header headerText="Players" />
        <button
          className="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded float-right m-5"
          type="button"
          onClick={() => {
            showForm();
          }}
        >
          Add player
        </button>

        <div
          id="update-form"
          style={{ display: visibilityUpdate ? "block" : "none" }}
          className="flex flex-col justify-center items-center mt-8 bg-grey-400 flex flex-col justify-center items-center"
        >
          <form
            action="/send-data-here"
            method="post"
            className="w-full max-w-md border-2 p-5 m-auto mt-auto"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right px-6 py-3">
                  First Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  onChange={(e) => setPlayerFirstName(e.target.value)}
                  type="text"
                  placeholder="Jane"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Last Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  onChange={(e) => setPlayerLastName(e.target.value)}
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Email Address
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  onChange={(e) => setPlayerEmail(e.target.value)}
                  type="email"
                  placeholder="jane.doe@gmail.com"
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => {
                    handleUpdate();
                    setMainVisibility(true);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          id="add-form"
          style={{ display: visibility ? "block" : "none" }}
          className="bg-grey-400 flex flex-col h-screen justify-center items-center"
        >
          <form
            action="/send-data-here"
            method="post"
            className="w-full max-w-md border-2 p-5 m-auto mt-auto"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  First Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  ref={firstNameRef}
                  type="text"
                  placeholder="Jane"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Last Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  ref={lastNameRef}
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Email Address
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  ref={emailRef}
                  type="email"
                  placeholder="jane.doe@gmail.com"
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => {
                    addPlayer();
                  }}
                >
                  Add Player
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mx-auto w-full flex flex-col justify-center items-center mt-14">
          <table className="w-full text-sm text-white/75 border-collapse border border-gray-600 shadow-md">
            <thead>
              <tr className="bg-gray-700 text-md font-bold">
                <th className="text-white text-left px-5 py-3 ">Full Name</th>
                <th className="text-white text-left px-5 py-3 ">Email</th>
                <th className="text-left px-5 py-3"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr
                  key={player.id}
                >
                  <td onClick={() => handlePlayerSelected(player.id)} className="hover:cursor-pointer text-md border-b border-gray-600 bg-gray-800 px-6 py-4">
                    {player.first_name} {player.last_name}
                  </td>
                  <td className="text-md border-b border-gray-600 bg-gray-800 px-6 py-4">
                    {player.email}
                  </td>
                  <td className="text-md border-b border-gray-600 bg-gray-800 px-6 py-4">
                    <button
                      onClick={() => {
                        showUpdateForm();
                      }}
                      className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-2 px-4 rounded"
                      type="button"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="text-md border-b border-gray-600 bg-gray-800 px-6 py-4">
                    <button
                      onClick={() => {
                        deletePlayer(player.id);
                      }}
                      className="bg-red-500 hover:bg-red-400 text-red-900 font-bold py-2 px-4 rounded"
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{ display: deleteVisibility ? "block" : "none" }}
          className="flex flex-col justify-center items-center mt-8 bg-grey-400 flex flex-col h-screen justify-center items-center ml-8 pl-8"
        >
          <div className="text-2xl font-semibold text-sky-800">
            Do you really want to delete this player?
          </div>
          <div>
            <button
              onClick={() => {
                setVisibility(false);
                setMainVisibility(true);
              }}
              className="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-5"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={deletePlayer}
              className="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-5"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
