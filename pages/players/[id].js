import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function index() {
  const [player, setPlayer] = useState({});
  const [playerTeams, setPlayerTeams] = useState([]);
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
  const updatePlayer = async (
    // Placeholder if there is no data
    playerData = {
      first_name: `Joe`,
      last_name: `Doe`,
      email: `${(Math.random() * 100).toFixed(0)}@email.com`,
    }
  ) => {
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`, {
        method: "PATCH",
        body: JSON.stringify(playerData),
      }).then((resp) => {
        if (resp.ok) getPlayer();
      });
    } catch (err) {
      console.warn(err);
    }
  };
  const deletePlayer = async () => {
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`, {
        method: "DELETE",
      }).then(async (resp) => {
        router.push("/players");
      });
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    getPlayer();
  }, [id]);
  return (
    <>
      <div>
        <p>
          Name: {player.first_name} {player.last_name}
        </p>
        <p>Email: {player.email}</p>
        <p>
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
        <button onClick={deletePlayer}>Delete</button>
        <button onClick={() => updatePlayer()}>Update</button>
      </div>
    </>
  );
}

export default index;
