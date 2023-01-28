import React, {useEffect, useState} from 'react'


//components
import TeamImage from '../../components/teams/TeamImage.js'

const TeamDetails = () => {
  
  const [team, setTeam] = useState();

  useEffect(() => {
    async function getTeam() {
      const resp = await fetch('/api/teams');
      let data = await resp.json();
      console.log(data);
      setTeam(data);
    }
    getTeam();
  }, [])

  return (
    <div class="flex items-center justify-center gap-5">
        <TeamImage />
        <h1 class="text-[50px]">TEAM NAME!</h1>
    </div>
  )
}

export default TeamDetails;

export async function getStaticProps() {

}