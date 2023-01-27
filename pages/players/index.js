import { useState, useEffect } from "react";

function index() {
  const getPlayers = async () => {
    try {
      await fetch("api/players").then(async (resp) => {
        console.log(await resp.json());
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);
  return <div>players index</div>;
}

export default index;
