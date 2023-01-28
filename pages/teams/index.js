import React, {useEffect, useState} from 'react'

//components
import Header from '../../components/teams/Header.js'
import AddTeam from '@/components/teams/AddTeam.js';

const Teams = () => {
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

  async function handlePost() {
    console.log("TEST");
    try {
        const dummyObject = {
            first_name: 'Justin',
            last_name: 'Bernard',
            email: 'justi31n@email.com'
          }
          
        await fetch('api/teams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({team:dummyObject}),
        }).catch(error => {
          console.log(error)
        })

    } catch (error) {
      console.error(error.message);
    }

  }

  return (
      <>
      <Header headerText="Teams" />
      <AddTeam />
      </>
    // <div>
    //     <h1>TEAMS PAGE!</h1>
    //     {team && team.map(team => (
    //       <div className='bg-red-700' key={team.id}>
    //         <p>{team.first_name}</p>
    //         <p>{team.last_name}</p>
    //       </div>
    //     ))}
    //     <button onClick={handlePost} class='bg-green-500'>Test Me</button>
    // </div>
  )
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