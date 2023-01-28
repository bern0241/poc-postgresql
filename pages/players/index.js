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
      <div>**** PLAYERS ****</div>
      <button
        onClick={() => {
          addPlayer();
        }}>
        ***Add player
      </button>
      {players.map((player) => (
        <div>
          <Link href={`/players/${player.id}`}>
            {player.first_name} {player.last_name}
          </Link>
        </div>
      ))}
    </>
  );
}

export default index;
