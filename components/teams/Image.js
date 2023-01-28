import React from 'react'

function Image() {
  return (
    <a href="#" className='group'>
        <div className='aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200'>
            <img 
            alt=""
            src="https://bit.ly/placeholder-img"
            className='group-hover:opacity-75'
            />
        </div>
        <h3 className='mt-4 text-sm text-gray-700'>Justin Bernard</h3>
        <p className='mt-1 text-lg font-medium text-gray-900'>@Justin</p>
    </a>
  )
}

export default Image