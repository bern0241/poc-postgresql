import React, {useState} from 'react'
import { useTeams } from '@/context/teamsContext.js';
import { useRouter } from 'next/navigation';

const EditTeam = ({team}) => {

    const router = useRouter();
    //states
    const [teamName, setTeamName] = useState(team.teamname);
    const [division, setDivision] = useState(team.division);
    const [color, setColor] = useState(team.homecolor);
    const [teamManager, setTeamManager] = useState(team.teammanager);
    const [managerEmail, setManagerEmail] = useState(team.manageremail);
    const [errorMessage, setErrorMessage] = useState(false);
    // global teams context
    const [teams, setTeams] = useTeams(team.manageremail);

    async function handleEdit(e) {
        e.preventDefault();

        if (teamName === '' || division === '' || color === '' || teamManager === '' || managerEmail === '') 
        {
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, [6000])
            return;
        }

        setErrorMessage(false);

        try {
            const editTeam = {
                teamname: teamName,
                division: division,
                teammanager: teamManager,
                homecolor: color,
                awaycolor: 'White',
                manageremail: managerEmail
            }

            // console.log("NEW TEAM:", newTeam);
            router.push('/teams');
            await fetch('http://localhost:3000/api/teams/' + team.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({team: editTeam})
            }).then(result => {
                // var items = teams;?
                // console.log("Items:", items);
                setTeams([...teams, newTeam]);
                // router.push('/teams');
            })
            .catch(error => {
            console.log(error)
            })

        } catch (error) {
        console.error(error.message);
        }
  }

  return (
    <div class="my-4 border">
    <form class="">
    <div class="p-5 gap-3 grid justify-center grid-cols-2 lg:grid-cols-6 mx-auto max-w-[80em]">

    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Team Name
      </label>
      <input value={teamName} onChange={(e) => setTeamName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
      {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </div>

    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Division
      </label>
      <div class="relative">
        <select value={division} onChange={(e) => setDivision(e.target.value)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        <option hidden>Choose Division</option>  
          <option value="D">D - Recreational</option>
          <option value="C">C - Recreational</option>
          <option value="B">B - Recreational</option>
          <option value="A">A - Recreational</option>
          <option value="AA">AA - Competitive</option>
          <option value="AAA">AAA - Elite</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

    {/* <div class="w-full md:w-1/4 px-3"> */}
    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Color
      </label>
      <input value={color} onChange={(e) => setColor(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    {/* <div class="w-full sm:w-auto"> */}
    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Team Manager
      </label>
      <input value={teamManager} onChange={(e) => setTeamManager(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Manager Email
      </label>
      <input value={managerEmail} onChange={(e) => setManagerEmail(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    <div class="flex justify-end ">
    <button onClick={(e) => handleEdit(e)} class="bg-yellow-500 hover:bg-yellow-700 h-11 mt-[24px] w-[12rem] text-white font-bold rounded">
    Edit Team
    </button>
    </div>

  </div>
    {errorMessage && (
        <div class="flex justify-center mx-auto">
        <p class="text-red-500">Please fillout all fields to edit the team.</p>
        </div>
    )}

</form>
</div>
  )
}

export default EditTeam