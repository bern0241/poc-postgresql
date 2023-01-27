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

  useEffect(() => {
    getPlayers();
  }, []);
  return (
    <>
      <div>**** PLAYERS ****</div>
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
