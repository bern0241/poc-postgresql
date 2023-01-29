import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

//components
import TeamImage from '../../../components/teams/TeamImage.js'
import PlayerRoster from '@/components/teams/PlayerRoster.js'

const TeamDetails = ({team, players}) => {

  useEffect(() => {
    console.log('returned info:', team);
  }, [])

  function setDivisionString(division) {
    let newDivision = '';
    switch(division) {
        case 'AAA':
            newDivision = 'AAA - Elite';
        break;
        case 'AA':
            newDivision = 'AA - Competitive';
        break;
        case 'A':
            newDivision = 'A - Recreational';
        break;
        case 'B':
            newDivision = 'B - Recreational';
        break;
        case 'C':
            newDivision = 'C - Recreational';
        break;
        case 'D':
            newDivision = 'D - Recreational';
        break;
        default:
            newDivision = 'No division'
        break;
    }
    return newDivision;
}

  return (
    <>
    <div class="flex items-center justify-center gap-5 relative right-[2.5rem]">
        <TeamImage imagesrc={team.imagesrc}/>
        <h1 class="text-[40px]">{team.teamname}</h1>
    </div>
      <div class="mt-5 max-w-[80em] mx-auto grid grid-cols-3 gap-4 border items-center text-center">
          <p class='border p-5'><b>Division:</b> <br/>{setDivisionString(team.division)}</p>
          <p class='border p-5'><b>Team Manager:</b> <br/>{team.teammanager}</p>
          <p class='border p-5'><b>Manager's Email:</b> <br/>{team.manageremail}</p>
          <p class='border p-5'><b>Home Color:</b> <br/>{team.homecolor}</p>
          <p class='border p-5'><b>Away Color:</b> <br/>{team.awaycolor}</p>
          <p class='border p-5'><b>Founded:</b> <br/>{team.founded}</p>
      </div>
      <div class="mt-10">
        <PlayerRoster players={players}/>
      </div>
      </>
  )
}


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



export default TeamDetails;