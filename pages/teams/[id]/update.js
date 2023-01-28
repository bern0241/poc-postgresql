import React, {useState, useEffect} from 'react'
//components
import Header from '@/components/teams/Header'
import EditTeam from '@/components/teams/EditTeam'

function TeamUpdate({team}) {
    const header = `Edit ${team.teamname}`;
    return (
       <>
       <Header headerText={header}/>
       <EditTeam team={team} />
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