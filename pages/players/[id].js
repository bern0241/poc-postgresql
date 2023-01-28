import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function index() {
  const [player, setPlayer] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getPlayer = async () => {
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`).then(async (resp) => {
        setPlayer(await resp.json());
      });
    } catch (err) {
      console.warn(err);
    }
  };
  const updatePlayer = async () => {
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`, {
        method: "PATCH",
        // Update the current player with random values for testing
        // We should be using data from a form instead
        body: JSON.stringify({
          first_name: `${(Math.random() * 10000).toFixed(0)}`,
          last_name: `${(Math.random() * 10000).toFixed(0)}`,
          email: `${(Math.random() * 100).toFixed(0)}@email.com`,
        }),
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
          {player.first_name} {player.last_name}
        </p>
        <p>{player.email}</p>
        <button onClick={deletePlayer}>Delete</button>
        <button onClick={updatePlayer}>Update</button>
      </div>
    </>
  );
}

export default index;
