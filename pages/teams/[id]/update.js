import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
//components
import Header from "@/components/teams/Header";
import EditTeam from "@/components/teams/EditTeam";
import PlayerRosterEdit from "@/components/teams/PlayerRosterEdit";
import AddPlayerButton from "@/components/teams/AddPlayerButton";
import TeamImage from "@/components/teams/TeamImage";

// function TeamUpdate({ team, players }) {
function TeamUpdate() {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const getTeamAndPlayers = async () => {
      try {
        const resp = await fetch('/api/teams/' + id);
        const data = await resp.json();
        console.log('returned info:', data);
        setTeam(data.data.team);
        setPlayers(data.data.players);
        } catch (err) {
            console.log('Error occured when fetching teams');
        }
    }
    getTeamAndPlayers();
  }, [id]);

  return (
    <>
      <div className="mx-auto w-5/6 flex flex-col h-[100vh]">
        <div className="flex flex-col items-center justify-center gap-6 relative">
          <Header headerText={team && team.teamname} />
          <TeamImage imagesrc={team && team.imagesrc} editable={true} />
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

// export const getStaticPaths = async () => {
//   // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/teams`);
//   // const res = await fetch("https://candid-dolphin-08c29e.netlify.app/api/teams");
//   // const res = await fetch("http://localhost:3000/api/teams");
//   const res = await fetch("https://churchpartytest.website/api/teams");
//   const data = await res.json();

//   const paths = data.map((team) => {
//     return {
//       params: { id: team.id.toString() },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false, //will show 404 page
//   };
// };

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   // const res = await fetch("http://localhost:3000/api/teams/" + id);
//   const res = await fetch("https://churchpartytest.website/api/teams/" + id);
//   // const res = await fetch("https://candid-dolphin-08c29e.netlify.app/api/teams/" + id);
//   // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/teams/` + id);
//   // const res = await fetch(`/api/teams/` + id);
//   const data = await res.json();

//   return {
//     props: {
//       team: data.data.team,
//       players: data.data.players,
//     },
//   };
// };
