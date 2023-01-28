import React from 'react'

const AddTeam = () => {
  return (
    <div class="">
    <form class="">
    <div class="p-5 gap-3 grid justify-center grid-cols-2 lg:grid-cols-6 mx-auto max-w-[80em]">

    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Team Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
      {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </div>

    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Division
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>D - Recreational</option>
          <option>C - Recreational</option>
          <option>B - Recreational</option>
          <option selected>A - Recreational</option>
          <option>AA - Competitive</option>
          <option>AAA - Elite</option>
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
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    {/* <div class="w-full sm:w-auto"> */}
    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Team Manager
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    <div class="">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Manager Email
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
    </div>

    <div class="flex justify-end ">
    <button class="bg-blue-500 hover:bg-blue-700 h-11 mt-[24px] w-[12rem] text-white font-bold rounded">
    Add Team
    </button>
    </div>

  </div>
</form>
</div>
  )
}

export default AddTeam