import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

//components
import TeamImage from '../../components/teams/TeamImage.js'

const TeamDetails = ({team}) => {

  useEffect(() => {
    console.log(team);
  }, [])

  return (
    <div class="flex items-center justify-center gap-5">
        <TeamImage imagesrc={team.imagesrc}/>
        <h1 class="text-[50px]">{team.teamname}</h1>
    </div>
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
    props: { team: data[0] } //IMPORTANT!
  }
}



export default TeamDetails;