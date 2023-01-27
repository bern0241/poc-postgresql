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
      console.log(err);
    }
  };
  const deletePlayer = async () => {
    if (!id) return;
    try {
      await fetch(`/api/players/${id}`, {
        method: "DELETE",
      }).then(async (resp) => {
        console.log(await resp.json());
        router.push("/players");
      });
    } catch (err) {
      console.log(err);
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
        <button onClick={deletePlayer}>Delete</button>
      </div>
    </>
  );
}

export default index;
