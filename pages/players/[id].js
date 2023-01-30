import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

function index() {
  const [player, setPlayer] = useState({});
  const [playerTeams, setPlayerTeams] = useState([]);

  const [playerFirstName, setPlayerFirstName] = useState("");
  const [playerLastName, setPlayerLastName] = useState("");
  const [playerEmail, setPlayerEmail] = useState(""); 

  const [mainVisibility, setMainVisibility] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [visibilityUpdate, setVisibilityUpdate] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const router = useRouter();
  const { id } = router.query;

  const getPlayer = async () => {
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`).then(async (resp) => {
        const response = await resp.json();
        setPlayer(response.player);
        setPlayerTeams(response.playerTeams);
      });
    } catch (err) {
      console.warn(err);
    }
  };
  /**
   * Pass player data as a param to update the player
   * @example updatePlayer({
   * first_name: 'John',
   * last_name: 'Doe,
   * email: 'john@mail.com'
   * })
   */

  //UPDATE PLAYER

  const updatePlayer = async (
    playerData = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
    }
  ) => {
    setVisibilityUpdate(false);
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

  //DELETE PLAYER

  const deletePlayer = async (id) => {
    console.log(id)
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`, {
        method: "DELETE",
      }).then(async (resp) => {
        router.push("/players");
        getPlayer()
      });
    } catch (err) {
      console.warn(err);
    }
  };

  function handleUpdate() {
    const newPlayer = {
      first_name: playerFirstName,
      last_name: playerLastName,
      email: playerEmail
    }

    updatePlayer(newPlayer);
  }

  useEffect(() => {
    getPlayer();
  }, [id]);  

  const showForm = async () => {
    setVisibility(true);
    setMainVisibility(false);
    setVisibilityUpdate(false);
  }
  const showUpdateForm = async () => {
    setVisibilityUpdate(true);
    setMainVisibility(false);
    setVisibility(false);
  }

  return (
    <>
      <div style={{display: mainVisibility?"block":"none"}} class="flex flex-col h-screen justify-center items-center">
      <div class="container mx-auto px-4">
        <p class="text-4xl font-semibold text-sky-800" >
          Name: {player.first_name} {player.last_name}
        </p>
        <p class="text-2xl font-semibold text-sky-800" >Email: {player.email}</p>
        <p class="text-2xl font-semibold text-sky-800" >
          Teams:{" "}
          {playerTeams ? (
            playerTeams.map((team) => (
              <div>
                <p>{team.teamname}</p>
              </div>
            ))
          ) : (
            <p>Player is not a member of a team</p>
          )}
        </p>
        <button onClick={() => {
                  showForm()
                }}  class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-3 w-24" >Delete</button>
        <button onClick={() => {
                  showUpdateForm()
                }} class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3 w-24" >Update</button>
      </div>
      </div>

      <div id="update-form" style={{display: visibilityUpdate?"block":"none"}} class="flex flex-col justify-center items-center mt-8 bg-grey-400 flex flex-col h-screen justify-center items-cente">
          <form action="/send-data-here" method="post" class="w-full max-w-md border-2 p-5 m-auto mt-auto">
          <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  First Name
                </label>
              </div>
              <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" onChange={(e) => setPlayerFirstName(e.target.value)} type="text" placeholder="Jane"/>
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Last Name
                </label>
              </div>
              <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" onChange={(e) => setPlayerLastName(e.target.value)}  type="text" placeholder="Doe"/>
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                  Email Address
                </label>
              </div>
              <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" onChange={(e) => setPlayerEmail(e.target.value)} type="email" placeholder="jane.doe@gmail.com"/>
              </div>
            </div>
            <div class="md:flex md:items-center">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button class="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                onClick={() => {
                  handleUpdate();
                  // updatePlayer();
                  setMainVisibility(true);
                }}>
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>

        <div style={{display: visibility? "block":"none" }} class="flex flex-col justify-center items-center mt-8 bg-grey-400 flex flex-col h-screen justify-center items-center ml-8 pl-8">
          <div class="text-2xl font-semibold text-sky-800">
            Do you really want to delete this player?
          </div>
          <div >
            <button 
              onClick={() => {
                setVisibility(false);
                setMainVisibility(true);
              }} class="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-5" type="button">
                Cancel
            </button>
            <button 
              onClick={deletePlayer} class="shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-5" type="button">
                Delete
            </button>
          </div>
        </div>

    </>
  );
}

export default index;
