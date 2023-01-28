import React, {useState, useEffect} from 'react'
//components
import Header from '@/components/teams/Header'
import EditTeam from '@/components/teams/EditTeam'
import PlayerRoster from '@/components/teams/PlayerRoster';
import AddPlayerButton from '@/components/teams/AddPlayerButton';

function TeamUpdate({team}) {
    const header = `Edit ${team.teamname}`;
    return (
       <>
       <Header headerText={header}/>
       <EditTeam team={team} />
       <div class="flex justify-center gap-5">
        <h2 class="text-center text-[2rem] mb-3">Player Roster</h2>
        <AddPlayerButton />
        {/* <button type="button" class="text-[1rem] focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Add Player</button> */}
       </div>
       <PlayerRoster />
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
      props: { team: data[0] } //IMPORTANT!
    }
  }