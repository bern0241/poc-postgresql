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
  const addPlayer = async () => {
    try {
      await fetch(`api/players`, {
        method: "POST",
        // Placeholder object for now
        body: JSON.stringify({
          first_name: `Joe`,
          last_name: `Doe`,
          email: `${(Math.random() * 100).toFixed(0)}@email.com`,
        }),
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
      <button onClick={addPlayer}>***Add player</button>
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
