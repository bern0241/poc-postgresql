import React, {useEffect, useState} from 'react'

//components
import Header from '../../components/teams/Header.js'
import AddTeam from '@/components/teams/AddTeam.js';
import TeamsList from '@/components/teams/TeamsList.js';

const Teams = ({teams}) => {
  // const [teams, setTeams] = useState();

  // useEffect(() => {
  //   async function getTeams() {
  //     const resp = await fetch('/api/teams');
  //     let data = await resp.json();
  //     console.log(data);
  //     setTeams(data);
  //   }
  //   getTeams();
  // }, [])

  return (
      <>
      <Header headerText="Teams" />
      <AddTeam />
      <TeamsList teams={teams} />
      </>
  )
}

export const getStaticProps = async () => {
  const resp = await fetch('http://localhost:3000/api/teams');
  let data = await resp.json();

  return {
    props: { teams: data }
  }
}

// export async function getServerSideProps() {
//   const options = {
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/json'
//       }
//   };

//   const resp = await fetch('api/hello', options);
//   let data = await resp.json();

//   if (!data) {
//       return {
//           notFound: true,
//       }
//   }
//   return {
//       props: {
//           team: data
//       }
//   }
// }

export default Teams;