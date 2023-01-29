import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
//components
import Header from '@/components/teams/Header'
import EditTeam from '@/components/teams/EditTeam'
import PlayerRosterEdit from '@/components/teams/PlayerRosterEdit';
import AddPlayerButton from '@/components/teams/AddPlayerButton';
import TeamImage from '@/components/teams/TeamImage';

function TeamUpdate({team, players}) {

    const router = useRouter();
  
    return (
       <>
       <div class="flex items-center justify-center gap-5 relative right-[2.5rem]">
        <TeamImage imagesrc={team.imagesrc}/>
        <h1 class="text-[40px]">{team.teamname}</h1>
    </div>
       <EditTeam team={team} />
       <div class="flex justify-center gap-5 items-center">
        <h2 class="mt-5 text-center text-[2rem] mb-3">Player Roster</h2>
        <AddPlayerButton players={players} />
       </div>
       <PlayerRosterEdit players={players} />
       </>
      )
}

export default TeamUpdate


export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/teams');
    const data = await res.json();
  
    const paths = data.map(team => {
      return {
        params: { id: team.id.toString() }
      }
    })
  
    return {
      paths: paths,
      fallback: false //will show 404 page
    }
  }
  

  export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:3000/api/teams/' + id);
    const data = await res.json();
  
    return {
      props: { 
        team: data.data.team, 
        players: data.data.players, 
      }
    }
  }