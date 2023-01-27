import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function index() {
  const [player, setPlayer] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const getPlayer = async () => {
    if (!id) return;
    try {
      await fetch(`api/players/${id}`, {
        id: id,
      }).then(async (resp) => {
        setPlayer(await resp.json());
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
      </div>
    </>
  );
}

export default index;
