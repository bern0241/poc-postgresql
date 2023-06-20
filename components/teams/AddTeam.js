import React, {useState} from 'react'
import { useTeams } from '@/context/teamsContext.js';
import Teams from '@/pages/teams';

const AddTeam = () => {

    const [teamName, setTeamName] = useState('');
    const [division, setDivision] = useState('');
    const [color, setColor] = useState('');
    const [teamManager, setTeamManager] = useState('');
    const [managerEmail, setManagerEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    // global teams context
    const [teams, setTeams] = useTeams();

    async function handlePost(e) {
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
            const newTeam = {
                teamname: teamName,
                division: division,
                teammanager: teamManager,
                homecolor: color,
                awaycolor: 'White',
                manageremail: managerEmail
            }

            // console.log("NEW TEAM:", newTeam);
            
            await fetch('api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({team: newTeam})
            }).then(result => {
                setTeams([...teams, newTeam]);
                setTeamName('');
                // setDivision('Choose Division');
                setColor('');
                setTeamManager('');
                setManagerEmail('');
            })
            .catch(error => {
            console.log(error)
            })

        } catch (error) {
        console.error(error.message);
        }
  }

  return (
    <div className="my-8">
    <form className="">
    <div className="gap-3 grid justify-center grid-cols-2 lg:grid-cols-6 mx-auto w-full">

    <div className="">
      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
        Team Name
      </label>
      <input value={teamName} onChange={(e) => setTeamName(e.target.value)} className="appearance-none block w-full bg-gray-900 text-white/75 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:border-cyan-500" id="grid-last-name" type="text" placeholder="" />
      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </div>

    <div className="">
      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
        Division
      </label>
      <div className="relative">
        <select value={division} onChange={(e) => setDivision(e.target.value)} className="appearance-none block w-full bg-gray-900 text-white/75 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:border-cyan-500" id="grid-state">
        <option hidden>Choose Division</option>  
          <option value="D">D - Recreational</option>
          <option value="C">C - Recreational</option>
          <option value="B">B - Recreational</option>
          <option value="A">A - Recreational</option>
          <option value="AA">AA - Competitive</option>
          <option value="AAA">AAA - Elite</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

    {/* <div className="w-full md:w-1/4 px-3"> */}
    <div className="">
      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
        Color
      </label>
      <input value={color} onChange={(e) => setColor(e.target.value)} className="appearance-none block w-full bg-gray-900 text-white/75 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:border-cyan-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    {/* <div className="w-full sm:w-auto"> */}
    <div className="">
      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
        Team Manager
      </label>
      <input value={teamManager} onChange={(e) => setTeamManager(e.target.value)} className="appearance-none block w-full bg-gray-900 text-white/75 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:border-cyan-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    <div className="">
      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
        Manager Email
      </label>
      <input value={managerEmail} onChange={(e) => setManagerEmail(e.target.value)} className="appearance-none block w-full bg-gray-900 text-white/75 border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:border-cyan-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    <div className="flex justify-end ">
    <button disabled onClick={(e) => handlePost(e)} className="bg-blue-500 hover:bg-blue-400 h-11 mt-[24px] w-[12rem] text-blue-900 font-bold rounded">
    Add Team
    </button>
    </div>

  </div>
    {errorMessage && (
        <div className="flex justify-center mx-auto">
        <p className="text-red-500">Please fillout all fields to add a team.</p>
        </div>
    )}

</form>
</div>
  )
}

export default AddTeam