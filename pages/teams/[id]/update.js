import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
//components
import Header from "@/components/teams/Header";
import EditTeam from "@/components/teams/EditTeam";
import PlayerRosterEdit from "@/components/teams/PlayerRosterEdit";
import AddPlayerButton from "@/components/teams/AddPlayerButton";
import TeamImage from "@/components/teams/TeamImage";

function TeamUpdate({ team, players }) {
  const router = useRouter();

  return (
    <>
      <div className="mx-auto w-5/6 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-6 relative">
          <Header headerText={team.teamname} />
          <TeamImage imagesrc={team.imagesrc} editable={false} />
        </div>
        <EditTeam team={team} />
        <div class="flex justify-between mb-8 items-end">
          <Header headerText="Player Roster" />
          <AddPlayerButton players={players} />
        </div>
        <PlayerRosterEdit players={players} />
      </div>
    </>
  );
}
export default TeamUpdate;

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/teams");
  const data = await res.json();

  const paths = data.map((team) => {
    return {
      params: { id: team.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false, //will show 404 page
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:3000/api/teams/" + id);
  const data = await res.json();

  return {
    props: {
      team: data.data.team,
      players: data.data.players,
    },
  };
};
