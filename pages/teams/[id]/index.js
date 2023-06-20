import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

//components
import TeamImage from "../../../components/teams/TeamImage.js";
import PlayerRoster from "@/components/teams/PlayerRoster.js";
import Header from "@/components/teams/Header.js";

// const TeamDetails = ({ team, players }) => {
const TeamDetails = () => {
  const [team, setTeam] = useState();
  const [players, setPlayers] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const getTeamPlayers = async () => {
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
    getTeamPlayers();
  }, [id]);

  function setDivisionString(division) {
    let newDivision = "";
    switch (division) {
      case "AAA":
        newDivision = "AAA - Elite";
        break;
      case "AA":
        newDivision = "AA - Competitive";
        break;
      case "A":
        newDivision = "A - Recreational";
        break;
      case "B":
        newDivision = "B - Recreational";
        break;
      case "C":
        newDivision = "C - Recreational";
        break;
      case "D":
        newDivision = "D - Recreational";
        break;
      default:
        newDivision = "No division";
        break;
    }
    return newDivision;
  }

  return (
    <>
      <div className="mx-auto w-5/6 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-6 relative">
          <Header headerText={team && team.teamname} />
          <TeamImage imagesrc={team && team.imagesrc} editable={false} />
        </div>
        <div className="mt-5 max-w-[80em] mx-auto grid grid-cols-3 gap-4 items-center text-center">
          <div className="border border-gray-600">
            <div className="bg-gray-700 text-white font-bold p-2">Division</div>
            <div className="text-white/75 p-4">{setDivisionString(team && team.division)}</div>
          </div>

          <div className="border border-gray-600">
            <div className="bg-gray-700 text-white font-bold p-2">Team Manager</div>
            <div className="text-white/75 p-4">{team && team.teammanager}</div>
          </div>
          <div className="border border-gray-600">
            <div className="bg-gray-700 text-white font-bold p-2">Team Contact</div>
            <div className="text-white/75 p-4">{team && team.manageremail}</div>
          </div>
          <div className="border border-gray-600">
            <div className="bg-gray-700 text-white font-bold p-2">Home Colour</div>
            <div className="text-white/75 p-4">{team && team.homecolor}</div>
          </div>
          <div className="border border-gray-600">
            <div className="bg-gray-700 text-white font-bold p-2">Away Colour</div>
            <div className="text-white/75 p-4">{team && team.awaycolor}</div>
          </div>
          <div className="border border-gray-600">
            <div className="bg-gray-700 text-white font-bold p-2">Date Founded</div>
            <div className="text-white/75 p-4">{team && team.founded}</div>
          </div>
        </div>
        <div className="mt-10">
          <PlayerRoster players={players} />
        </div>
      </div>
    </>
  );
};

// export const getStaticPaths = async () => {
//   // const res = await fetch("http://localhost:3000/api/teams");
//   const res = await fetch("https://churchpartytest.website/api/teams");
//   // const res = await fetch("https://candid-dolphin-08c29e.netlify.app/api/teams");
//   // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/teams`);
//   // const res = await fetch(`/api/teams`);
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

export default TeamDetails;
